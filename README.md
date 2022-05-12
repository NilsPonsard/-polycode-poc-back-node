# Polycode POC backend

## Environment

- JWT_SECRET : secret used to sign JWTs
- DB_HOST : database address
- DB_PORT : database port (default 5432)
- DB_USERNAME : database user
- DB_PASSWORD : database password for DB_USERNAME
- DB_DATABASE : name of the database to use
- FRONTEND_URL : url to the frontend
- SENDINBLUE_KEY : the sendinblue api key
- SENDER_EMAIL : the email to use when sending validation emails
- MONGO_URI : uri to the mongo database

In order to start containers (runners), the api needs access to the docker socket : `/var/run/docker.sock`.
On this docker the images in **runner-images** must be available, use `runner-images/build.sh`.

## Installation

```bash
npm install
```

## Starting

### dev

```sh
npm run start:dev
```

With dev env variables :

```sh
DB_USERNAME=postgres DB_PASSWORD=postgres DB_DATABASE=postgres JWT_SECRET=ah SENDER_EMAIL="noreply@nponsard.net" SENDIBLUE_KEY=<redacted> MONGO_URI=mongodb://root:example@localhost:27017/ npm run test
```

### Production

You need to build first :

```sh
npm run build
```

Then you can run (don’t forget to set env variables) :

```sh
npm run start:prod
```

## Testing

```sh
npm run test
```
