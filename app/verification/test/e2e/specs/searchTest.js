const assert = require('chai').assert;

describe('search page test', () => {
  beforeEach(() => {
    browser
      .url('/')
      .waitForExist('#app');
  });

  it('has the correct title', () => {
    const pageTitle = browser.getTitle();
    assert.equal(pageTitle, 'Route Master');

    const titleElementText = browser.getText('#title');
    assert.equal(titleElementText, 'Welcome to Container IoT');
  });
});

