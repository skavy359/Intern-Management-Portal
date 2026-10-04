# Intern Management & Training Portal

## Day 8 Final Assignment

This project is the final full-stack assignment for an eight-day Node.js backend
training journey. It extends the intern-management API developed during the
earlier days into a complete internal company portal with a React frontend,
authentication, authorization, MySQL persistence, CRUD operations, validation,
search, pagination, and an admin/user experience.

The project intentionally reuses the existing `backend_training` database and
`interns` table. It does not replace the earlier work or create a separate
database.

---

## What I Learned During the Eight Days

### Day 1 - JavaScript and Node.js foundations

- Running JavaScript outside the browser with Node.js
- CommonJS modules and `require`/`module.exports`
- Splitting logic into reusable files
- Reading command-line output and debugging runtime errors
- Creating simple Node.js programs and HTTP responses

### Day 2 - Express.js application basics

- Creating an Express server
- Understanding the request/response lifecycle
- Defining routes for different HTTP methods
- Parsing JSON request bodies
- Using development tools such as Nodemon
- Separating server startup from application behavior

### Day 3 - MySQL and database connectivity

- Connecting Node.js to MySQL with `mysql2`
- Loading configuration through environment variables
- Working with databases and tables
- Executing SQL queries from application code
- Understanding connection pools
- Reading rows and database operation results

### Day 4 - REST API and CRUD

- Designing REST endpoints
- Mapping HTTP methods to operations:
  - `GET` for reading resources
  - `POST` for creating resources
  - `PUT` for replacing/updating resources
  - `PATCH` for partial changes
  - `DELETE` for deletion or deactivation
- Implementing create, read, update, and soft-delete operations
- Returning meaningful HTTP status codes
- Handling missing resources and duplicate records

### Day 5 - Layered backend architecture

- Organizing a backend into routes, controllers, services, and repositories
- Keeping controllers thin
- Moving business rules into services
- Keeping SQL in the repository/database layer
- Reusing middleware instead of duplicating request logic
- Improving maintainability through separation of responsibilities

### Day 6 - Validation, search, and pagination

- Validating request bodies, route parameters, and query parameters
- Validating names, emails, roles, IDs, limits, and offsets
- Searching across name, email, and role
- Using parameterized SQL queries
- Adding pagination with safe limits
- Returning empty collections instead of incorrect `404` responses

### Day 7 - API quality, security, and testing

- Understanding REST response conventions
- Using status codes such as `200`, `201`, `400`, `401`, `403`, `404`,
  `409`, and `500`
- Centralized error handling
- Authentication versus authorization
- Protecting routes with middleware
- Avoiding SQL injection with placeholders
- Using Postman to test success and failure scenarios
- Preferring soft delete when records should be preserved

### Day 8 - Full-stack integration and final assignment

- Building a React frontend with Vite
- Connecting React to the backend with Axios
- Managing authentication state with React Context
- Implementing protected frontend routes
- Creating separate admin and intern experiences
- Building forms, tables, modals, loading states, empty states, and toasts
- Integrating the frontend with real MySQL-backed API data
- Debugging frontend/backend contract mismatches
- Verifying the final application in a browser

---

## Final Assignment Goals

The final application demonstrates:

- A professional frontend
- A layered Node.js and Express backend
- MySQL persistence
- Authentication and role-based authorization
- Admin and intern portals
- Complete intern CRUD operations
- Search and pagination
- Input validation and centralized error handling
- Secure password storage
- A Postman collection for API verification
- Documentation and reproducible setup

---

## Application Features

### Authentication and security

- JWT login and protected API routes
- Bcrypt password hashing
- Admin and intern roles
- Role-based backend authorization
- Protected frontend routes
- CORS configuration
- Helmet security headers
- Environment-based configuration
- Consistent success and error responses
- No passwords returned in API responses

### Admin portal

- Dashboard statistics from MySQL
- Total, active, and disabled intern counts
- Role distribution
- Recent interns
- Paginated intern table
- Search by name, email, or role
- Search results include total counts and paginated navigation
- Create intern
- View intern details
- Edit intern
- Soft-disable intern with confirmation
- Re-enable disabled intern
- Loading, empty, error, and success states
- Toast notifications for completed actions

### Intern portal

- Separate dashboard overview
- Welcome section
- Account summary
- Role and account status
- Training progress placeholder for future course data
- Separate profile page
- Update personal name and email
- Change password
- No admin controls for intern users

---

## Architecture

```text
React + Vite frontend
        |
        v
Axios API client
        |
        v
Express server
        |
        v
Middleware
(CORS, logger, authentication, authorization, validation)
        |
        v
Routes
        |
        v
Controllers
        |
        v
Services
        |
        v
Repositories
        |
        v
MySQL: backend_training.interns
```

### Why this architecture?

- **Routes** define the public API surface.
- **Controllers** translate HTTP requests into service calls.
- **Services** contain business rules and password operations.
- **Repositories** contain parameterized SQL queries.
- **Middleware** handles cross-cutting concerns such as authentication and
  validation.
- **React components** focus on user interaction and presentation.

This structure makes it easier to test, debug, and extend the application
without putting database logic directly into UI or route files.

---

## Technology Stack

| Area | Technology |
| --- | --- |
| Runtime | Node.js 18+ |
| Backend | Express.js |
| Database | MySQL 8+ |
| Database driver | mysql2 |
| Security headers | Helmet |
| Authentication | JSON Web Tokens |
| Password hashing | bcryptjs |
| Frontend | React 18 |
| Frontend tooling | Vite |
| Styling | Tailwind CSS |
| HTTP client | Axios |
| Icons | lucide-react |
| API testing | Postman |
| Development reload | Nodemon |

---

## Project Structure

```text
Day8/
├── src/
│   ├── server.js
│   ├── config/
│   │   └── env.js
│   ├── db/
│   │   └── connection.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── intern.routes.js
│   │   └── dashboard.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── intern.controller.js
│   │   └── dashboard.controller.js
│   ├── services/
│   │   ├── auth.service.js
│   │   ├── intern.service.js
│   │   └── dashboard.service.js
│   ├── repositories/
│   │   ├── auth.repository.js
│   │   ├── intern.repository.js
│   │   └── dashboard.repository.js
│   ├── middleware/
│   │   ├── logger.js
│   │   ├── error-handler.js
│   │   ├── auth.middleware.js
│   │   ├── authorization.middleware.js
│   │   └── validate.middleware.js
│   ├── validators/
│   │   ├── auth.validator.js
│   │   └── intern.validator.js
│   └── utils/
│       └── response.js
├── migrations/
│   ├── 001_add_auth_fields.sql
│   ├── run-migration.js
│   └── seed.js
├── postman/
│   └── Intern_Management_Portal.postman_collection.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── .env.example
├── package.json
└── README.md
```

---

## Database Design

The application uses the existing `backend_training` database.

| Column | Purpose |
| --- | --- |
| `id` | Primary key |
| `name` | Intern name |
| `email` | Unique login email |
| `role` | Admin or intern role |
| `created_at` | Record creation timestamp |
| `is_enabled` | Active/disabled account flag |
| `password_hash` | Bcrypt password hash added for Day 8 authentication |

The only schema extension required for authentication is:

```sql
ALTER TABLE interns
ADD COLUMN password_hash VARCHAR(255) DEFAULT NULL;
```

The migration checks whether the column already exists before changing the
schema. Existing records are preserved.

---

## Installation and Running

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- MySQL 8 or later

### Backend

```bash
cd /Users/kavy/Documents/NodeTraining/Day8
npm install
cp .env.example .env
```

Update `.env` with the local MySQL credentials:

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_PORT=3306
DB_NAME=backend_training
JWT_SECRET=replace-with-a-long-random-secret
JWT_EXPIRES_IN=24h
```

Run the migration and seed:

```bash
npm run migrate
npm run seed
npm run dev
```

The seed command preserves existing interns, refreshes the demo credentials,
and adds deterministic demo records until the database contains 100 interns.

### Frontend

Open a second terminal:

```bash
cd /Users/kavy/Documents/NodeTraining/Day8/frontend
npm install
npm run dev
```

Open:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:3000`

---

## Demo Accounts

After running `npm run seed`:

| Account | Email | Password |
| --- | --- | --- |
| Admin | `kavy@example.com` | `Admin@123` |
| Intern | `rahul@example.com` | `Intern@123` |

Change these values before using the project outside a local demonstration.

---

## API Reference

### Authentication

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `POST` | `/api/auth/login` | Authenticate a user | Public |
| `GET` | `/api/auth/me` | Get the logged-in user | Authenticated |

### Intern management

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/interns` | List active interns | Authenticated |
| `GET` | `/api/interns?all=true` | List active and disabled interns | Admin |
| `GET` | `/api/interns/:id` | Get one intern | Authenticated |
| `GET` | `/api/interns/search?keyword=` | Search interns | Authenticated |
| `POST` | `/api/interns` | Create an intern | Admin |
| `PUT` | `/api/interns/:id` | Update an intern | Admin |
| `DELETE` | `/api/interns/:id` | Soft-disable an intern | Admin |
| `PATCH` | `/api/interns/:id/enable` | Re-enable an intern | Admin |
| `PUT` | `/api/interns/profile` | Update own profile | Authenticated |
| `PUT` | `/api/interns/change-password` | Change own password | Authenticated |

### Dashboard

| Method | Endpoint | Description | Access |
| --- | --- | --- | --- |
| `GET` | `/api/dashboard/stats` | Get MySQL-backed dashboard statistics | Admin |

### Pagination

List and search endpoints support:

```text
?limit=20&offset=0
```

Validation rules:

- `limit` must be a positive number
- `limit` cannot exceed `100`
- `offset` must be a non-negative number
- Invalid IDs and query parameters return `400`
- Search responses include `total`, `limit`, `offset`, and `hasMore`

### Response format

Successful response:

```json
{
  "success": true,
  "message": "Interns retrieved successfully",
  "data": {}
}
```

Error response:

```json
{
  "success": false,
  "message": "Invalid email format"
}
```

---

## API and Security Practices

- SQL queries use `?` placeholders instead of string concatenation.
- Passwords are hashed with bcrypt and never stored in plain text.
- JWTs are verified in backend middleware.
- Admin permissions are enforced on the backend, not only in React.
- Request bodies, IDs, roles, emails, limits, and offsets are validated.
- Duplicate emails return `409 Conflict`.
- Missing records return `404 Not Found`.
- Authentication failures return `401 Unauthorized`.
- Insufficient permissions return `403 Forbidden`.
- Soft delete preserves database history.
- Centralized error handling prevents raw database errors from being exposed.
- Secrets are loaded from `.env` and `.env` is not committed.
- CORS allows the configured frontend origin.
- Helmet adds standard browser security headers.

---

## Postman Demonstration

Import:

```text
postman/Intern_Management_Portal.postman_collection.json
```

The collection includes:

- Admin and intern login
- Authenticated and unauthenticated requests
- List and detail requests
- Create, update, disable, and enable operations
- Search and pagination
- Missing fields
- Invalid email and role
- Invalid IDs
- Invalid and excessive pagination values
- Duplicate email conflicts
- Authorization checks
- Missing-resource scenarios

Collection variables include:

- `baseUrl`
- `token`
- `internToken`
- `internId`

---

## Verification Checklist

### Backend

- [x] Express routes
- [x] Controllers, services, and repositories
- [x] MySQL connection pool
- [x] List, detail, create, update, and soft-delete endpoints
- [x] Search and pagination
- [x] Parameterized SQL
- [x] Authentication and authorization
- [x] Request validation
- [x] Centralized error handling
- [x] Safe response format

### Frontend

- [x] Login screen
- [x] Protected routes
- [x] Admin dashboard
- [x] Intern dashboard
- [x] Separate profile page
- [x] Intern table
- [x] Search and pagination
- [x] Create and edit forms
- [x] View details modal
- [x] Disable confirmation modal
- [x] Enable/disable controls
- [x] Loading, empty, error, and success states
- [x] Responsive layout
- [x] Real API integration

### Validation performed

```bash
cd frontend
npm run build
```

The production frontend build passes. Backend JavaScript syntax checks also
pass, and the application was smoke-tested through the browser with the demo
accounts.

Automated backend checks are available with:

```bash
npm test
```

They cover request validators and the shared response contract without
requiring destructive database setup.

---

## What This Assignment Demonstrates

This final project demonstrates the progression from a simple Node.js program
to a structured full-stack application:

1. Start with JavaScript and Node.js fundamentals.
2. Build an HTTP server with Express.
3. Connect the server to MySQL.
4. Design REST endpoints and CRUD operations.
5. Separate routing, controllers, services, and repositories.
6. Add validation, search, pagination, and safe SQL.
7. Add authentication, authorization, error handling, and Postman testing.
8. Deliver a React frontend integrated with the real backend.

The most important learning outcome is not only that the portal works, but that
it can be extended safely because each layer has a clear responsibility.

---

## Known Limitations and Future Improvements

- Training modules and progress are currently represented as a frontend
  placeholder because the existing database has no training tables.
- There is no email verification or password-reset workflow.
- Login rate limiting should be added for production.
- HTTPS should be terminated by a production reverse proxy.
- Automated unit and integration tests should be added.
- JWT refresh-token rotation could improve long-lived sessions.
- Database retry and health-monitoring logic could be expanded.
- User profile and settings pages could be separated further for a larger
  production system.

---

## License

ISC