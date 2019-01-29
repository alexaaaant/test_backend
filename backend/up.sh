#!/bin/bash

sleep 5s
knex migrate:latest
knex seed:run
npm start