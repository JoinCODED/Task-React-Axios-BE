let Room = require('../models/Room');
let Msg = require('../models/Msg');
let slugify = require('slugify');

exports.getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find().populate('messages');
    res.json(rooms);
  } catch (error) {
    next(error);
  }
};

exports.createRoom = async (req, res, next) => {
  try {
    // if (req.user) {
    //   req.body.author = req.user.id;
    // }
    req.body.slug = slugify(req.body.title);

    let newRoom = req.body;

    newRoom = await Room.create(newRoom);
    res.status(201).json(newRoom);
  } catch (error) {
    next(error);
  }
};
exports.updateRoom = async (req, res, next) => {
  // check if owner
  try {
    // const room = await Room.findById(req.params.roomId);
    // if (room.author._id.toString() !== req.user._id.toString()) {
    //   res.status(401).json("You can't update a room if you are not the author");
    // }

    const updatedRoom = await Room.findOneAndUpdate(
      req.params.roomId,
      req.body,
      { new: true }
    ).populate('messages');
    res.status(201).json(updatedRoom);
  } catch (error) {
    next(error);
  }
};
exports.deleteRoom = async (req, res, next) => {
  try {
    // const room = await Room.findById(req.params.roomId);
    // if (room.author._id.toString() !== req.user._id.toString()) {
    //   res.status(401).json("You can't delete a room if you are not the author");
    // }

    await Room.findOneAndDelete({ id: req.params.roomId });
    res.status(201).json('deleted');
  } catch (error) {
    next(error);
  }
};

exports.createMsg = async (req, res, next) => {
  try {
    const newMsg = await Msg.create(req.body);
    const updateRoom = await Room.findOneAndUpdate(
      { _id: req.params.roomId },
      { $push: { messages: newMsg._id } },
      { new: true }
    );
    res.status(201).json(newMsg);
  } catch (error) {
    next(error);
  }
};
