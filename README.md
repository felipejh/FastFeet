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
Enconding: UTF8
```


### Start the docker containers
`docker start database redibarber mongobarber`

## Backend

In the backend project:

###gi Migrations
In the project root, run:
`yarn sequelize db:migrate`