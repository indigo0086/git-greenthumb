var chai = require('chai');
var process = require('child_process');
var should = chai.should();
var sinon = require('sinon');
chai.use(require('sinon-chai'));


describe('gth', function() {
    var spawnSpy;

    beforeEach(function() {
        spawnSpy = sinon.spy(process.spawn);
    });

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
 * @param arguments
 * @param expectedOutput
 * @param done
 */
function ensureCommandOutput(arguments, expectedOutput, done) {
    var gth = process.spawn('./gth.js', arguments);

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
