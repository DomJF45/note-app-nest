# Project Setup and Deployment Guide

Welcome to the project! This guide will help you set up and run the application using Docker Compose. If you encounter any issues, we've provided alternative steps to run the server, client, and database independently.

## Prerequisites

- [Docker](https://www.docker.com/get-started)
- [Node.js](https://nodejs.org/) (for running the client and server independently)
- [Yarn](https://yarnpkg.com/) (optional but recommended)

## Instructions: How To Run

1. Clone the repository:

   ```bash
   git clone https://github.com/DomJF45/note-app-nest.git
   cd note-app-nest
   ```

2. Run the following command to build and start the Docker containers:

   ```bash
   docker-compose up -d --build
   ```

3. If docker-compose does **NOT** work and encounters issues, you can try running the server and client independently:

   - Server:
     ```bash
     cd server
     yarn start:dev
     ```
   - Client:

     ```bash
     cd client
     yarn dev --host
     ```

   - Standalone Postgres container:

   ```bash
   docker run --rm \
     --name postgres \
     -e POSTGRES_PASSWORD=password123 \
     -e POSTGRES_USER=postgres \
     -e POSTGRES_DB=somedb \
     -p 5432:5432 \
     postgres
   ```

   Set the environment variables in the server to connect to the PostgreSQL container:

   ```env
   POSTGRES_USERNAME=postgres
   POSTGRES_PASSWORD=password123
   POSTGRES_HOST=postgres
   POSTGRES_PORT=5432
   POSTGRES_DB=somedb
   NODE_ENV=dev
   ```

## Technical Details

### Stack

- **NestJS**, **React**, **Typescript**, **Tailwind**, **Postgres**

### Dependencies

#### Client

- **react-query**: Asynchronous state management for data fetching.
- **zustand**: Lightweight state management library, ideal for this project.
- **Tailwindcss/forms**: Tailwind plugin for easy styling of forms.
- **react-hook-form**: Library for attaching validation to state-heavy forms.
- **zod**: Library for schema validation and declaration.
- **react-markdown**: Library for rendering markdown files into HTML.
- **react-hot-toast**: Library for easy toast rendering.

Feel free to reach out if you encounter any issues or have further questions. Happy coding!
