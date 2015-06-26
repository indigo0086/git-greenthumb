var chai = require('chai');
var should = require('should')();
var process = require('child-process');
var sinon = require('sinon');
chai.use('sinon-chai');

describe('gth', function() {
    var logSpy;
    before(function() {
        logSpy = sinon.spy(console.log);
    });

    describe('call')
});
