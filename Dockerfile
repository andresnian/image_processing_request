FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install -g npm@8.5.1

RUN npm i

COPY ./dist ./src

CMD ["node", "src/main.js"]