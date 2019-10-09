const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('./config/logger');
const cors = require('cors');
const helmet = require('helmet');
const errorHandler = require('./services/error-handlers');

const restRouter = require('./routes/restRouter');

const app = express();
app.use(cors());
app.use(helmet());
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/v1/', restRouter);

app.use(errorHandler);

module.exports = app;
