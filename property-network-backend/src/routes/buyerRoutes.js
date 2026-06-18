const express = require('express')
const router = express.Router()

const buyerController = require('../controllers/buyerController')

router.get('/:buyer_id', buyerController.getBuyerProfile)

module.exports = router