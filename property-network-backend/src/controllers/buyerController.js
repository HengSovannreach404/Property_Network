const buyerService = require('../services/buyerService')

const getProfile = async (req, res, next) => {
  try {
    const buyer = await buyerService.getProfile(req.user.id)
    res.json({ success: true, data: buyer })
  } catch (err) { next(err) }
}

const updateProfile = async (req, res, next) => {
  try {
    const buyer = await buyerService.updateProfile(req.user.id, req.body)
    res.json({ success: true, message: 'Profile updated', data: buyer })
  } catch (err) { next(err) }
}

const getSavedListings = async (req, res, next) => {
  try {
    const listings = await buyerService.getSavedListings(req.user.id)
    res.json({ success: true, data: listings })
  } catch (err) { next(err) }
}

const saveListing = async (req, res, next) => {
  try {
    await buyerService.saveListing(req.user.id, req.params.listing_id)
    res.status(201).json({ success: true, message: 'Listing saved' })
  } catch (err) { next(err) }
}

const unsaveListing = async (req, res, next) => {
  try {
    await buyerService.unsaveListing(req.user.id, req.params.listing_id)
    res.json({ success: true, message: 'Listing removed from saved' })
  } catch (err) { next(err) }
}

const getNotifications = async (req, res, next) => {
  try {
    const notifications = await buyerService.getNotifications(req.user.id)
    res.json({ success: true, data: notifications })
  } catch (err) { next(err) }
}

const markNotificationRead = async (req, res, next) => {
  try {
    await buyerService.markNotificationRead(req.params.notif_id)
    res.json({ success: true, message: 'Notification marked as read' })
  } catch (err) { next(err) }
}

const getMessages = async (req, res, next) => {
  try {
    const messages = await buyerService.getMessages(req.user.id)
    res.json({ success: true, data: messages })
  } catch (err) { next(err) }
}

const sendMessage = async (req, res, next) => {
  try {
    const message = await buyerService.sendMessage(req.user.id, req.body)
    res.status(201).json({ success: true, message: 'Message sent', data: message })
  } catch (err) { next(err) }
}

const saveComparison = async (req, res, next) => {
  try {
    const comparison = await buyerService.saveComparison(req.user.id, req.body.listing_ids)
    res.status(201).json({ success: true, message: 'Comparison saved', data: comparison })
  } catch (err) { next(err) }
}

const getComparisons = async (req, res, next) => {
  try {
    const comparisons = await buyerService.getComparisons(req.user.id)
    res.json({ success: true, data: comparisons })
  } catch (err) { next(err) }
}

module.exports = {
  getProfile, updateProfile,
  getSavedListings, saveListing, unsaveListing,
  getNotifications, markNotificationRead,
  getMessages, sendMessage,
  saveComparison, getComparisons,
}