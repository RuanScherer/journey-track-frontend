FROM node:lts-alpine

WORKDIR /app
RUN npm install
CMD ["npm", "run", "dev"]
