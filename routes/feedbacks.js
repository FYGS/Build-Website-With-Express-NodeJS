const express = require('express');
const { validationResult } = require('express-validator');

const validations = require('../validations/formValidations')


const router = express.Router();

module.exports = (params) => {
  const { feedbacksService } = params;
  router.get('/', async (request, response, next) => {
    try {
      const feedbacks = await feedbacksService.getList();

      const errors = request.session.feedbacks ? request.session.feedbacks.errors : undefined;
      const successMessage = request.session.feedbacks ? request.session.feedbacks.message : undefined;
      request.session.feedbacks = {};

      return response.render('layout', {
        pageTitle: 'Feedbacks',
        template: 'feedbacks',
        feedbacks,
        errors,
        successMessage,
      });
    } catch (error) {
      return next(error);
    }
  });

  router.post(
    '/',
    validations,
    async (request, response, next) => {
      try {
        const errors = validationResult(request);

      if (!errors.isEmpty()) {
        request.session.feedbacks = {
          errors: errors.array(),
        };
        return response.redirect('/feedbacks');
      }

      const { name, email, title, message } = request.body;
      await feedbacksService.addEntry(name, email, title, message);
      request.session.feedbacks = {
        message: 'Thanks for your feedback!',
      };
      return response.redirect('/feedbacks');
      } catch (error) {
        return next(error);
      }
    }
  );

  router.post(
    '/api',
    validations,
    async (request, response, next) => {
      try {
        const errors = validationResult(request);

      if (!errors.isEmpty()) {
        return response.json({ errors: errors.array() });
      }

      const { name, email, title, message } = request.body;
      await feedbacksService.addEntry(name, email, title, message);
      const feedbacks = await feedbacksService.getList();
      return response.json({ feedbacks });
      } catch (error) {
        return next(error);
      }
    }
  );

  return router;
};
