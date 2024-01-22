FROM node:lts-alpine

WORKDIR /app

#COPY package.json yarn.lock ./
COPY package.json ./

RUN npm install
#RUN yarn install --frozen-lockfile
#RUN yarn install --dev
#RUN yarn install --production
#RUN yarn global add nodemon

COPY . .

#CMD ["./node_modules/.bin/nodemon", "app"]
CMD ["npm", "start"]
