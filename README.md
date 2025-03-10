# Secure Password Generator 

Created by Cesar Melgar / Node.js application that generates secure and customizable passwords.

## Features

- Generate multiple passwords at once
- Customize password complexity:
  - Length (minimum 4 characters)
  - Include uppercase letters (A-Z)
  - Include lowercase letters (a-z)
  - Include numbers (0-9)
  - Include special characters (\!@#$%^&*)
- API-first design with simple web interface
- Input validation and error handling

## Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the application:
   ```
   npm start
   ```

## Usage

### Web Interface

Visit `http://localhost:3000` in your browser after starting the application.

### API Endpoints

#### Generate Passwords

```
POST /api/generate
```

Request body:
```json
{
  "length": 12,         // Password length (minimum 4)
  "uppercase": "true",  // Include uppercase letters
  "lowercase": "true",  // Include lowercase letters
  "numbers": "true",    // Include numbers
  "special": "true",    // Include special characters
  "count": 5            // Number of passwords to generate
}
```

Response:
```json
{
  "success": true,
  "count": 5,
  "passwords": [
    "Ax7*Kp9$tR2\!",
    "3jR5@qL8zT6#",
    "P2\!mF7$xK9*s",
    "W4@cV6&bN1%d",
    "J5*yH2#zG8$f"
  ]
}
```

#### Get Options

```
GET /api/options
```

Returns available password generation options and defaults.

## Development

- Run in development mode with auto-reload:
  ```
  npm run dev
  ```
- Run tests:
  ```
  npm test
  ```
- Lint code:
  ```
  npm run lint
  ```

## Security Notes

This application uses the JavaScript Math.random() function, which is not cryptographically secure. In a production environment, consider using Node.js crypto module for truly random values.
