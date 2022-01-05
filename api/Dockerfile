# étape de build
FROM node:16-alpine3.13

WORKDIR /app
COPY package*.json ./
RUN npm i
COPY . .

EXPOSE 4000

CMD ["npm", "run", "dev"]
