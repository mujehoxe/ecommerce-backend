# Stage 1: Build the NestJS application
FROM node:14 AS builder

WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

# Build the NestJS application
RUN npm run build

# Stage 2: Create a MariaDB container
FROM mariadb:latest

# Set environment variables for MariaDB (modify as needed)
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=ecommerce
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=mypassword

# Copy the NestJS application build from the builder stage
COPY --from=builder /app/dist /app

# Expose the port your NestJS application will run on
EXPOSE 3000

# Define the command to start the MariaDB server (adjust as needed)
CMD ["mysqld"]

# Define the command to start your NestJS application
CMD ["npm", "run", "start:prod"]