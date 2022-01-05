FROM node:16-alpine3.13

WORKDIR /app
COPY package*.json /app/
RUN npm i
COPY . /app/

CMD [ "npm", "run", "serve" ]