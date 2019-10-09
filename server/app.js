const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./config/logger');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./services/error-handlers');


const app = express();
app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));

app.use(errorHandler);

module.exports = app;
