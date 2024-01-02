const supertest = require('supertest');
const app = require('../index');

const api = '/api/filmes';

describe('movie', () => {
  describe('get movie route', () => {
    describe('get all movies', () => {
      it('should return a 200', async () => {
        await supertest(app).get(api).expect(200);
      });
    });
  });
});