const Room = require("../models/Room");
const { v4: uuidv4 } = require("uuid");

exports.createRoom = async (req, res) => {
  try {
    const { roomName } = req.body;

    if (!roomName) {
      return res.status(400).json({
        success: false,
        message: "Room name is required",
      });
    }

    const room = await Room.create({
      roomId: uuidv4(),
      roomName,
      owner: req.user.userId,
      participants: [req.user.userId],
    });

    res.status(201).json({
      success: true,
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find()
      .populate("owner", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getRoomById = async (req, res) => {
  try {
    const room = await Room.findOne({
      roomId: req.params.roomId,
    })
    .populate("owner", "name email")
    .populate("participants", "name email");

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      });
    }

    res.status(200).json({
      success: true,
      room,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};