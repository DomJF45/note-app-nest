FROM node:alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that your Vite app will run on
EXPOSE 5173

# Define the command to run your Vite app
CMD ["npm", "run", "dev"]
