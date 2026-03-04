const test = require('node:test');
const assert = require('node:assert');

function add(a, b) {
  return a + b;
}

test('adds two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
});