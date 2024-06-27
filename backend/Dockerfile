FROM node:18.18.2-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

RUN npm run db:generate

RUN npm run db:migrate

CMD ["npm", "start"]