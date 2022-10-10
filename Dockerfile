FROM node:16.17.1

#FROM npm:8.19.2

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install --legacy-peer-deps
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

# Build project
RUN npm run build

EXPOSE 8000
CMD [ "node", "dist/main" ]