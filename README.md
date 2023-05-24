# Frontend

## Setup

Add .env in the root folder and add the following variables:

```bash
VITE_API_URL=http://localhost:5172/api
```

## Run frontend in local

```bash
npm install
npm run dev
```

## Run Frontend with docker compose

```bash
docker-compose up --build -d
```

In localhost, frontend service will be started at 5173 port
