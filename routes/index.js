const express = require('express');
const { MessagingResponse } = require('twilio').twiml;

const router = express.Router();
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?'
  + 'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

router.post('/', async (req, res) => {
  const { body } = req;

  let message;

  if (body.NumMedia > 0) {
    message = new MessagingResponse().message("Thanks for the image! Here's one for you!");
    message.media(goodBoyUrl);
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
});

module.exports = router;
