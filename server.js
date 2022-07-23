const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');

const routes = require('./routes');
const SpeakersService = require('./services/SpeakerService');
const FeedbacksService = require('./services/FeedbacksService');

const app = express();
const PORT = 3000;

// Instantiation
const speakersService = new SpeakersService('./data/speakers.json');
const feedbacksService = new FeedbacksService('./data/feedbacks.json');

app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'session',
  keys: ['Ghfdrteu7854ei', 'Rdfet485jruop5'],
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.SITENAME = 'ROUX Meetups';

// Middlewares
app.use(express.static(path.join(__dirname, './static')));

app.use(async (_request, response, next) => {
  try {
    const names = await speakersService.getNames();
    response.locals.speakersNames = names;
    return next();
  } catch (error) {
    return next(error);
  }
});


app.use('/', routes({
  speakersService,
  feedbacksService,
}));

app.use((_request, _response, next) => next(createError(404, 'Page Not Found')));

// Error handler: 4 args
app.use((error, _request, response, next) => {
  response.locals.errorMessage = error.message;
  const status = error.status || 500 // 500 for internal server error
  response.locals.errorStatus = status;
  response.status(status);

  response.render('error');
  return next();
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});