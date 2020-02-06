/* eslint-disable prefer-arrow-callback,func-names */

require('should');
const fs = require('fs');
require('chai');

const supertest = require('supertest');


function Session() {
  return supertest(require('../app')); // eslint-disable-line global-require
}

function RequestData() {
  return JSON.parse(fs.readFileSync('./request.json'));
}

describe('Index', function () {
  beforeEach(function () {
    this.session = Session();
  });

  it('Incoming Whatsapp Media Message', function () {
    return this.session.post('/')
      .send(RequestData())
      .expect(200)
      .expect('Content-Type', 'text/xml; charset=utf-8')
      .expect((res) => {
        res.text.should.equal(
          '<?xml version="1.0" encoding="UTF-8"?>'
          + '<Response>'
          + '<Message>Thanks for the image! Here\'s one for you!'
          + '<Media>https://images.unsplash.com/photo-1518717758536-85ae29035b6d?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1350&amp;q=80</Media>'
          + '</Message>'
          + '</Response>',
        );
      });
  });
});
