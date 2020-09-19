const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('./libs/logger');
const {NoRouteFound} = require('./errors');
const errorHandler = require('./errors/errorHandler');
const db = require('./libs/db');
const indexRouter = require('./routes/index');
const playersRouter = require('./routes/players');
const gamesRouter = require('./routes/games');
const gameRouter = require('./routes/game');

const NODE_PATH = process.cwd();
db.init();
const app = express();

app.set('views', path.join(NODE_PATH, '/ui/templates'));
app.set('view engine', 'pug');
app.use(favicon(path.join(NODE_PATH, 'public', 'icons/favicon.ico')));
app.use(morgan('combined', { stream: logger.stream }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(NODE_PATH, 'public')));

app.use('/', indexRouter);
app.use('/players', playersRouter);
app.use('/games', gamesRouter);
app.use('/game', gameRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(new NoRouteFound('Not Found'));
});

// error handler
app.use(errorHandler);

module.exports = app;
