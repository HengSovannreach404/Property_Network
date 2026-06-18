const buyerService = require('../services/buyerService')

const getBuyerProfile = async (req, res) => {
  try {
    const buyer = await buyerService.getBuyerProfile(
      req.params.buyer_id
    )

    if (!buyer) {
      return res.status(404).json({
        message: 'Buyer not found'
      })
    }

    res.json({
      success: true,
      data: buyer
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  getBuyerProfile
}