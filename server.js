require('./config/config');

const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const errorhandler = require('errorhandler');

const logAndSaveRequest = require('./middlewares/log-and-save-request');
// const serveViews = require('./serve-views');
// const itemsApi = require('./api/items');

const { mongoose } = require('./db/mongoose');

const port = process.env.PORT;
const isProduction = process.env.NODE_ENV === 'production';

const app = express();
app.use(cors());
app.use(require('morgan')('dev'));
// app.use(logAndSaveRequest);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'green-arrow',
  cookie: { maxAge: 60000 },
  resave: false,
  saveUninitialized: false
}));

if (!isProduction) {
  app.use(errorhandler());
  mongoose.set('debug', true);
}

app.use(require('./routes'));

// serveViews(app);
// itemsApi(app);

app.listen(process.env.PORT, () => {
  console.log(`Server is up on port ${port}`)
})

module.exports = {
  app
};
