const { Appointment, Listing, Buyer, Agent } = require('../models')

const createAppointment = async (buyerId, data) => {
  return await Appointment.create({ ...data, buyer_id: buyerId })
}

const getBuyerAppointments = async (buyerId) => {
  return await Appointment.findAll({
    where: { buyer_id: buyerId },
    include: [{ model: Listing, attributes: ['title', 'city', 'address'] }],
    order: [['appointment_date', 'DESC']],
  })
}

const getAgentAppointments = async (agentId) => {
  return await Appointment.findAll({
    include: [
      { model: Listing, where: { agent_id: agentId }, attributes: ['title', 'city'] },
      { model: Buyer, attributes: ['full_name', 'phone', 'email'] },
    ],
    order: [['appointment_date', 'DESC']],
  })
}

const updateAppointmentStatus = async (id, status) => {
  const appointment = await Appointment.findByPk(id)
  if (!appointment) throw new Error('Appointment not found')
  await appointment.update({ status })
  return appointment
}

const cancelAppointment = async (id, buyerId) => {
  const appointment = await Appointment.findByPk(id)
  if (!appointment) throw new Error('Appointment not found')
  if (appointment.buyer_id !== buyerId) throw new Error('Unauthorized')
  await appointment.update({ status: 'cancelled' })
  return appointment
}

module.exports = { createAppointment, getBuyerAppointments, getAgentAppointments, updateAppointmentStatus, cancelAppointment }