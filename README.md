# FastFeet

Steps to 

## Configuration

#### NodeJS & NPM
Install the NVM:
[Installation guide NVM](https://github.com/nvm-sh/nvm/)

Install the NodeJS 12.16.1
`nvm install 12.16.1`

Set de default NodeJS version
`nvm alias default 12.16.1`

#### Package manager
We will be used the Yarn Package Manager.

Install from this website:
[Yarn Website](http://legacy.yarnpkg.com/)

### Database

#### Docker
[Install steps](https://docs.docker.com/install/)

#### PostgresSQL
PostgreSQL is used for relationship between entities.

Install the PostgreSQL
`docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres`

#### Postbird
Install the Postbird PostgreSQL GUI Client
[Postbird](https://www.electronjs.org/apps/postbird)

Connect with this data:
```
Host: localhost
Port: 5432
Username: postgres
Password: docker
```

This credentials are configured in the backend project in `~/src/config/database`

Create a new Database:
```
Database: fastfeet
Template: none
Encoding: UTF8
```

#### Redis
Redis is used to emails queue.

`docker run --name redisbarber -p 6379:6379 -d -t redis:alpine` 

### Mailtrap
Create your account in [mailtrap.io](https://mailtrap.io/)

Configure environments variables in `~/src/.env`

```
MAIL_HOST=smtp.mailtrap.io
MAIL_PORT=2525
MAIL_USER=xxx
MAIL_PASS=xxx 
```

### Start the docker containers
`docker start database redisbarber`

## Backend

In the backend project:

### Migrations
In the project root, run:
`yarn sequelize db:migrate`

### Seeds
In the project root, run:
`yarn sequelize db:seeds:all`

This is create a admin user configured in `~/src/database/seeds`

The default is
```
name: Distribuidora FastFeet
email: admin@fastfeet.com
password: 123456
```

### Sentry
Sentry is used to handler the exceptions.
Configure your DSN in `~/src/.env`

Ex.:
`SENTRY_DSN=xxxxxx`

### Run the API
`yarn dev`


## Web
The Web application is the administrator user interface.
It is possible to register orders, deliverers and recipients.

Login data
```
User: admin@fastfeet.com
Password: 123456
```

### Third-part libraries
#### Axios
Used to make the requisitions to the backend (express).

### Screenshots
![](.github/web.gif)

## Mobile
The mobile application is the user interface for delivery peoples.

Features:

- View delivery status
- Filter pending deliveries
- Report delivery`s problems
- View delivery`s problems
- Confirm delivery

The authentication is the deliveryman id.

### Third-part libraries
#### Axios
Used to make the requisitions to the backend (express).

#### React Native Camera
Used to take a picture of the signature upon delivery of the order.

### Screenshots
![](.github/mobile.gif)