FROM node

WORKDIR /app/

COPY . /app/

RUN npm install
RUN npm install pg --save
RUN npx knex init
RUN node_modules/.bin/knex migrate:latest

ENTRYPOINT [ "npm", "start" ]