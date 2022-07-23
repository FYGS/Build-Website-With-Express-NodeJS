const express = require('express');
const speakersRoute = require('./speakers');
const feedbacksRoute = require('./feedbacks');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;

  router.get('/', async (_request, response, next) => {
    try {
      const topSpeakers = await speakersService.getList();
      const artWorks = await speakersService.getAllArtwork();
      return response.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        artWorks,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.use('/speakers', speakersRoute(params));
  router.use('/feedbacks', feedbacksRoute(params));

  return router;
};
