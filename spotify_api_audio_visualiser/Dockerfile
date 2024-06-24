# Dockerfile
FROM node:18-slim

WORKDIR /app

# Copy package.json and package-lock.json into the container
COPY package*.json ./

# Ensure clean state by removing existing node_modules and package-lock.json
RUN rm -rf node_modules package-lock.json

# Install app dependencies
RUN npm install
# Copy the rest of the application code into the container
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Set environment variables for Spotify API (adjust to your needs)
ENV CLIENT_ID=1f42356ed83f46cc9ffd35c525fc8541
ENV CLIENT_SECRET=487ec052888b4917b00665fc65b8df9f
ENV REDIRECT_URI=http://localhost:3000

# Run the application
CMD ["npm", "run", "dev"]
