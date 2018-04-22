require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const logAndSaveRequest = require('./middlewares/log-and-save-request');
const serveViews = require('./serve-views');
const todoApis = require('./todos/todos-api');

const { mongoose } = require('./db/mongoose');
const { User } = require('./models/user');
const { ObjectID } = require('mongodb');

const port = process.env.PORT;
const app = express();

app.use(logAndSaveRequest);
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

serveViews(app);
todoApis(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${port}`)
})

module.exports = {
  app
};
