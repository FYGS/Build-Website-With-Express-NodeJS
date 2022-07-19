const express = require('express');
const speakersRoute = require('./speakers');
const feedbacksRoute = require('./feedbacks');

const router = express.Router();

module.exports = (params) => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Welcome', template: 'index' });
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedbacks', feedbacksRoute(params));

  return router;
};