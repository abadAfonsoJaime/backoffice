# Backoffice Server

A Node.js backoffice server application with MySQL database integration, JWT authentication, and Express.js REST API.

## Features

- MySQL database connection with mysql2
- JWT-based authentication and authorization
- User management with role-based access control (Admin/User roles)
- Secure password hashing with bcrypt
- Configuration management using `config` package
- Debug logging support
- CORS enabled for cross-origin requests
- Security headers with Helmet
- Login and user registration endpoints

## Prerequisites

- Node.js (v14 or higher recommended)
- MySQL 8.0+ server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abadAfonsoJaime/backoffice.git
cd backoffice/backoffice
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database:
   - Edit `config/default.json` with your database credentials:
```json
{
  "dbConfig": {
    "host": "localhost",
    "user": "your-database-user",
    "port": 3306,
    "password": "your-password",
    "database": "your-database-name"
  },
  "jwtPrivateKey": "your-secret-key"
}
```

4. Set up environment variables:
   - For sensitive data, use environment variables or create `config/custom-environment-variables.json`

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

## API Endpoints

### Authentication
- `POST /login` - User login (returns JWT token)

### Users
- `GET /users/me` - Get current user info (requires authentication)
- `POST /users/new` - Create new user (requires authentication + admin role)

## Project Structure

```
backoffice/
├── config/                    # Configuration files
│   ├── default.json          # Default configuration
│   └── custom-environment-variables.json
├── middleware/               # Express middleware
│   ├── auth.js              # JWT authentication middleware
│   └── admin.js             # Admin authorization middleware
├── models/                   # Database models
│   ├── userModel.js         # User database operations
│   ├── loginModel.js        # Login operations
│   └── jwtToken.js          # JWT token generation
├── routes/                   # API routes
│   ├── login.js             # Login routes
│   └── users.js             # User management routes
├── startup/                  # Startup modules
│   └── db.js                # Database connection setup
├── index.js                 # Application entry point
├── package.json             # Project dependencies
└── Readme.md               # Project documentation
```

## Dependencies

- **express** (v5.2.1): Web framework
- **mysql2** (v3.11.5): MySQL client with support for MySQL 8.0+ authentication
- **bcrypt**: Password hashing
- **jsonwebtoken**: JWT token generation and verification
- **config** (v3.3.9): Configuration management
- **debug** (v4.3.4): Debug logging utility
- **cors** (v2.8.6): Cross-Origin Resource Sharing
- **helmet** (v8.1.0): Security headers
- **joi**: Input validation

## Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based access control
- Security headers with Helmet
- Input validation on user registration
- CORS configuration

## Environment Variables

Set the `DEBUG` environment variable to enable debug logging:
```bash
# Windows
set DEBUG=purisima:*

# Linux/Mac
export DEBUG=purisima:*
```

Set JWT private key:
```bash
# Windows
set jwtPrivateKey=your-secret-key

# Linux/Mac
export jwtPrivateKey=your-secret-key
```

## License

ISC

## Author

Afonso Jaime