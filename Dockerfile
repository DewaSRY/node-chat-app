# Use an ARG to specify the Node.js version
ARG NODE_VERSION=21.2.0

# Base stage with Alpine Node.js
FROM node:${NODE_VERSION}-alpine AS base

# Set up working directory
WORKDIR /usr/src/app

# Install dependencies in build stage
FROM base AS build

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install only production dependencies
RUN npm i --omit=dev

# Final stage for the production build
FROM base AS final

# Set the environment variable to production
ENV NODE_ENV=production

# Set up working directory again (to ensure it's correct)
WORKDIR /usr/src/app
# Copy the installed node_modules from the build stage
COPY --from=build /usr/src/app/node_modules ./node_modules

# Copy public and src folders to the final stage

COPY . .

# Expose the port the app will run on
EXPOSE 4000

# Start the application
CMD ["npm", "run", "start"]
