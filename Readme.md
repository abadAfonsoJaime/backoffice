# Backoffice Server

A Node.js backoffice server application with MySQL database integration.

## Features

- MySQL database connection
- Configuration management using `config` package
- Debug logging support

## Prerequisites

- Node.js (v14 or higher recommended)
- MySQL server
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone https://github.com/abadAfonsoJaime/backoffice.git
cd backoffice
```

2. Install dependencies:
```bash
npm install
```

3. Configure your database:
   - Create a configuration file in `config/` directory (e.g., `default.json`, `production.json`)
   - Add your database credentials:
```json
{
  "db": {
    "host": "your-database-host",
    "user": "your-database-user",
    "password": "your-database-password",
    "database": "your-database-name"
  }
}
```

## Usage

Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Project Structure

```
backoffice/
├── backoffice/
│   ├── db.js           # Database connection module
│   ├── config/         # Configuration files
│   └── startup/        # Startup scripts
├── package.json        # Project dependencies
├── .gitignore          # Git ignore rules
└── README.md           # Project documentation
```

## Dependencies

- **mysql**: MySQL client for Node.js
- **config**: Configuration management
- **debug**: Debug logging utility

## Environment Variables

Set the `DEBUG` environment variable to enable debug logging:
```bash
# Windows
set DEBUG=purisima:*

# Linux/Mac
export DEBUG=purisima:*
```

## License

ISC

## Author

Afonso Jaime