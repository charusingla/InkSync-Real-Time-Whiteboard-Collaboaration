const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const { createRoom, getAllRooms, getRoomById } = require("../controllers/room.controller");

router.post("/", auth, createRoom);
router.get("/", auth, getAllRooms);
router.get("/:roomId", auth, getRoomById);

module.exports = router;