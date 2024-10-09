FROM node:18-slim

WORKDIR /app

COPY package*.json .

RUN npm install

RUN apt-get update -y && apt-get install -y openssl

COPY . .

RUN chmod +x .docker/entrypoint.sh

CMD [ ".docker/entrypoint.sh" ]