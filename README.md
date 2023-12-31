# FinalProjectBackend-DevInit

This project is the backend part of the FinalProject, designed to be set up with Docker and managed through Prisma for database operations.

## Setup

### 1. Database Container Setup

To begin, you need to create a container for the database using Docker. Run the following command to build the Docker container:

```bash
docker compose up -d
```

### 2. Installing Dependencies

Once the container is built, the next step is to install the necessary dependencies. You can do this using either Yarn or NPM:

**Using Yarn:**

```bash
yarn install
```

**Using NPM:**

```bash
npm install
```

### 3. Database Setup

After installing the dependencies, set up the database using Prisma. Run the following command:

**Using NPX:**

```bash
npx prisma migrate dev --name init
```

**Using Yarn:**

```bash
yarn prisma migrate dev --name init
```

## How to run ?

After setup the project you can run following command:

seed the database with some data:

**Using NPX:**

```bash
npx prisma db seed
```

**Using Yarn:**

```bash
yarn prisma db seed
```

**Using NPM:**

```bash
npm run dev
```

**Using Yarn:**

```bash
yarn dev
```

## Endpoint

### 1. User

**Create User**

```bash
POST /register
```

**Login User**

```bash
POST /login
```

### 2. Daily Logs

**Create Daily Log**

```bash
POST /logs
```

**Get All Daily Logs**

```bash
GET /logs
```

**Get Daily Log By ID**

```bash
GET /logs/:id
```

**Update Daily Log By ID**

```bash
PUT /logs/:id
```

**Delete Daily Log By ID**

```bash
DELETE /logs/:id
```

### 3. Todos

**Create Todo**

```bash
POST /todos
```

**Get All Todos**

```bash
GET /todos
```

**Get Todo By ID**

```bash
GET /todos/:id
```

**Update Todo By ID**

```bash
PUT /todos/:id
```

**Delete Todo By ID**

```bash
DELETE /todos/:id
```

### 4. Events

**Create Event**

```bash
POST /events
```

**Get All Events**

```bash
GET /events
```

**Get Event By ID**

```bash
GET /events/:id
```

**Update Event By ID**

```bash
PUT /events/:id
```

**Delete Event By ID**

```bash
DELETE /events/:id
```