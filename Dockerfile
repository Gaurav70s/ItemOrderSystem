FROM node:latest

WORKDIR /usr/src/app

COPY package.json ./

RUN npm install

COPY . .

ENV SERVER_PORT 4200
EXPOSE 4200

CMD npm run build
CMD npm start
