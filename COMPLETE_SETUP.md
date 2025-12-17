# Complete Setup Instructions

## What You'll Build

A professional hotel room management system where you can:
- Add new hotel rooms with details (room number, type, price, status)
- Edit existing rooms
- Delete rooms
- Search rooms by number or description
- Filter by room type (single, double, suite, deluxe)
- Filter by status (available, occupied, maintenance)

---

## Installation Steps

### Step 1: Install Node.js

1. Go to https://nodejs.org
2. Download the **LTS version** (recommended)
3. Install it (accept all defaults)
4. Open Command Prompt or Terminal and verify:
   ```bash
   node --version
   npm --version
   ```
   You should see version numbers.

### Step 2: Setup MongoDB (Free Cloud Database)

1. **Create Account:**
   - Go to https://www.mongodb.com/cloud/atlas
   - Click "Try Free"
   - Sign up with email or Google

2. **Create Database:**
   - Click "Build a Database"
   - Choose **FREE** (M0 Sandbox)
   - Select a cloud provider (AWS recommended)
   - Choose a region close to you
   - Click "Create Cluster"

3. **Create Database User:**
   - Go to "Database Access" (left sidebar)
   - Click "Add New Database User"
   - Username: `admin`
   - Password: Create a strong password (SAVE THIS!)
   - User Privileges: "Read and write to any database"
   - Click "Add User"

4. **Allow Network Access:**
   - Go to "Network Access" (left sidebar)
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere"
   - Click "Confirm"

5. **Get Connection String:**
   - Go to "Database" (left sidebar)
   - Click "Connect" on your cluster
   - Click "Drivers"
   - Copy the connection string (looks like: `mongodb+srv://admin:<password>@cluster0...`)
   - **Replace `<password>` with your actual password**

### Step 3: Extract the Project

1. Locate the downloaded `hotel-room-management.zip`
2. Right-click → "Extract All" or "Extract Here"
3. Open the extracted folder

### Step 4: Setup Backend

1. **Open Backend Folder:**
   - Navigate to `hotel-room-management/backend`

2. **Open Terminal Here:**
   - Windows: Right-click in folder → "Open in Terminal" or "Git Bash Here"
   - Mac/Linux: Right-click → "New Terminal at Folder"

3. **Install Dependencies:**
   ```bash
   npm install
   ```
   Wait for installation to complete (may take 1-2 minutes)

4. **Configure Environment:**
   - Find the file `.env.example`
   - Copy it and rename to `.env`
   - Open `.env` with Notepad or any text editor
   - Paste your MongoDB connection string:
   ```
   MONGODB_URI=mongodb+srv://admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/hotel-management
   PORT=5000
   ```
   - Replace `YOUR_PASSWORD` with your actual database password
   - Save the file

5. **Start Backend Server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   Server running on port 5000
   MongoDB Connected
   ```

   ✅ **Keep this terminal window open!**

### Step 5: Setup Frontend

1. **Open New Terminal:**
   - Open a **NEW** Command Prompt/Terminal window
   - Navigate to `hotel-room-management/frontend`

2. **Install Dependencies:**
   ```bash
   npm install
   ```
   Wait for installation (may take 2-3 minutes)

3. **Configure Environment:**
   - Find `.env.local.example`
   - Copy it and rename to `.env.local`
   - (No changes needed - already configured for localhost)

4. **Start Frontend Server:**
   ```bash
   npm run dev
   ```
   
   You should see:
   ```
   - ready started server on 0.0.0.0:3000, url: http://localhost:3000
   ```

   ✅ **Keep this terminal window open too!**

### Step 6: Use the Application

1. Open your web browser (Chrome, Firefox, Edge, etc.)
2. Go to: **http://localhost:3000**
3. Click "Get Started"
4. Try adding a room:
   - Click "Add Room"
   - Fill in details
   - Click "Create Room"

---

## Folder Structure

```
hotel-room-management/
│
├── backend/                  # Express.js API
│   ├── config/
│   │   └── database.js      # MongoDB connection
│   ├── controllers/
│   │   └── roomController.js # Business logic
│   ├── models/
│   │   └── Room.js          # Database schema
│   ├── routes/
│   │   └── roomRoutes.js    # API endpoints
│   ├── .env                 # Environment variables (YOU CREATE THIS)
│   ├── .env.example         # Environment template
│   ├── package.json         # Dependencies
│   └── server.js            # Entry point
│
└── frontend/                # Next.js App
    ├── app/
    │   ├── layout.tsx       # Root layout
    │   ├── page.tsx         # Home page
    │   ├── globals.css      # Global styles
    │   └── rooms/
    │       └── page.tsx     # Rooms management page
    ├── components/
    │   ├── room-form.tsx    # Add/Edit room form
    │   ├── room-table.tsx   # Display rooms table
    │   ├── delete-room-dialog.tsx
    │   └── ui/              # UI components
    ├── lib/
    │   ├── api.ts           # API client
    │   ├── providers.tsx    # React Query provider
    │   └── utils.ts         # Utilities
    ├── .env.local           # Environment variables (YOU CREATE THIS)
    ├── .env.local.example   # Environment template
    └── package.json         # Dependencies
```

---

## Common Issues & Solutions

### ❌ "Cannot find module"
**Solution:** Run `npm install` in the correct folder (backend or frontend)

### ❌ "Port 5000 is already in use"
**Solution:** 
- Close other programs using port 5000
- Or change port in backend `.env`: `PORT=5001`
- Then update frontend `.env.local`: `NEXT_PUBLIC_API_URL=http://localhost:5001/api`

### ❌ "Failed to load rooms"
**Solution:**
- Make sure backend is running (check terminal)
- Visit http://localhost:5000/api/health
- Should see: `{"success":true,"message":"Server is running"}`

### ❌ "MongoServerError: bad auth"
**Solution:**
- Check your password in `.env` is correct
- Make sure there are no spaces before/after the connection string
- If password has special characters like `@`, `#`, encode them:
  - `@` becomes `%40`
  - `#` becomes `%23`

### ❌ "Could not connect to any servers"
**Solution:**
- Check Network Access in MongoDB Atlas
- Make sure "Allow Access from Anywhere" is enabled
- Wait 2-3 minutes after adding IP address

---

## API Endpoints

Once backend is running, test these endpoints:

- **Health Check:** http://localhost:5000/api/health
- **Get All Rooms:** http://localhost:5000/api/rooms
- **Get Single Room:** http://localhost:5000/api/rooms/:id
- **Create Room:** POST http://localhost:5000/api/rooms
- **Update Room:** PUT http://localhost:5000/api/rooms/:id
- **Delete Room:** DELETE http://localhost:5000/api/rooms/:id

---

## Development Workflow

**Every time you want to work on the project:**

1. **Start Backend:**
   ```bash
   cd backend
   npm run dev
   ```

2. **Start Frontend (in new terminal):**
   ```bash
   cd frontend
   npm run dev
   ```

3. **Open Browser:**
   - http://localhost:3000

**To stop servers:**
- Press `Ctrl + C` in each terminal

---

## Need Help?

1. Check `README.md` for detailed documentation
2. Check `SETUP_GUIDE_BENGALI.md` for Bengali instructions
3. Make sure both backend and frontend terminals show no errors
4. Verify MongoDB Atlas is set up correctly

---

## Next Steps

Once everything works:
- ✅ Try adding multiple rooms
- ✅ Search and filter functionality
- ✅ Edit existing rooms
- ✅ Delete rooms
- ✅ Explore the code to understand how it works

Happy Coding! 🚀
