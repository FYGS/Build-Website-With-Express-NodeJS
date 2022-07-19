const express = require('express');

const router = express.Router();

module.exports = (params) => {
  const { feedbacksService } = params;
  router.get('/', async (request, response) => {
    const feedbacks = await feedbacksService.getList();

    return response.json(feedbacks);
  });

  router.post('/', (request, response) => response.send('Feedbacks posted'));

  return router;
};