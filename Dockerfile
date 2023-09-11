FROM node:18-alpine

USER node
WORKDIR /home/node/app

USER root
COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

USER node
CMD ["npm", "run", "start:prod"]