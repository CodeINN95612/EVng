# EVng

Event Board thing using the MERN stack.

## 🚀 Quick Start

### Prerequisites

- Node.js (>=18.0.0)
- Docker & Docker Compose
- pnpm (>=8.0.0)

### Development Environment

#### Start Infrastructure (MongoDB + Redis)

```bash
pnpm run dev           # Start database containers
pnpm run dev:stop      # Stop database containers
pnpm run dev:restart   # Restart database containers
pnpm run dev:logs      # View container logs
pnpm run dev:status    # Check container status
pnpm run dev:clean     # Stop and remove all containers/volumes
```

#### Install Dependencies

```bash
pnpm install           # Install root dependencies only
pnpm run install:all   # Install dependencies for root, frontend, and backend
```

#### Run Applications

```bash
pnpm run frontend      # Start frontend development server
pnpm run backend       # Start backend development server
pnpm run start:all     # Start both frontend and backend concurrently
```

#### Build for Production

```bash
pnpm run build         # Build both frontend and backend
```

### Services

- **MongoDB**: `localhost:27017`
- **Redis**: `localhost:6379`
- **Frontend**: Will be available at `localhost:3000` (when configured)
- **Backend**: Will be available at `localhost:5000` (when configured)

### Project Structure

```
EVng/
├── frontend/         # React/Next.js frontend
├── backend/          # Node.js/Express backend
├── volumes/          # Docker volume data
│   ├── mongodb_data/
│   └── redis_data/
├── docker-compose.dev.yml
├── .env.dev
├── package.json
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
└── .npmrc
```
