// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const {
  getAllEvents,
  createEvent,
  getMyEvents,
} = require('../controllers/eventController');
const protect = require('../middleware/authMiddleware');

router.get('/events', getAllEvents); 
router.post('/events', protect, createEvent); 
router.get('/my-events', protect, getMyEvents); 

module.exports = router;
