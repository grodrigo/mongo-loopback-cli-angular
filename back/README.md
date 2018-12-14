# todo-list-mongo-backend
Backend generated with [LoopBack](http://loopback.io) for the [To-do list frontend](https://github.com/gbosetti/todo-list-with-angular-6).

This service can be used interchangeably with:
* [The Mongo-based backend](https://github.com/gbosetti/todo-list-mongo-backend)
* [The JsonServer-based backend](https://github.com/gbosetti/todo-list-jsonserver-backend)

## Setup

Clone the repo
```
git clone https://github.com/gbosetti/todo-list-loopback-backend.git
```
Install dependencies
```
npm install
```

## Use

Run `node .`. Then, you can use the [frontend application](https://github.com/gbosetti/todo-list-with-angular-6) to check the service is working or use some tool like curl: 
```
curl -X POST --header 'Content-Type: application/json' --header 'Accept: application/json' -d '{"name": "Demo"}' 'http://localhost:3000/Items'
```
```
curl -X GET --header 'Accept: application/json' 'http://localhost:3000/Items'
```

See other operations at http://localhost:3000/explorer/