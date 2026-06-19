const express = require('express')
const router = express.Router()
const {
  getProfile, updateProfile,
  getSavedListings, saveListing, unsaveListing,
  getNotifications, markNotificationRead,
  getMessages, sendMessage,
  saveComparison, getComparisons,
} = require('../controllers/buyerController')
const { protect } = require('../middleware/authMiddleware')
const { allowRoles } = require('../middleware/roleMiddleware')

router.use(protect)
router.use(allowRoles('buyer'))

router.get('/profile', getProfile)
router.put('/profile', updateProfile)
router.get('/saved', getSavedListings)
router.post('/saved/:listing_id', saveListing)
router.delete('/saved/:listing_id', unsaveListing)
router.get('/notifications', getNotifications)
router.patch('/notifications/:notif_id', markNotificationRead)
router.get('/messages', getMessages)
router.post('/messages', sendMessage)
router.get('/comparisons', getComparisons)
router.post('/comparisons', saveComparison)

module.exports = router