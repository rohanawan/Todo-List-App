# Backend build stage
FROM node:14 as backend-build
WORKDIR /app/Backend
COPY Backend/package*.json ./
RUN npm install
COPY Backend/ .
RUN npm run build

# Frontend build stage
FROM node:14 as frontend-build
WORKDIR /app/FrontEnd
COPY FrontEnd/package*.json ./
RUN npm install
COPY FrontEnd/ .
RUN npm run build

