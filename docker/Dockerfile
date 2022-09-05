# Use the base image with Node.js
FROM node:10.16.0

ARG NODE_ENV=production
ENV NODE_ENV=$NODE_ENV
# Copy the current directory into the Docker image
COPY . /submission-review-ui

# Set working directory for future use
WORKDIR /submission-review-ui

# Install the dependencies from package.json
RUN npm ci --production
RUN npm run lint
# RUN npm rebuild node-sass
RUN npm run build
# RUN npm run test

CMD npm start
