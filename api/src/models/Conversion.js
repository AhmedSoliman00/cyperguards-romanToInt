const mongoose = require('mongoose')

const ConversionSchema = new mongoose.Schema({
  roman: { type: String, required: true },
  integer: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Conversion', ConversionSchema)
