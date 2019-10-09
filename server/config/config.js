module.exports = {
  "development": {
    "username": process.env.USER_NAME,
    "password": process.env.USER_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": process.env.USER_NAME,
    "password": process.env.USER_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": false
    }
  },
  "production": {
    "username": process.env.USER_NAME,
    "password": process.env.USER_PASSWORD,
    "database": process.env.DATABASE_NAME,
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
      "timestamps": false
    }
  }
};
