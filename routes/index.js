const express = require('express');
const { MessagingResponse } = require('twilio').twiml;
const mimeTypes = require('mime-types');
const path = require('path');

const imagesDir = `${path.resolve('./public/images')}`;
const router = express.Router();
const goodBoyUrl = 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?'
  + 'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';

router.post('/', async (req, res) => {
  const { body } = req;
  const mediaDownloads = [];

  for (let resourceId = 0; resourceId < body.NumMedia; resourceId++) {
    const mediaUrl = body[`MediaUrl${resourceId}`];
    const mimeType = body[`MediaContentType${resourceId}`];
    const fileExt = mimeTypes.extension(mimeType);
    const filename = `${mediaUrl.split('/').slice(-1)[0]}.${fileExt}`;
    mediaDownloads.push(req.download(mediaUrl, {
      directory: imagesDir,
      filename,
    }));
  }

  await Promise.all(mediaDownloads);

  let message;

  if (body.NumMedia > 0) {
    message = new MessagingResponse().message('Thanks for the image(s)');
  } else {
    message = new MessagingResponse().message('Send us an image!');
  }

  message.media(goodBoyUrl);

  res.set('Content-Type', 'text/xml');
  res.send(message.toString()).status(200);
});

module.exports = router;
