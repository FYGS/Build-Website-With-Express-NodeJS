const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { speakersService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const speakers = await speakersService.getList();
    const artWorks = await speakersService.getAllArtwork();

    return response.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, artWorks });
    } catch (error) {
      return next(error);
    }
  });

  router.get('/:shortname', async (request, response, next) => {
    try {
      const speaker = await speakersService.getSpeaker(request.params.shortname);
    const artWorks = await speakersService.getArtworkForSpeaker(request.params.shortname);

    return response.render('layout', { pageTitle: `Speaker ${request.params.shortname} Details`, template: 'speakers-details', speaker, artWorks });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};