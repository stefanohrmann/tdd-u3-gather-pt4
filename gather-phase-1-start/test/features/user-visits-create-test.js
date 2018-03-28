const {assert} = require('chai');
const {buildItemObject} = require('../test-utils');

// Add your tests below:
describe('User visits create', () => {
  describe('and posts a new item', () => {
    it('is rendered', () => {
      const itemToCreate = buildItemObject();
      browser.url('/items/create');

      browser.setValue('#title-input', itemToCreate.title);
      browser.setValue('#description-input', itemToCreate.description);
      browser.setValue('#imageUrl-input', itemToCreate.imageUrl);
      browser.click('#submit-button');

      const haystack = browser.getText('body');
      const imageUrls = browser.getAttribute('body img', 'src');
      assert.include(haystack, itemToCreate.title);
      assert.include(imageUrls, itemToCreate.imageUrl);
    })
  })
})
