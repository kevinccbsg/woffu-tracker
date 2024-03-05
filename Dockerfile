# Use an official Node.js runtime as a parent image
FROM node:20.11.0-alpine

# Set the working directory to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to /app
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to /app
COPY . .

RUN npm run build

# Set the command to start the application
CMD ["npm", "start"]
