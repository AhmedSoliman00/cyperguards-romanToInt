const express = require('express')
const router = express.Router()
const romanController = require('../controllers/romanController')

// Conversion endpoints
router.get('/convert', romanController.convertRoman)
router.post('/convert', romanController.convertRoman)

// History endpoint (legacy)
router.get('/history', romanController.getHistory)

// CRUD endpoints for conversions
router.get('/conversions', romanController.getAllConversions)
router.get('/conversions/:id', romanController.getConversionById)
router.put('/conversions/:id', romanController.updateConversion)
router.delete('/conversions/:id', romanController.deleteConversion)

module.exports = router
