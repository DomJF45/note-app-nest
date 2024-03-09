#!/bin/bash

docker run --rm \
  --name postgres \
  -e POSTGRES_PASSWORD=password123 \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_DB=somedb \
  -p 5432:5432 \
  -v somedb-vol:/var/lib/postgresql/data \
  postgres
