const express = require('express');
const passport = require('passport');

const {
  getRooms,
  createRoom,
  updateRoom,
  deleteRoom,
  createMsg,
} = require('../controllers/roomsController');

const router = express.Router();

router.get('/', getRooms);
router.post('/', createRoom);
router.delete('/:roomId', deleteRoom);
router.put('/:roomId', updateRoom);
router.post('/msg/:roomId', createMsg);

module.exports = router;
