# 🔢 Roman Numeral Converter - Full Stack Application

A comprehensive full-stack application for converting Roman numerals to integers with complete CRUD operations, built with Node.js/Express backend and React frontend.

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Environment Configuration](#-environment-configuration)
- [API Documentation](#-api-documentation)
- [Frontend Features](#-frontend-features)
- [Running the Application](#-running-the-application)
- [Testing](#-testing)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

## ✨ Features

### Backend API

- ✅ Convert Roman numerals to integers
- ✅ Store conversion history in MongoDB
- ✅ Complete CRUD operations for conversions
- ✅ Input validation and error handling
- ✅ RESTful API design
- ✅ Comprehensive test suite with HTTPYac

### Frontend UI

- ✅ Modern, elegant React interface
- ✅ Real-time Roman numeral conversion
- ✅ Search conversions by ID
- ✅ View all conversion history
- ✅ Edit and delete conversions
- ✅ Responsive design with beautiful animations
- ✅ Error handling and loading states

## 🛠 Tech Stack

### Backend

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **dotenv** - Environment variables
- **cors** - Cross-origin resource sharing
- **HTTPYac** - API testing

### Frontend

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with animations
- **ESLint** - Code linting

## 📁 Project Structure

```
romanToInt/
├── api/                          # Backend application
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js            # MongoDB connection
│   │   ├── controllers/
│   │   │   └── romanController.js # Business logic
│   │   ├── middleware/
│   │   │   └── logger.js        # Request logging
│   │   ├── models/
│   │   │   └── Conversion.js    # Mongoose schema
│   │   ├── routes/
│   │   │   └── roman.js         # API routes
│   │   └── server.js            # Express server
│   ├── http/                    # HTTPYac test files
│   │   ├── conversions.http
│   │   ├── error-cases.http
│   │   ├── crud-operations.http
│   │   └── complete-test-suite.http
│   ├── .env                     # Environment variables
│   ├── package.json
│   └── README.md
├── client/                      # Frontend application
│   ├── src/
│   │   ├── App.jsx             # Main React component
│   │   ├── App.css             # Styles
│   │   ├── index.css           # Global styles
│   │   └── main.jsx            # React entry point
│   ├── public/
│   ├── package.json
│   └── index.html
└── README.md                   # This file
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16.0.0 or higher)
- **npm** (v7.0.0 or higher)
- **MongoDB** (v4.4 or higher)
- **Git** (for cloning the repository)

### Verify Installation

```bash
node --version     # Should show v16+
npm --version      # Should show v7+
mongod --version   # Should show v4.4+
```

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/AhmedSoliman00/cyperguards-romanToInt.git
cd cyperguards-romanToInt
```

### 2. Install Backend Dependencies

```bash
cd api
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../client
npm install
```

## ⚙️ Environment Configuration

### 1. MongoDB Setup

#### Option A: Local MongoDB

1. **Install MongoDB** on your system
2. **Start MongoDB service:**

   ```bash
   # Windows
   net start MongoDB

   # macOS with Homebrew
   brew services start mongodb/brew/mongodb-community

   # Linux (Ubuntu)
   sudo systemctl start mongod
   ```

#### Option B: MongoDB Atlas (Cloud)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get connection string from "Connect" → "Connect your application"

### 2. Environment Variables

Create `.env` file in the `api` directory:

```bash
cd api
touch .env  # On Windows: echo. > .env
```

Add the following variables to `.env`:

```env
# Database Configuration
MONGODB_URI="mongodb://localhost:27017/romanToInt"
# For MongoDB Atlas, use: mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/romanToInt

# Server Configuration
PORT=5000
NODE_ENV=development

# Optional: Add these for enhanced security
JWT_SECRET=your-jwt-secret-key-here
CORS_ORIGIN=http://localhost:5174
```

### 3. Verify Database Connection

```bash
cd api
npm run dev
```

You should see:

```
Server is running on port 5000
MongoDB connected
Health check: http://localhost:5000/health
```

## 📚 API Documentation

### Base URL

```
http://localhost:5000/api
```

### Endpoints

#### Health Check

```http
GET /health
```

**Response:**

```json
{
  "status": "OK",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

#### Convert Roman Numeral

```http
POST /convert
Content-Type: application/json

{
  "numeral": "XIV"
}
```

```http
GET /convert?numeral=XIV
```

**Response:**

```json
{
  "success": true,
  "roman": "XIV",
  "integer": 14,
  "id": "65a1b2c3d4e5f6789012345a",
  "timestamp": "2025-01-15T10:30:00.000Z"
}
```

#### Get All Conversions

```http
GET /conversions
```

**Response:**

```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "_id": "65a1b2c3d4e5f6789012345a",
      "roman": "XIV",
      "integer": 14,
      "createdAt": "2025-01-15T10:30:00.000Z",
      "updatedAt": "2025-01-15T10:30:00.000Z"
    }
  ]
}
```

#### Get Conversion by ID

```http
GET /conversions/:id
```

#### Update Conversion

```http
PUT /conversions/:id
Content-Type: application/json

{
  "roman": "XVI"
}
```

#### Delete Conversion

```http
DELETE /conversions/:id
```

#### Get History (Legacy)

```http
GET /history?limit=10
```

### Error Responses

```json
{
  "success": false,
  "error": "Invalid Roman numeral format"
}
```

## 🎨 Frontend Features

### 1. **Convert Tab**

- Input Roman numerals
- Real-time conversion
- Detailed result display with metadata

### 2. **Search by ID Tab**

- Search specific conversions by MongoDB ID
- Display full conversion details

### 3. **All Conversions Tab**

- Grid view of all conversions
- Inline editing capabilities
- Delete functionality with confirmation
- Pagination support

### 4. **Design Features**

- Animated gradient background
- Glass-morphism UI elements
- Smooth transitions and hover effects
- Fully responsive design
- Modern Inter font family

## 🏃‍♂️ Running the Application

### Development Mode

#### 1. Start the Backend (Terminal 1)

```bash
cd api
npm run dev
```

Backend will run on: `http://localhost:5000`

#### 2. Start the Frontend (Terminal 2)

```bash
cd client
npm run dev
```

Frontend will run on: `http://localhost:5174`

### Production Mode

#### Backend

```bash
cd api
npm start
```

#### Frontend

```bash
cd client
npm run build
npm run preview
```

## 🧪 Testing

### Using HTTPYac (Recommended)

1. **Install HTTPYac VS Code Extension**
2. **Open any `.http` file in `/api/http/`**
3. **Click "Send Request" above each test case**

### Quick Test Suite

```bash
cd api/http
# Use quick-test.http for basic functionality testing
```

### Manual Testing with cURL

```bash
# Health Check
curl http://localhost:5000/health

# Convert Roman Numeral
curl -X POST http://localhost:5000/api/convert \
  -H "Content-Type: application/json" \
  -d '{"numeral": "XIV"}'

# Get All Conversions
curl http://localhost:5000/api/conversions
```

## 🚀 Deployment

### Backend Deployment (Heroku/Railway/Vercel)

1. **Set environment variables:**

   ```env
   MONGODB_URI=your-production-mongodb-uri
   PORT=5000
   NODE_ENV=production
   ```

2. **Deploy:**

   ```bash
   # For Heroku
   heroku create your-app-name
   git push heroku main

   # For Railway
   railway login
   railway init
   railway up
   ```

### Frontend Deployment (Netlify/Vercel)

1. **Update API base URL in App.jsx:**

   ```javascript
   const API_BASE = 'https://your-backend-url.com/api'
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   # Upload dist/ folder to your hosting provider
   ```

## 🔧 Common Issues & Solutions

### Issue: MongoDB Connection Failed

**Solution:**

```bash
# Check if MongoDB is running
sudo systemctl status mongod  # Linux
brew services list | grep mongo  # macOS

# Check connection string in .env
MONGODB_URI="mongodb://localhost:27017/romanToInt"
```

### Issue: Port Already in Use

**Solution:**

```bash
# Kill process on port 5000
npx kill-port 5000

# Or change port in .env
PORT=5001
```

### Issue: CORS Errors

**Solution:**
Add to your `.env`:

```env
CORS_ORIGIN=http://localhost:5174
```

### Issue: Dependencies Version Conflicts

**Solution:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📈 Performance Optimization

### Backend

- Database indexing on frequently queried fields
- Request rate limiting
- Response compression
- Query optimization

### Frontend

- Component memoization
- Lazy loading
- Image optimization
- Bundle splitting

## 🔒 Security Considerations

### Backend

- Input validation and sanitization
- Rate limiting
- CORS configuration
- Environment variable security

### Frontend

- XSS protection
- Secure API communication
- Input validation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 👥 Authors

- **Ahmed Soliman** -  - [@AhmedSoliman00](https://github.com/AhmedSoliman00)
- **Alaa Fawzy** -  - [@alaafawzyyyy](https://github.com/alaafawzyyyy)

## 📞 Support

If you have any questions or issues:

1. Check the [Common Issues](#-common-issues--solutions) section
2. Look through existing [GitHub Issues](https://github.com/AhmedSoliman00/cyperguards-romanToInt/issues)
3. Create a new issue with detailed information

## 🙏 Acknowledgments

- Roman numeral conversion algorithm inspiration
- React community for excellent documentation
- MongoDB team for excellent database solution
- HTTPYac for making API testing elegant

---

**Happy coding! 🚀**
