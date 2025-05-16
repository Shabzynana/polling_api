# Polling System API

RESTful API for a polling system with user authentication built using Node.js and TypeScript.

## Features

- User authentication (registration, login, password reset)
- JWT-based secure access
- Poll creation and voting system
- Result retrieval and analytics

## Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Docker
- JWT Authentication

## Quick Start

1. Clone the repository
```bash
git clone <repository-url>
cd polling-system-api
```

2. Install dependencies
```bash
npm install
```

3. Set up environment variables
```bash
cp .env.example .env
```

4. Run the application
```bash
# Development
npm run dev

# Production
npm run build
npm start
```

## Docker

```bash
docker-compose up --build
```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - User registration
- `POST /api/v1/auth/login` - User login
- `GET /api/v1/auth/verify-email` - Email verification
- `POST /api/v1/auth/forgot-password` - Password recovery
- `POST /api/v1/auth/reset-password` - Password reset

### Polls
- `POST /api/v1/polls` - Create poll
- `GET /api/v1/polls` - Get all polls
- `GET /api/v1/polls/:id` - Get specific poll
- `POST /api/v1/polls/:id/vote` - Vote on poll
- `GET /api/v1/polls/:id/results` - Get poll results

All poll endpoints require JWT authentication.

## Environment Variables

```env
PORT=3000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polling_system
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```

## License

MIT
