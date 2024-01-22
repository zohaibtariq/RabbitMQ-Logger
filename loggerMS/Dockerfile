FROM node:lts-alpine

WORKDIR /app

COPY package.json ./

RUN npm install

COPY . .

#CMD ["./node_modules/.bin/nodemon", "server"]
CMD ["npm", "start"]
