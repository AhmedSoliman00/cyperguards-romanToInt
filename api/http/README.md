# HTTP Test Suite for Roman to Integer API

This directory contains comprehensive HTTP test files using HTTPYac for testing the Roman to Integer conversion API.

## Files Description

### 1. `environment.http`

- Basic environment setup and health checks
- Tests the server connectivity and basic endpoints

### 2. `conversions.http`

- Comprehensive conversion tests for valid Roman numerals
- Tests both GET and POST methods
- Covers basic numerals (I, V, X, L, C, D, M) and complex combinations
- Includes edge cases like lowercase input and input with spaces

### 3. `error-cases.http`

- Error handling test cases
- Tests for missing parameters, invalid Roman numerals, wrong data types
- Tests malformed requests and non-existent routes

### 4. `history.http`

- Tests for the history endpoint
- Database population tests
- Tests history retrieval with different limits

### 5. `performance.http`

- Performance testing scenarios
- Batch testing with multiple conversions
- Common Roman numerals test suite

### 6. `complete-test-suite.http`

- Step-by-step comprehensive test workflow
- Covers the complete API functionality in sequence

### 7. `.httpyac.json`

- HTTPYac configuration file
- Environment settings and request configurations

### 8. `crud-operations.http`

- CRUD operation tests for conversions
- Tests for GET, PUT, DELETE operations on individual conversions
- Validation and error handling for CRUD operations

### 9. `crud-workflow.http`

- Complete CRUD workflow testing
- Step-by-step testing of all CRUD operations in sequence

### 10. `crud-validation.http`

- Advanced validation tests for CRUD operations
- Edge cases, invalid data types, and error scenarios
- ID format validation and content-type testing

## How to Use

### Prerequisites

1. Install HTTPYac extension in VS Code or use HTTPYac CLI
2. Ensure your API server is running on `http://localhost:5000`
3. Make sure MongoDB is running and connected

### Running Tests

#### Using VS Code HTTPYac Extension:

1. Open any `.http` file
2. Click the "Send Request" button above each test case
3. View the response in the adjacent panel

#### Using HTTPYac CLI:

```bash
# Install HTTPYac CLI
npm install -g httpyac

# Run specific test file
httpyac conversions.http

# Run all tests in the directory
httpyac *.http

# Run with specific environment
httpyac --env local conversions.http
```

## Test Categories

### Basic Functionality Tests

- Single character conversions (I=1, V=5, X=10, etc.)
- Subtractive notation (IV=4, IX=9, XL=40, etc.)
- Complex combinations (MCMXC=1990, MMXXIV=2024)

### Edge Cases

- Case insensitive input (xiii = XIII = 13)
- Input with whitespace (" XIV " = 14)
- Maximum value (MMMCMXCIX = 3999)

### Error Scenarios

- Missing parameters
- Invalid Roman numerals (IIII, IC, XYZ, etc.)
- Wrong data types (numbers, booleans, arrays)
- Malformed JSON requests

### Database Operations

- Conversion history retrieval
- Pagination with limit parameter
- Data persistence verification

## Expected Test Results

### Valid Conversions

```json
{
  "success": true,
  "roman": "XIV",
  "integer": 14,
  "id": "64f...",
  "timestamp": "2025-01-..."
}
```

### Error Cases

```json
{
  "success": false,
  "error": "Invalid Roman numeral format"
}
```

### History Response

```json
{
  "success": true,
  "count": 5,
  "data": [...]
}
```

## Roman Numeral Reference

| Roman | Integer | Roman | Integer |
| ----- | ------- | ----- | ------- |
| I     | 1       | XL    | 40      |
| V     | 5       | L     | 50      |
| X     | 10      | XC    | 90      |
| L     | 50      | C     | 100     |
| C     | 100     | CD    | 400     |
| D     | 500     | D     | 500     |
| M     | 1000    | CM    | 900     |
| IV    | 4       | M     | 1000    |
| IX    | 9       | MCMXC | 1990    |

## Troubleshooting

### Common Issues

1. **Connection Refused**: Ensure the API server is running on port 5000
2. **Database Errors**: Check MongoDB connection and ensure the database is accessible
3. **Timeout Errors**: Increase timeout in `.httpyac.json` if needed

### Debugging

- Check server logs for detailed error information
- Verify environment variables in `.env` file
- Ensure all dependencies are installed (`npm install`)

## Contributing

When adding new test cases:

1. Follow the existing naming convention
2. Include both positive and negative test cases
3. Add appropriate comments describing the test purpose
4. Update this README if adding new test categories
