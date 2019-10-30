# Trello

This application is a simplified copy of Trello.

## Getting Started
You need to download this project to run it locally.
To launch it you must install dependencies and then launch the app. First you need to set the data base.

### Main stack

The app uses Node Js and PostgreSQL data bases. 
If you don't have its then just follow the link and install its 
[NodeJs](https://nodejs.org), 
[PostrgeSQL](https://www.postgresql.org/).


### Installing 

#### Backend part
Proceed to `server` directory and execute to install dependencies.

```
npm install
```
Then you need to set data base configuration. 
 1) You need to change name the file `.env-example` to `.env`.
    This is necessary for the correct settings.
 2) You only need to create the data base, and change the fields in the file.
 
```json
JWT_SECRET = secret

# Database
USER = "User Name"
PASSWORD = "*****"
DATABASE = "Database Name"
DIALECT = "postgres"

```
Next launch the migrations. 

```
npx sequelize-cli db:migrate
```
And than launch the server.

```
npm start
```

The server will be launched by [localhost:3000](http://localhost:3000), link.

#### Frontend part

Then you have to launch <strong>Angular serve</strong>. 
Proceed to `client` directory, select 
```
npm install
```
and then launch the app with 
```
npm start
```
The app is available by its [localhost:4200](http://localhost:4200), link.
