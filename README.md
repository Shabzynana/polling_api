# Polling System API

RESTful API for a polling system with user authentication built using Node.js and TypeScript.

## Features

- User authentication (registration, login, password reset)
- JWT-based secure access
- Poll creation and voting system
- Real-time result updates with WebSockets
- Room-based poll updates
- Result retrieval and analytics

## Tech Stack

- TypeScript
- Node.js
- Express.js
- PostgreSQL
- Docker
- Socket.IO
- JWT Authentication

## Environment Variables

```env
PORT=8000
DB_HOST=localhost
DB_PORT=5432
DB_NAME=polling_system
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_secret
```
## Quick Start

1. Clone the repository
```bash
git clone https://github.com/Shabzynana/polling_api
cd polling_api
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
npm start:dev

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
- `POST /api/v1/poll` - Create poll
- `GET /api/v1/poll` - Get all polls
- `GET /api/v1/poll/:id` - Get specific poll

### Options
- `POST /api/v1/poll/:id/option` - create option for poll
- `GET /api/v1/poll/:id/options` - Get all option in a poll

### Vote
- `POST /api/v1/polls/:id/vote` - Vote on poll
- `GET /api/v1/polls/:id/results` - Get poll results

## Real Time Update

```
http://127.0.0.1:8000/results - get all the poll result
http://127.0.0.1:8000/room/{pollId} - enter a room to get update of that poll
```


## License

MIT
