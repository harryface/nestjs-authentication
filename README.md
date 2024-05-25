## Description
* NestJS Authentication Boilerplate
This repository contains a NestJS application with various authentication strategies implemented:
- Local authentication using email/username and password
- Google authentication using OAuth
- Facebook authentication using OAuth
The application is built using NestJS and features multiple branches with different ORM solutions:
- Prisma (branch: master)
- TypeORM (branch: auth_orm_typeorm)
- Sequelize (branch: auth_orm_sequelize)
This boilerplate provides a starting point for building robust and scalable authentication systems with NestJS. You can explore different ORM solutions by switching between branches.

Note: You may need to configure environment variables and OAuth credentials to use the authentication strategies.

## Installation

```bash
$ npm install
```

## Running the app

- Docker
docker-compose up -d postgres s3-emulator

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
