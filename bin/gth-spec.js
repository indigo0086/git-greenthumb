var chai = require('chai');
var childProc = require('child_process');
var should = chai.should();
var sinon = require('sinon');
var path = require('path');
chai.use(require('sinon-chai'));


describe('gth', function() {

    describe('options', function() {

        describe('version option', function() {

            itMultiCommand(['-V', '--version'], 'should display the application version to user', function(done) {
                var appVersion = require('../package.json').version;
                ensureCommandOutput([this.command], appVersion, done);
            });
        });
    });
});

/**
 * Assertion helper that runs issue in
 * @param {string} arguments arguments to pass to gth command
 * @param {string} expectedOutput value expected to return from command.
 * @param done mocha done function.
 */
function ensureCommandOutput(arguments, expectedOutput, done) {
    var gth = childProc.spawn('./gth.js', arguments, {cwd: __dirname});

    //When data returns, do assert
    gth.stdout.on('data', function(data) {
        var dataStr = data.toString().trim();
        dataStr.should.equal(expectedOutput);
    });

    //When data gives error, report
    gth.stderr.on('data', function(data) {
        console.error(data.toString());
    });

    //check exit code and call done with appropriate arguments
    gth.on('exit', function(code) {
        done(code === 0 ? null : 'Process ended with code ' + code);
    });
}


/**
 * Runs test case for multiple commands, for example one option with the same name (-v, --version).
 * @param {Array} commands to run test against.
 * @param {string} title the title of the test, each command name will be appended.
 * @param testCallback the callback that will run for the test case.
 */
function itMultiCommand(commands, title, testCallback) {
    commands.forEach(function(command) {
        it(command + ' ' + title, testCallback.bind({command: command}));
    });
}
