const Item = require('../../models/item');
const {assert} = require('chai');
const {connectDatabaseAndDropData, disconnectDatabase} = require('../setup-teardown-utils');

describe('Model: Item', () => {
  beforeEach(connectDatabaseAndDropData);

  afterEach(disconnectDatabase);

  // Write your tests below:
  describe('#title', () => {
    it('is a string', () => {
      const titleAsInt = 1;
      const item = new Item({
        title: titleAsInt
      });

      assert.strictEqual(item.title, titleAsInt.toString());
    });

    it('is required', () => {
      const item = new Item({
        title: ''
      });

      item.validateSync();

      assert.equal(item.errors.title.message, 'Path `title` is required.');
    });
  });
});
