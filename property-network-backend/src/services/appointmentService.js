const sequelize = require('../config/database')
const { QueryTypes } = require('sequelize')

const createAppointment = async (
  buyer_id,
  listing_id,
  appointment_date
) => {
  await sequelize.query(
    `
    INSERT INTO appointments
    (buyer_id, listing_id, appointment_date)
    VALUES (
      :buyer_id,
      :listing_id,
      :appointment_date
    )
    `,
    {
      replacements: {
        buyer_id,
        listing_id,
        appointment_date
      },
      type: QueryTypes.INSERT
    }
  )

  return {
    message: 'Appointment created successfully'
  }
}

module.exports = {
  createAppointment
}