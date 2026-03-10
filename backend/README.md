# IPIZ Backend

Backend skeleton for the IPIZ mobile application, built with Node.js, TypeScript, and Express.js.

## Architecture

This backend follows a clean architecture pattern with the following structure:

```
src/
├── config/          # Configuration files
├── controllers/     # Request handlers
├── models/          # Data models and DTOs
├── routes/          # API route definitions
├── services/        # Business logic layer
├── middlewares/     # Express middlewares
└── utils/           # Utility functions
```

## Features

- **TypeScript**: Full type safety
- **Express.js**: Web framework
- **Clean Architecture**: Separation of concerns
- **Error Handling**: Centralized error management
- **CORS**: Cross-origin resource sharing
- **Security**: Helmet for security headers

## API Endpoints

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Jobs
- `POST /api/jobs` - Create job
- `GET /api/jobs` - Get all jobs
- `GET /api/jobs/open` - Get open jobs
- `GET /api/jobs/search?q=query` - Search jobs
- `GET /api/jobs/:id` - Get job by ID
- `PUT /api/jobs/:id` - Update job
- `DELETE /api/jobs/:id` - Delete job

### Companies
- `POST /api/companies` - Create company
- `GET /api/companies` - Get all companies
- `GET /api/companies/search?q=query` - Search companies
- `GET /api/companies/:id` - Get company by ID
- `PUT /api/companies/:id` - Update company
- `DELETE /api/companies/:id` - Delete company

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
npm install
```

### Running

```bash
# Development
npm run dev

# Production
npm run build
npm start
```

### Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
CORS_ORIGIN=http://localhost:8081
JWT_SECRET=your-secret-key
DATABASE_URL=postgresql://localhost:5432/ipiz_db
```

## Data Storage

Currently uses in-memory storage for development. Replace with a proper database (PostgreSQL, MongoDB, etc.) in production.

## Testing

```bash
npm test
```

## License

MIT