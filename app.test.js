// Use Chai for more powerful assertion https://www.chaijs.com/api/assert/
const assert = require('assert'); // Default assertion available in node https://nodejs.org/api/assert.html#assert_assert
const {listToTest} = require("./app"); //Import functions you want to test
const {get} = require('./util');

//Testing synchronous code
describe('Array', () => {
    describe('#indexOf()', () => {
        it('should return -1 when the value is not present', () => {
            assert.strictEqual(listToTest.indexOf(5), -1);
        });
    });
});


//Testing asynchronous code
describe('GET users API call', () => {

    // using async
    it('should return correct page number (using async)', async () => {
        const response = await get('https://reqres.in/api/users?page=2');
        assert.strictEqual(response.page, 2);
    });

    // using done
    it('should return correct page number (using done)', (done) => {
        get('https://reqres.in/api/users?page=2')
            .then((response) => {
                assert.strictEqual(response.page, 2);
                done();
            });
    });
});

describe('Mocha hooks', () => {
    let count = null;
    before(() => {
        // runs once before the first test in this block
        count = 0;
    });

    after(() => {
        // runs once after the last test in this block
        count = null;
    });
    // Hooks can be asynchronous
    beforeEach((done) => {
        // runs before each test in this block
        setTimeout(() => {
            count++;
            done();
        }, 1000);
    });

    afterEach(() => {
        // runs after each test in this block
        count--;
    });

    // test cases
    it('should set value of count to 1 before running this test', () => {
        assert.strictEqual(count, 1);
    });
});