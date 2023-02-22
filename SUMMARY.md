### SUMMARY

- docker-compose
- backend
- frontend
- mongo

START THE PROJECT

## Start The API, DB and FRONT

- make all

## LOAD THE DUMP

- make restore

## Test

Jest
Supertest

Run Test:

- make run svc=api
- make test

## Documentation Swagger

1 - Go to the backend folder
2 - ts-node src/server-swagger.ts
3 - http://localhost:3000/swagger

## Architecture

- app/ # settings of tha application
- database/ # redis client connection
- enum/ # enum
- helpers/
  -- class/ # standard class for the all managers
- interface/ # interface type
- manager/ # each folder have the same structure
  -- route
  -- handler # separate the protocol from the data
  -- controller # specific for the all business files and extends with the same global controller
  -- business
  -- internal # for exchange between service, more easy to separate if we go to micro services

### Thought

Very good test a little bit stressfull because take much more time to make something more cleaner, but i really enjoyed :)

- add treafik (load balancer)
- write integration test in front
- more log information (too small to loose time)
