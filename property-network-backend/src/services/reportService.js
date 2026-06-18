const sequelize = require('../config/database')
const { QueryTypes } = require('sequelize')

const getReport = async () => {
  const buyers = await sequelize.query(
    `
    SELECT COUNT(*) AS totalBuyers
    FROM buyers
    `,
    {
      type: QueryTypes.SELECT
    }
  )

  const appointments = await sequelize.query(
    `
    SELECT COUNT(*) AS totalAppointments
    FROM appointments
    `,
    {
      type: QueryTypes.SELECT
    }
  )

  return {
    totalBuyers: buyers[0].totalBuyers,
    totalAppointments:
      appointments[0].totalAppointments
  }
}

module.exports = {
  getReport
}