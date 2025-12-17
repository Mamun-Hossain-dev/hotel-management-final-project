import Room from "../models/Room.js"

// Get all rooms with optional filters
export const getRooms = async (req, res) => {
  try {
    const { search, type, status } = req.query

    // Build query object
    const query = {}

    if (search) {
      query.$or = [
        { roomNumber: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ]
    }

    if (type && type !== "all") {
      query.type = type
    }

    if (status && status !== "all") {
      query.status = status
    }

    const rooms = await Room.find(query).sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: rooms.length,
      data: rooms,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching rooms",
      error: error.message,
    })
  }
}

// Get single room by ID
export const getRoomById = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      })
    }

    res.status(200).json({
      success: true,
      data: room,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching room",
      error: error.message,
    })
  }
}

// Create new room
export const createRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status, description } = req.body

    // Validate required fields
    if (!roomNumber || !type || !price || !status) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      })
    }

    // Check if room number already exists
    const existingRoom = await Room.findOne({ roomNumber })
    if (existingRoom) {
      return res.status(400).json({
        success: false,
        message: "Room number already exists",
      })
    }

    const room = await Room.create({
      roomNumber,
      type,
      price,
      status,
      description,
    })

    res.status(201).json({
      success: true,
      message: "Room created successfully",
      data: room,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating room",
      error: error.message,
    })
  }
}

// Update room
export const updateRoom = async (req, res) => {
  try {
    const { roomNumber, type, price, status, description } = req.body

    // Check if room exists
    const room = await Room.findById(req.params.id)
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      })
    }

    // Check if new room number already exists (if room number is being changed)
    if (roomNumber && roomNumber !== room.roomNumber) {
      const existingRoom = await Room.findOne({ roomNumber })
      if (existingRoom) {
        return res.status(400).json({
          success: false,
          message: "Room number already exists",
        })
      }
    }

    const updatedRoom = await Room.findByIdAndUpdate(
      req.params.id,
      { roomNumber, type, price, status, description },
      { new: true, runValidators: true },
    )

    res.status(200).json({
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating room",
      error: error.message,
    })
  }
}

// Delete room
export const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findById(req.params.id)

    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found",
      })
    }

    await Room.findByIdAndDelete(req.params.id)

    res.status(200).json({
      success: true,
      message: "Room deleted successfully",
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting room",
      error: error.message,
    })
  }
}
