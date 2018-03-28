const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

describe('user visits single item', () => {
  describe('after creating an item', () => {
    it('is rendered', () => {
      const itemToCreate = buildItemObject({
        title: 'Single Item',
        description: 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam'
      });

      browser.url('/items/create');

      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');

      browser.click('.item-card a');

      const haystack = browser.getText('body');
      assert.include(haystack, itemToCreate.title);
      assert.include(haystack, itemToCreate.description);
    });
  });
});