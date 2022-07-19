const express = require('express');
const path = require('path');
const cookieSession = require('cookie-session');

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

// Settings
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

// Middlewares
app.use(express.static(path.join(__dirname, './static')));


app.use('/', routes({
  speakersService,
  feedbacksService,
}));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});