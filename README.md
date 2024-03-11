# Instructions: How To Run

`docker-compose up -d --build`

if this doesn't work, you might have to run both server and client independently
`cd client npm run dev --host` OR `yarn dev --host`
`cd server npm run start:dev` OR `yarn start:dev`
`docker run --rm \
      --name postgres \
      -e POSTGRES_PASSWORD=password123 \
      -e POSTGRES_USER=postgres \
      -e POSTGRES_DB=somedb \
      -p 5432:5432 \
      postgres`
and set the env vars in server to `POSTGRES_USERNAME=postgres
POSTGRES_PASSWORD=password123
POSTGRES_HOST=postgres
POSTGRES_PORT=5432
POSTGRES_DB=somedb
NODE_ENV=dev`

# Technical Details

- ## Stack
  - **NestJS**, **React**, **Typescript**, **Tailwind**, **Postgres**
- ## Dependencies
  - ### Client
    - **react-query**
      - asynchronous state management for data fetching
    - **zustand**
      - small, lightweight state managment library. Better than Redux for this project due to lightweight and portability
    - **Tailwindcss/forms**
      - tailwind plugin that makes styling of forms easy
    - **react-hook-form**
      - library for attaching validation to state heavy forms
    - **zod**
      - library for schema validation and declaration
    - **react-markdown**
      - library for rendering markdown files into HTML (what you see here)
    - **react-hot-toast**
      - library for easy toast rendering
