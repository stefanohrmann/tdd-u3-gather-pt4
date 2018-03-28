const {assert} = require('chai');
const request = require('supertest');

const app = require('../../app');

const {parseTextFromHTML, seedItemToDatabase} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Server path: /items/:id', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your test blocks below:
  describe('GET', () => {
    it('renders the item with the id', async () => {
      const item = await seedItemToDatabase();

      const response = await request(app)
        .get(`/items/${item._id}`);

      const titleText = parseTextFromHTML(response.text, '#item-title');
      const descriptionText = parseTextFromHTML(response.text, '#item-description');
      assert.include(titleText, item.title);
      assert.include(descriptionText, item.description);
    });
  });
});
