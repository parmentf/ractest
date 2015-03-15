module.exports = {
  'Page title is correct': function (test) {
    test
    .open('http://google.com/')
    .assert.title().is('Google', 'It has title')
    .done();
  },
  'Amazon does its thing': function (test) {
    test
    .open('http://www.amazon.com/')
    .type('#twotabsearchtextbox', 'Blues Brothers VHS')
    .click('.nav-input')
    .waitForElement('#result_0')
    .assert.text('#result_0 a h2').is('The Blues Brothers')
    .done();
  }
};
