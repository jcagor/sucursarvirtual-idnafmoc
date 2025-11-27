# Base image
FROM node:20.19.1-bullseye

# Memory limit
ENV NODE_OPTIONS=--max_old_space_size=1024

# Create app directory
WORKDIR /usr/apps/gamma/

# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./

# create secondary user
RUN adduser --system --group rann

# app source
COPY ./apps      ./apps
COPY ./assets   ./assets
COPY ./config   ./config
COPY ./libs     ./libs
COPY ./prisma   ./prisma
COPY ./*.json   ./

# start script
COPY ./docker-internal-start.sh   ./docker-internal-start.sh

# general util files
COPY ./.eslintrc.js     ./
COPY ./.gitignore       ./
COPY ./.prettierrc      ./
COPY ./README.md        ./

# Copy the .env and .env.development files
COPY .env.docker ./.env

# Expose the port on which the app will run
EXPOSE 4000

# fix permissions
RUN chmod +x ./docker-internal-start.sh
RUN chgrp -R rann .
RUN chmod -R g+rwX .

# Use secondary user for security
USER rann

# Install app dependencies --ignore-scripts --max_old_space_size=512
RUN npm install --no-audit --prefer-offline --ignore-scripts

# generate prisma
RUN npx prisma generate

# Creates a "dist" folder with the production build --max-old-space-size=512
RUN npm run build

# Run HealthCheck verifications
HEALTHCHECK --start-period=20s --timeout=5s \
  CMD curl -f http://localhost:4000/health-check || exit 1

# Start the server using the production build
CMD ["bash", "docker-internal-start.sh"]
