FROM node

WORKDIR /app/

COPY . /app/

RUN npm install
RUN npm install -g knex
RUN chmod +x up.sh

CMD bash up.sh