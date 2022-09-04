FROM node:16-alpine3.14 

WORKDIR /app

RUN apk add --no-cache tini

ENTRYPOINT ["/sbin/tini", "--"]

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 8080

CMD [ "npm", "start" ]