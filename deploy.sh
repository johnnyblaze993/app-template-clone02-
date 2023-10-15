#!/bin/bash

# Navigate to frontend, install dependencies, and build
cd frontend && npm install && npm run build
cd ..

# Navigate to server (backend) and build
cd server && ./gradlew assemble
cd ..

# Rebuild and restart docker containers
docker-compose down
docker-compose up --build -d