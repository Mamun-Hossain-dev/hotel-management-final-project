# Hotel Room Management System

A full-stack hotel room management application with separate **Node.js Express Backend** and **Next.js Frontend**.

## Architecture

- **Backend:** Node.js + Express + MongoDB (Mongoose)
- **Frontend:** Next.js 15 + React Query + TypeScript
- **Database:** MongoDB (Cloud or Local)

## Features

- Complete CRUD operations for hotel rooms
- Real-time search and filtering
- RESTful API with Express
- React Query for efficient data fetching
- Responsive UI with shadcn/ui components
- Toast notifications for user feedback
- Input validation and error handling
- Clean separation of concerns

## Project Structure

```
hotel-room-management/
├── backend/                 # Express API Server
│   ├── models/             # Mongoose schemas
│   ├── controllers/        # Route controllers
│   ├── routes/             # API routes
│   ├── config/             # Database config
│   ├── server.js           # Entry point
│   └── package.json
│
└── frontend/               # Next.js Application
    ├── app/               # Next.js pages
    ├── components/        # React components
    ├── lib/              # Utilities & API client
    └── package.json
```

## Quick Setup (5 Minutes)

### 1. Get MongoDB Connection String

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a FREE account
3. Create a cluster
4. Click "Connect" → "Drivers"
5. Copy your connection string

### 2. Setup Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env and add your MONGODB_URI
npm run dev
```

Backend will run on: **http://localhost:5000**

### 3. Setup Frontend

```bash
cd frontend
npm install
cp .env.local.example .env.local
npm run dev
```

Frontend will run on: **http://localhost:3000**

### 4. Open Application

Open [http://localhost:3000](http://localhost:3000) and click "Get Started"!

## Detailed Setup

### Backend Setup

1. **Navigate to backend folder:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.example .env
   ```

4. **Edit `.env` file:**
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hotel-db?retryWrites=true&w=majority
   PORT=5000
   ```

5. **Start the server:**
   ```bash
   npm run dev        # Development with nodemon
   # or
   npm start          # Production
   ```

The API will be available at `http://localhost:5000/api`

### Frontend Setup

1. **Navigate to frontend folder:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp .env.local.example .env.local
   ```

4. **Edit `.env.local` file:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The app will be available at `http://localhost:3000`

## API Endpoints

### Base URL: `http://localhost:5000/api`

| Method | Endpoint | Description | Query Params |
|--------|----------|-------------|--------------|
| GET | `/rooms` | Get all rooms | `search`, `type`, `status` |
| GET | `/rooms/:id` | Get single room | - |
| POST | `/rooms` | Create new room | - |
| PUT | `/rooms/:id` | Update room | - |
| DELETE | `/rooms/:id` | Delete room | - |
| GET | `/health` | Health check | - |

### Example Requests

**Get all available suite rooms:**
```bash
GET http://localhost:5000/api/rooms?type=suite&status=available
```

**Create a new room:**
```bash
POST http://localhost:5000/api/rooms
Content-Type: application/json

{
  "roomNumber": "101",
  "type": "single",
  "price": 99.99,
  "status": "available",
  "description": "Cozy single room"
}
```

## Database Schema

```javascript
{
  roomNumber: String (required, unique),
  type: String (required) - single|double|suite|deluxe,
  price: Number (required, min: 0),
  status: String (required) - available|occupied|maintenance,
  description: String (optional),
  createdAt: Date (auto),
  updatedAt: Date (auto)
}
```

## Technology Stack

### Backend
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Middleware:** CORS, Express JSON parser
- **Dev Tools:** Nodemon for hot reload

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **Data Fetching:** React Query (TanStack Query)
- **HTTP Client:** Fetch API

## Usage

### Managing Rooms

1. **Add Room:** Click "Add Room" button, fill the form, submit
2. **Search:** Type in the search bar to find rooms by number or description
3. **Filter:** Use dropdowns to filter by type (single, double, suite, deluxe) or status
4. **Edit:** Click the pencil icon on any room to update details
5. **Delete:** Click the trash icon to remove a room (with confirmation)

### Room Types
- **Single:** Standard single occupancy room
- **Double:** Double occupancy room
- **Suite:** Premium suite with extra amenities
- **Deluxe:** Luxury deluxe room

### Room Status
- **Available:** Room is ready for booking
- **Occupied:** Room is currently occupied
- **Maintenance:** Room is under maintenance

## Troubleshooting

### Backend Issues

**MongoDB connection error:**
```
Error: MongooseServerSelectionError
```
- Check your MongoDB connection string in `backend/.env`
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify database username and password

**Port already in use:**
```
Error: Port 5000 is already in use
```
- Change `PORT` in `backend/.env` to another port (e.g., 5001)
- Update `NEXT_PUBLIC_API_URL` in `frontend/.env.local` accordingly

### Frontend Issues

**Failed to fetch rooms:**
- Ensure backend server is running on port 5000
- Check `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
- Check browser console for CORS errors

**Module not found:**
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Development Tips

### Backend
- API routes are in `backend/routes/`
- Business logic is in `backend/controllers/`
- Database models are in `backend/models/`
- Use Postman or Thunder Client to test API endpoints

### Frontend
- API client is in `frontend/lib/api.ts`
- Components are in `frontend/components/`
- Pages are in `frontend/app/`
- React Query handles caching automatically

## Production Deployment

### Backend (Vercel, Railway, Render)
1. Push code to GitHub
2. Connect repository to hosting platform
3. Add `MONGODB_URI` environment variable
4. Deploy

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on Vercel
3. Add `NEXT_PUBLIC_API_URL` environment variable (your backend URL)
4. Deploy

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this project for learning or commercial purposes.

## Support

For issues or questions:
1. Check the troubleshooting section
2. Review the API documentation
3. Check MongoDB Atlas connection settings
4. Ensure both servers are running

---

**Built with ❤️ using Node.js, Express, MongoDB, Next.js, and React Query**
