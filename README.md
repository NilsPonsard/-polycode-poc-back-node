# Polycode POC backend

## Environment

- JWT_SECRET : secret used to sign JWTs
- DB_HOST : database address
- DB_PORT : database port (default 5432)
- DB_USERNAME : database user
- DB_PASSWORD : database password for DB_USERNAME
- DB_DATABASE : name of the database to use
- FRONTEND_URL : url to the frontend
- SENDIBLUE_KEY : the sendiblue api key
- SENDER_EMAIL : the email to use when sending validation emails

In order to start containers (runners), the api needs access to the docker socket : `/var/run/docker.sock`.
On this docker the images in **runner-images** must be available, use `runner-images/build.sh`.

## Description


## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
