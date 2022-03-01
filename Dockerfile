FROM node:16-alpine3.11

WORKDIR /app

ENV PORT 80

COPY . /app

RUN npm install

CMD ["npm", "run", "dev"]
