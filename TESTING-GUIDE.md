
## 🧪 Testing the Full Stack

### 1. Backend API Testing

**Using Postman:**
- Import `backoffice/integration-tools/Backoffice-API-Tests.postman_collection.json`
- Import `backoffice/integration-tools/Backoffice-API.postman_environment.json`
- See `backoffice/integration-tools/POSTMAN-GUIDE.md` for details

**Using Newman (Command Line):**
```bash
cd backoffice
npm test
```

### 2. Frontend Testing

**Manual Testing Checklist:**
1. Open http://localhost:3000
2. Login with credentials
3. Navigate to Cards page
4. Create/edit/delete cards
5. Test logout functionality
6. Test protected routes (without authentication)

**Key Test Scenarios:**
- ✅ Login with valid credentials
- ✅ Login with invalid credentials (should show error)
- ✅ Access protected routes without login (should redirect)
- ✅ Create new card (admin only)
- ✅ Edit existing card
- ✅ Logout and verify session cleared
- ✅ API calls to backend succeed
- ✅ Toast notifications appear

### 3. Integration Testing

Test the full flow:
```
User Login → JWT Token → API Request → MySQL Query → Response → UI Update
```

## Usage by Component

### Backend API Usage

Start the server:
```bash
cd backoffice
npm start
```

For development with auto-reload:
```bash
npm run dev
```

The server will start on `http://localhost:4000`

### Frontend Usage

Start the React app:
```bash
cd FrontAdminTable
npm start
```

The app will automatically open at `http://localhost:3000`

## API Endpoints

### Authentication Endpoints
- `POST /login` - User login (returns JWT token)
  - Body: `{ "username": "admin", "password": "admin123" }`
  - Returns: JWT token in `x-auth-token` header

### User Management Endpoints
- `GET /users/me` - Get current user info
  - Requires: JWT token in `x-auth-token` header
  - Returns: User object (without password)

- `POST /users/new` - Create new user
  - Requires: JWT token + Admin role
  - Body: `{ "username": "...", "email": "...", "password": "...", "isAdmin": false }`

### Cards/Posts Endpoints
- `GET /cards` - Get all cards
  - Requires: JWT token
  - Returns: Array of card objects

- `GET /cards/:id` - Get specific card
  - Requires: JWT token
  - Returns: Single card object

- `POST /cards` - Create new card
  - Requires: JWT token + Admin role
  - Body: Card data

- `PUT /cards/:id` - Update card
  - Requires: JWT token + Admin role
  - Body: Updated card data

- `DELETE /cards/:id` - Delete card
  - Requires: JWT token + Admin role
