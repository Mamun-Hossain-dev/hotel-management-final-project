"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Pencil, Trash2 } from "lucide-react"
import { RoomForm } from "./room-form"
import { DeleteRoomDialog } from "./delete-room-dialog"
import type { Room } from "@/lib/api"

interface RoomTableProps {
  rooms: Room[]
}

export function RoomTable({ rooms }: RoomTableProps) {
  const [editRoom, setEditRoom] = useState<Room | null>(null)
  const [deleteRoom, setDeleteRoom] = useState<Room | null>(null)
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  const handleEdit = (room: Room) => {
    setEditRoom(room)
    setIsFormOpen(true)
  }

  const handleDelete = (room: Room) => {
    setDeleteRoom(room)
    setIsDeleteOpen(true)
  }

  const handleFormClose = () => {
    setIsFormOpen(false)
    setEditRoom(null)
  }

  const handleDeleteClose = () => {
    setIsDeleteOpen(false)
    setDeleteRoom(null)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20"
      case "occupied":
        return "bg-red-500/10 text-red-500 hover:bg-red-500/20"
      case "maintenance":
        return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20"
      default:
        return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
    }
  }

  const formatType = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1)
  }

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  if (rooms.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <p className="text-lg font-medium text-muted-foreground">No rooms found</p>
        <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
      </div>
    )
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Room Number</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rooms.map((room) => (
              <TableRow key={room._id}>
                <TableCell className="font-medium">{room.roomNumber}</TableCell>
                <TableCell>{formatType(room.type)}</TableCell>
                <TableCell>${room.price.toFixed(2)}</TableCell>
                <TableCell>
                  <Badge variant="secondary" className={getStatusColor(room.status)}>
                    {formatStatus(room.status)}
                  </Badge>
                </TableCell>
                <TableCell className="max-w-[300px] truncate">{room.description || "-"}</TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEdit(room)}>
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit room</span>
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(room)}>
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete room</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <RoomForm room={editRoom} open={isFormOpen} onOpenChange={handleFormClose} />
      <DeleteRoomDialog room={deleteRoom} open={isDeleteOpen} onOpenChange={handleDeleteClose} />
    </>
  )
}
