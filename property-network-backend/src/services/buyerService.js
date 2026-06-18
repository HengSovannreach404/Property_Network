const sequelize = require('../config/database')
const { QueryTypes } = require('sequelize')

const getBuyerProfile = async (buyer_id) => {
  const buyers = await sequelize.query(
    `SELECT * FROM buyers WHERE buyer_id = :buyer_id`,
    {
      replacements: { buyer_id },
      type: QueryTypes.SELECT
    }
  )

  return buyers[0]
}

module.exports = {
  getBuyerProfile
}