# Roman to Integer API

A simple Express.js API for converting Roman numerals to integers.

## Project Structure

```
api/
├── src/
│   ├── controllers/     # Business logic
│   ├── middleware/      # Custom middleware
│   ├── routes/          # Route definitions
│   ├── utils/           # Utility functions
│   └── server.js        # Main server file
├── package.json
└── README.md
```

## Installation

```bash
npm install
```

## Running the Server

### Development (with auto-restart)

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Endpoints

### Health Check

- **GET** `/health` - Check if the server is running

### Roman Numeral Conversion

- **GET** `/api/convert?numeral=XV` - Convert Roman numeral via query parameter
- **POST** `/api/convert` - Convert Roman numeral via request body

### Conversion History

- **GET** `/api/history?limit=10` - Get conversion history with optional limit

### CRUD Operations for Conversions

- **GET** `/api/conversions` - Get all conversion records
- **GET** `/api/conversions/:id` - Get a specific conversion record by ID
- **PUT** `/api/conversions/:id` - Update a conversion record
- **DELETE** `/api/conversions/:id` - Delete a conversion record by ID

#### Example Usage

**GET Request:**

```
GET http://localhost:5000/api/roman/convert?numeral=XV
```

**Response:**

```json
{
  "roman": "XV",
  "integer": 15,
  "success": true
}
```

**POST Request:**

```json
POST http://localhost:5000/api/roman/convert
Content-Type: application/json

{
  "numeral": "XV"
}
```

**Response:**

```json
{
  "roman": "XV",
  "integer": 15,
  "success": true
}
```

#### CRUD Examples

**Get All Conversions:**

```
GET http://localhost:5000/api/conversions
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

**Get Single Conversion:**

```
GET http://localhost:5000/api/conversions/65a1b2c3d4e5f6789012345a
```

**Update Conversion:**

```
PUT http://localhost:5000/api/conversions/65a1b2c3d4e5f6789012345a
Content-Type: application/json

{
  "roman": "XVI"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Conversion updated successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6789012345a",
    "roman": "XVI",
    "integer": 16,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:45:00.000Z"
  }
}
```

**Delete Conversion:**

```
DELETE http://localhost:5000/api/conversions/65a1b2c3d4e5f6789012345a
```

**Response:**

```json
{
  "success": true,
  "message": "Conversion deleted successfully",
  "data": {
    "_id": "65a1b2c3d4e5f6789012345a",
    "roman": "XVI",
    "integer": 16,
    "createdAt": "2025-01-15T10:30:00.000Z",
    "updatedAt": "2025-01-15T11:45:00.000Z"
  }
}
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
NODE_ENV=development
```

## Supported Roman Numerals

- I = 1
- V = 5
- X = 10
- L = 50
- C = 100
- D = 500
- M = 1000

## Error Handling

The API returns appropriate HTTP status codes and error messages for:

- Invalid Roman numerals
- Missing parameters
- Server errors
