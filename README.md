# Node.js Server with Prisma ORM

This project is a Node.js server that uses Prisma as the ORM to interact with the Postgresql database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database Setup](#database-setup)
- [Running the Server](#running-the-server)
- [Running Migrations](#running-migrations)



## Prerequisites

Before you begin, ensure you have met the following requirements:
- Node.js (v14 or higher)
- npm or yarn
- PostgreSQL (or another supported database)

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/Mikias-Miessa/Invoice-Management-Backend.git
    cd your-repository
    ```

2. Install dependencies:

    ```sh
    npm install
    # or
    yarn install
    ```

## Configuration

1. Create a `.env` file in the root of your project:

    ```sh
    touch .env
    ```

2. Add your database connection string and JWT_KEY to the `.env` file:

    ```env
    DATABASE_URL="postgresql://user:password@localhost:5432/mydatabase"
    JWT_KEY="yourkey"
    ```

## Database Setup

1. Initialize Prisma in your project if it isn't already:

    ```sh
    npx prisma init
    ```

2. Create your Prisma schema in `prisma/schema.prisma`:

    ```prisma
    datasource db {
      provider = "postgresql"
      url      = env("DATABASE_URL")
    }

    generator client {
      provider = "prisma-client-js"
    }

    model User {
      id    Int     @id @default(autoincrement())
      name  String
      email String  @unique
    }
    ```

3. Generate Prisma client:

    ```sh
    npx prisma generate
    ```

## Running the Server

1. Start the development server:

    ```sh
    node server.js
    ```

    The server will be running at `http://localhost:3000`.

## Running Migrations

1. Create a new migration:

    ```sh
    npx prisma migrate dev --name init
    ```

    This command will create a new migration file and apply it to the database.


