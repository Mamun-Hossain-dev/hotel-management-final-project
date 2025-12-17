# Hotel Management Backend API

Express.js REST API for Hotel Room Management System with MongoDB.

## Features

- CRUD operations for hotel rooms
- Search and filter functionality
- MongoDB with Mongoose ODM
- RESTful API design
- Error handling and validation

## API Endpoints

### Rooms

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/rooms` | Get all rooms (with optional filters) |
| GET | `/api/rooms/:id` | Get single room by ID |
| POST | `/api/rooms` | Create new room |
| PUT | `/api/rooms/:id` | Update room |
| DELETE | `/api/rooms/:id` | Delete room |

### Query Parameters

**GET /api/rooms**
- `search` - Search by room number or description
- `type` - Filter by type (single, double, suite, deluxe)
- `status` - Filter by status (available, occupied, maintenance)

Example: `/api/rooms?type=suite&status=available`

## Room Schema

```json
{
  "roomNumber": "String (required, unique)",
  "type": "String (required) - single|double|suite|deluxe",
  "price": "Number (required, min: 0)",
  "status": "String (required) - available|occupied|maintenance",
  "description": "String (optional)",
  "createdAt": "Date (auto)",
  "updatedAt": "Date (auto)"
}
```

## Setup Instructions

See the main project README for complete setup instructions.
