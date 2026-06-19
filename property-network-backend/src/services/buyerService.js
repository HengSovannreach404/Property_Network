const { Buyer, SavedListing, Listing, Agent, ListingPhoto, Notification, Message, ListingComparison } = require('../models')

const getProfile = async (buyerId) => {
  const buyer = await Buyer.findByPk(buyerId, { attributes: { exclude: ['password'] } })
  if (!buyer) throw new Error('Buyer not found')
  return buyer
}

const updateProfile = async (buyerId, data) => {
  const buyer = await Buyer.findByPk(buyerId)
  if (!buyer) throw new Error('Buyer not found')
  delete data.password
  delete data.email
  delete data.buyer_id
  await buyer.update(data)
  buyer.password = undefined
  return buyer
}

const getSavedListings = async (buyerId) => {
  return await SavedListing.findAll({
    where: { buyer_id: buyerId },
    include: [{
      model: Listing,
      include: [{ model: Agent, attributes: ['full_name', 'agency_name'] }, { model: ListingPhoto }],
    }],
  })
}

const saveListing = async (buyerId, listingId) => {
  const existing = await SavedListing.findOne({ where: { buyer_id: buyerId, listing_id: listingId } })
  if (existing) throw new Error('Listing already saved')
  return await SavedListing.create({ buyer_id: buyerId, listing_id: listingId })
}

const unsaveListing = async (buyerId, listingId) => {
  const saved = await SavedListing.findOne({ where: { buyer_id: buyerId, listing_id: listingId } })
  if (!saved) throw new Error('Saved listing not found')
  await saved.destroy()
}

const getNotifications = async (buyerId) => {
  return await Notification.findAll({
    where: { buyer_id: buyerId },
    order: [['createdAt', 'DESC']],
  })
}

const markNotificationRead = async (notifId) => {
  const notif = await Notification.findByPk(notifId)
  if (!notif) throw new Error('Notification not found')
  await notif.update({ is_read: true })
  return notif
}

const getMessages = async (buyerId) => {
  return await Message.findAll({
    where: { buyer_id: buyerId },
    include: [{ model: Agent, attributes: ['full_name', 'agency_name'] }],
    order: [['sent_at', 'DESC']],
  })
}

const sendMessage = async (buyerId, data) => {
  return await Message.create({ ...data, buyer_id: buyerId })
}

const saveComparison = async (buyerId, listingIds) => {
  return await ListingComparison.create({ buyer_id: buyerId, listing_ids: listingIds })
}

const getComparisons = async (buyerId) => {
  return await ListingComparison.findAll({ where: { buyer_id: buyerId } })
}

module.exports = {
  getProfile, updateProfile,
  getSavedListings, saveListing, unsaveListing,
  getNotifications, markNotificationRead,
  getMessages, sendMessage,
  saveComparison, getComparisons,
}