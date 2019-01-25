#!/bin/bash

sleep 5s
knex migrate:latest
npm start