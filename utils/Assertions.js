// test/utils/assertions.js
const chai = require('chai');
const { Assertion } = chai;

Assertion.addMethod('beEmpty', function () {
    const { _obj } = this;
    new chai.Assertion(_obj).to.be.an('array').and.have.lengthOf(0);
});

Assertion.addMethod('haveStatusCode', function (statusCode) {
    const { _obj } = this;
    new chai.Assertion(_obj).to.have.property('status').that.equals(statusCode);
});
