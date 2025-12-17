import mongoose from "mongoose"

const roomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: [true, "Room number is required"],
      unique: true,
      trim: true,
    },
    type: {
      type: String,
      required: [true, "Room type is required"],
      enum: ["single", "double", "suite", "deluxe"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["available", "occupied", "maintenance"],
      default: "available",
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
)

// Add indexes for better query performance
roomSchema.index({ roomNumber: 1 })
roomSchema.index({ type: 1 })
roomSchema.index({ status: 1 })

const Room = mongoose.model("Room", roomSchema)

export default Room
