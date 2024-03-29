<h1 align="center">
  <img alt="Fastfeet" title="Fastfeet" src=".github/logo.png" width="300px" />
</h1>

It is a complete application (Back-end, Front-end and Mobile) for managing a carrier's deliveries.  
The WebApp is the administrator user interface. It is possible to register orders, deliverers and recipients.  
The MobileApp is the user interface for delivery peoples.

**Backend:** NodeJS  
**Web:** ReactJS  
**Mobile:** React Native  

## :wrench: Configuration

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

`docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine` 

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
`docker start database redisfastfeet`

## :page_facing_up: Backend

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

### Run

##### Before run:

- Install dependencies with ```yarn install```

##### Running API
```yarn dev```

##### Running the BeQueue
```yarn queue```


## :computer: Web
The Web application is the administrator user interface.
It is possible to register orders, deliverers and recipients.

Login data
```
User: admin@fastfeet.com
Password: 123456
```

### Run

##### Before run:

- Configure the API ip address in ```~/src/services/api.js```
- Install dependencies with ```yarn install```

##### Running:
```yarn start```


### Third-part libraries
#### Axios
Used to make the requisitions to the backend (express).

#### Redux, Redux Saga, Redux Persist
Used to store and persist the global states session and user profile.

#### Rocketseat Unform
Used to form validations.
[Unform](https://github.com/Rocketseat/unform)

#### React Input Mask
Used to mask CEP.
[React Input Mask](https://www.npmjs.com/package/react-input-mask)

### Screenshots
![](.github/web-demo.gif)

## :iphone: Mobile
The mobile application is the user interface for delivery peoples.

Features:

- View delivery status
- Filter pending deliveries
- Report delivery`s problems
- View delivery`s problems
- Confirm delivery

The authentication is the deliveryman id.

### Run

##### Before run:

- Configure the API ip address in ```~/src/services/api.js```
- If you are running on android, run this commando in the terminal ```adb reverse tcp:3333 tcp:3333``` This is necessary to show the images on the app.
- Install dependencies with ```yarn install```

##### Running on iOS:
```react-native run-ios```

##### Running on Android:
```react-native run-android```

### Third-part libraries
#### Axios
Used to make the requisitions to the backend (express).

#### React Native Camera
Used to take a picture of the signature upon delivery of the order.

#### Redux, Redux Saga, Redux Persist
Used to store and persist the global states session and user profile.

### Screenshots
![](.github/mobile.gif)