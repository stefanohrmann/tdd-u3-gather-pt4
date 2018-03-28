const {assert} = require('chai');
const request = require('supertest');
const {jsdom} = require('jsdom');

const app = require('../../app');
const Item = require('../../models/item');

const {parseTextFromHTML, buildItemObject} = require('../test-utils');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

const findImageElementBySource = (htmlAsString, src) => {
  const image = jsdom(htmlAsString).querySelector(`img[src="${src}"]`);
  if (image !== null) {
    return image;
  } else {
    throw new Error(`Image with src "${src}" not found in HTML string`);
  }
};

describe('Server path: /items/create', () => {
  //const itemToCreate = buildItemObject();

  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your describe blocks below:
  describe('GET', () => {
    it('renders empty input fields', async () => {
      // Exercise
      const response = await request(app)
        .get('/items/create');

      // Verify
      const title = parseTextFromHTML(response.text, 'input#title-input');
      const imageUrl = parseTextFromHTML(response.text, 'input#imageUrl-input');
      const description = parseTextFromHTML(response.text, 'textarea#description-input');

      assert.isEmpty(title);
      assert.isEmpty(imageUrl);
      assert.isEmpty(description);
    });
  });

  describe('POST', () => {
    it('creates a new item', async () => {
      // Setup
      const itemToCreate = buildItemObject();

      // Exercise
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      const createdItem = await Item.findOne(itemToCreate);

      // Verify
      assert.isNotNull(createdItem, 'Item was not created successfully in the database');
    });

    it('redirects to "/" afterwards', async () => {
      // Setup
      const itemToCreate = buildItemObject();

      // Exercise
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);

      // Verify
      assert.strictEqual(response.status, 302);
      assert.equal(response.headers.location, '/');
    });

    it('displays an error message when supplied an empty title', async () => {
      // Setup
      const itemToCreate = buildItemObject();
      delete itemToCreate.title;

      // Exercise
      const response = await request(app)
        .post('/items/create')
        .type('form')
        .send(itemToCreate);
      const allItems = await Item.find({});

      // Verify
      assert.strictEqual(allItems.length, 0);
      assert.strictEqual(response.status, 400);
      assert.include(parseTextFromHTML(response.text, 'form'), 'required');
    });
  });
});
