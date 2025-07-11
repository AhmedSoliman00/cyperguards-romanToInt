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

- **GET** `/api/roman/convert?numeral=XV` - Convert Roman numeral via query parameter
- **POST** `/api/roman/convert` - Convert Roman numeral via request body

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
