# docker-compose integration of mongodb, loobpack api backend, and angular js with node:10-alpine

This repository use:
https://github.com/gbosetti/todo-list-loopback-backend
https://github.com/gbosetti/todo-list-with-angular-6

and I've modified the back to use mongo as db storage

## default user created by
back/server/boot/default-user.js

> user: admin
> pass: nimda

You can put whatever in back or in front guided by this roadmap.

---------------------
## URLs
**front**
> http://localhost:4200

**back API**
> http://localhost:3000/explorer/

-----------------------
## To test if everything is going right:
> $ docker exec -it mongodb bash
root@b45b0506165a:/# mongo
> show dbs
admin   0.000GB
config  0.000GB
local   0.000GB
> use admin
switched to db admin
> show collections
AccessToken
Item
User
> db.User.find()
{ "_id" : ObjectId("5c13a8959e9ce1410e4a2514"), "username" : "admin", "password" : "$2a$10$B6LrAVlBaK6ZHDq3pMx77OjCCck/nnmiyVJeaKjWcYMco6JKsQPEC", "email" : "bob@projects.com" }

and if you add "un item" from the frontend
> db.Item.find()
{ "_id" : ObjectId("5c13a96d9e9ce100b24a2515"), "name" : "un item" }


--------------------
Another way to install loobpack is using the package-json in config/back
This are the differnecies with the package.json from the original repo.
Take care with the global lb.

"loopback-cli": "^5.0.0",
"loopback-connector-mongodb": "^3.9.2",
"loopback": "^3.19.0",
"loopback-connector-mongodb": "^3.9.2",
"serve-favicon": "^2.0.1",
"strong-error-handler": "^3.0.0"

--------------------
## Where is configured the backend url in the frontend?

**front/src/environments/environment.ts and in environment.prod.ts**

setup of backup location:
export const environment = {
  production: false,
  backendUrl: "http://localhost:3000"
};

export const environment = {
  production: true,
  backendUrl: "http://localhost:3000"
};


**front/e2e/protractor.conf.js**
baseUrl: 'http://localhost:4200/',


------------------------


## check references:
[mongo reference](https://docs.mongodb.com/manual/reference/mongo-shell/)
[loopback](https://loopback.io/)
[angular](https://angular.io/)

----------------
## Notes:

### datasourses.json mongo back configuration:

useNewUrlParser is true due to connection resets responses

-----------
### angular errors at browser with docker:
--disable-host-check in the angular docker-compose was set due to angular errors

----------
### The environment variable COMPOSE_HTTP_TIMEOUT is due to the error:
ERROR: for back  UnixHTTPConnectionPool(host='localhost', port=None): Read timed out. (read timeout=60)

it can be solved too by doing
sudo service docker restart
or again
docker-compose up -d

-----------
### sometimes mongo container starts but it's doing some operations, so our back stops
at first attempt.

There are at least 4 solutions:

- A simple sleep in the docker-compose back service:
> command: bash -c "sleep 5; start.sh"

- healthcheck (check docker-compose documentation):
"Configure a check that's run to determine whether or not containers for this
service are "healthy".

- set lazyConnect to true in back's mongo datasourses.json.
"It will try to establish the connection automatically once users hit the endpoint.
If the mongodb server is offline, the app will start, however, the endpoints will not work."

- use a wait-for script as point the [docker doc](https://docs.docker.com/compose/startup-order/)
and do something like
> command: sh -c './wait-for db:5432 -- npm start'
check [wait-for-it](https://github.com/vishnubob/wait-for-it) and [wait-for](https://github.com/Eficode/wait-for)
