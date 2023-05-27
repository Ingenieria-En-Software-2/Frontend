# Frontend

## Setup

Add .env in the root folder and add the following variables:

```bash
VITE_API_URL="http://<ip of backend>:<port of backend>/api"
```
If you run the backend locally, it will the ip of the backend will be the ip of your machine
you can use localhost, the port will be the one you set when you run the backend, the default is 5000


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
