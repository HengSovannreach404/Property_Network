const appointmentService = require('../services/appointmentService')

const createAppointment = async (req, res) => {
  try {
    const {
      buyer_id,
      listing_id,
      appointment_date
    } = req.body

    const result =
      await appointmentService.createAppointment(
        buyer_id,
        listing_id,
        appointment_date
      )

    res.status(201).json({
      success: true,
      message: 'Appointment created',
      data: result
    })
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = {
  createAppointment
}