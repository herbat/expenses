'use strict';

describe('My Sample JS', function() {
  var SampleApp = require('../dist/app/home/home');

  it('should exist', function() {
    expect(SampleApp).toBeDefined();
    console.log(SampleApp);
  });
});
