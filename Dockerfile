# Base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy the project files to the working directory
COPY . .

# Install dependencies using Yarn
RUN yarn install

# Build the project
RUN yarn build

# Expose the port
EXPOSE 3000

# Set the entry point command
CMD ["yarn", "start:prod"]
