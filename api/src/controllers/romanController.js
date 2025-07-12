const Conversion = require('../models/Conversion')

// Validate Roman numeral
function isValidRoman(roman) {
  const validPattern =
    /^(?=[MDCLXVI])M{0,3}(C[MD]|D?C{0,3})(X[CL]|L?X{0,3})(I[XV]|V?I{0,3})$/

  // First check the pattern
  if (!validPattern.test(roman.toUpperCase())) {
    return false
  }

  // Additional check: Roman numerals should not exceed 3999
  const value = romanToInt(roman)
  return value >= 1 && value <= 3999
}

// Convert Roman numeral to integer
function romanToInt(roman) {
  const map = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let result = 0,
    prev = 0

  const upperRoman = roman.toUpperCase()

  for (let i = upperRoman.length - 1; i >= 0; i--) {
    const curr = map[upperRoman[i]]
    if (curr < prev) result -= curr
    else result += curr
    prev = curr
  }
  return result
}

exports.convertRoman = async (req, res) => {
  try {
    const numeral = req.method === 'GET' ? req.query.numeral : req.body.numeral

    if (!numeral || typeof numeral !== 'string') {
      return res
        .status(400)
        .json({ success: false, error: 'Missing or invalid numeral parameter' })
    }

    const cleanNumeral = numeral.trim().toUpperCase()

    if (!isValidRoman(cleanNumeral)) {
      return res
        .status(400)
        .json({ success: false, error: 'Invalid Roman numeral format' })
    }

    const integer = romanToInt(cleanNumeral)

    // Save to database
    const conversion = await Conversion.create({
      roman: cleanNumeral,
      integer: integer,
    })

    res.json({
      success: true,
      roman: cleanNumeral,
      integer: integer,
      id: conversion._id,
      timestamp: conversion.createdAt,
    })
  } catch (err) {
    console.error('Conversion error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

exports.getHistory = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10
    const conversions = await Conversion.find()
      .sort({ createdAt: -1 })
      .limit(limit)

    res.json({
      success: true,
      count: conversions.length,
      data: conversions,
    })
  } catch (err) {
    console.error('History fetch error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

// Get all conversions
exports.getAllConversions = async (req, res) => {
  try {
    const conversions = await Conversion.find().sort({ createdAt: -1 })

    res.json({
      success: true,
      count: conversions.length,
      data: conversions,
    })
  } catch (err) {
    console.error('Get all conversions error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

// Get single conversion by ID
exports.getConversionById = async (req, res) => {
  try {
    const { id } = req.params

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversion ID format',
      })
    }

    const conversion = await Conversion.findById(id)

    if (!conversion) {
      return res.status(404).json({
        success: false,
        error: 'Conversion not found',
      })
    }

    res.json({
      success: true,
      data: conversion,
    })
  } catch (err) {
    console.error('Get conversion by ID error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

// Update conversion by ID
exports.updateConversion = async (req, res) => {
  try {
    const { id } = req.params
    const { roman } = req.body

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversion ID format',
      })
    }

    if (!roman || typeof roman !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing or invalid roman numeral parameter',
      })
    }

    const cleanRoman = roman.trim().toUpperCase()

    if (!isValidRoman(cleanRoman)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid Roman numeral format',
      })
    }

    const integer = romanToInt(cleanRoman)

    const updatedConversion = await Conversion.findByIdAndUpdate(
      id,
      {
        roman: cleanRoman,
        integer: integer,
        updatedAt: new Date(),
      },
      { new: true, runValidators: true }
    )

    if (!updatedConversion) {
      return res.status(404).json({
        success: false,
        error: 'Conversion not found',
      })
    }

    res.json({
      success: true,
      message: 'Conversion updated successfully',
      data: updatedConversion,
    })
  } catch (err) {
    console.error('Update conversion error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}

// Delete conversion by ID
exports.deleteConversion = async (req, res) => {
  try {
    const { id } = req.params

    // Validate ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid conversion ID format',
      })
    }

    const deletedConversion = await Conversion.findByIdAndDelete(id)

    if (!deletedConversion) {
      return res.status(404).json({
        success: false,
        error: 'Conversion not found',
      })
    }

    res.json({
      success: true,
      message: 'Conversion deleted successfully',
      data: deletedConversion,
    })
  } catch (err) {
    console.error('Delete conversion error:', err.message)
    res.status(500).json({ success: false, error: 'Internal server error' })
  }
}
