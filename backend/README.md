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
- **RBAC + SSO Blueprint**: Base de controle de acesso por permissao com SUPER_ROOT

## API Endpoints

### Auth
- `POST /api/auth/login` - Login and issue access/refresh tokens
- `POST /api/auth/refresh` - Rotate refresh token and issue new session token pair
- `POST /api/auth/logout` - Revoke refresh token session
- `GET /api/auth/me` - Resolve authenticated claims and identity

### Users
- `POST /api/users` - Create user
- `GET /api/users` - Get all users
- `PUT /api/users/:id/role` - Assign role (SUPER_ROOT)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Academic Management
- `POST /api/classes` - Create class/turma
- `GET /api/classes` - List classes/turmas
- `PUT /api/classes/:id` - Update class/turma
- `DELETE /api/classes/:id` - Delete class/turma
- `POST /api/subjects` - Create subject/disciplina
- `GET /api/subjects` - List subjects/disciplinas
- `GET /api/subjects/class/:classGroupId` - List subjects by class/turma
- `PUT /api/subjects/:id` - Update subject/disciplina
- `DELETE /api/subjects/:id` - Delete subject/disciplina

### Posts Moderation
- `POST /api/posts` - Create post (entra como pending)
- `GET /api/posts` - List posts (approved for normal users, all for moderators)
- `GET /api/posts/pending` - List pending posts (SUPER_ROOT/ADMIN)
- `PUT /api/posts/:id` - Edit post (owner or moderator)
- `PATCH /api/posts/:id/verify` - Approve/reject post (SUPER_ROOT/ADMIN)
- `DELETE /api/posts/:id` - Remove post (owner or moderator)

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
JWT_ACCESS_TTL_SECONDS=900
JWT_REFRESH_TTL_SECONDS=604800
ALLOW_LEGACY_CLAIMS_HEADERS=false
SUPER_ROOT_EMAIL=superroot@ipiz.local
SUPER_ROOT_PASSWORD=ChangeMe123!
DATABASE_URL=postgresql://localhost:5432/ipiz_db
RBAC_ENFORCED=false
```

## RBAC and SSO blueprint

- Roles: `student`, `teacher`, `admin`, `company`, `alumni`, `super_root`.
- Permission matrix in [src/auth/rbac.ts](src/auth/rbac.ts).
- Session claims extraction from Bearer token (and optional legacy headers) in [src/auth/claims.ts](src/auth/claims.ts).
- JWT issuing/verification in [src/auth/jwt.ts](src/auth/jwt.ts).
- Password hashing/verification in [src/auth/password.ts](src/auth/password.ts).
- SSO contract types in [src/auth/ssoBlueprint.ts](src/auth/ssoBlueprint.ts).
- Authorization middleware in [src/middlewares/authorize.ts](src/middlewares/authorize.ts).

## Staging hardening

For staging usage, copy [`.env.staging.example`](.env.staging.example) and keep these flags:

- `RBAC_ENFORCED=true`
- `ALLOW_LEGACY_CLAIMS_HEADERS=false`

This forces permission checks to run using Bearer JWT claims only.

## Data Storage

Currently uses in-memory storage for development. Replace with a proper database (PostgreSQL, MongoDB, etc.) in production.

## Testing

```bash
npm test
```

## License

MIT