# Use an official Node.js runtime as the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Set the NODE_OPTIONS environment variable
ENV NODE_OPTIONS=--openssl-legacy-provider

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the entire project to the working directory
COPY . .

# Build your React application (you may need to adjust the script name)
RUN npm run build

# Expose the port your app will run on (usually 3000)
EXPOSE 3000

# Define the command to start your application (modify as needed)
CMD ["npm", "start"]
