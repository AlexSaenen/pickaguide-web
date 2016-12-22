FROM mhart/alpine-node:4.4.5

WORKDIR /app

RUN apk add --no-cache make gcc g++ python

COPY package.json /app
RUN npm install --unsafe-perm --production --silent

COPY . /app

ENV PORT 80
EXPOSE 80

CMD FOO=caca make prod
