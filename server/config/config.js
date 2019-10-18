require('dotenv').config(); // this is important!
module.exports = {
  "development": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT,
    "dialectOptions": {"decimalNumbers": true},
    "define": {
      "timestamps": false
    }
  },
  "test": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT,
    "dialectOptions": {"decimalNumbers": true},
    "define": {
      "timestamps": false
    }
  },
  "production": {
    "username": process.env.USER,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": "127.0.0.1",
    "dialect": process.env.DIALECT,
    "dialectOptions": {"decimalNumbers": true},
    "define": {
      "timestamps": false
    }
  }
};
