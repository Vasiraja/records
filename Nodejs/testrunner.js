const test = require('node:test');
const assert = require('node:assert');

function add(a, b) {
  return a + b;
}

test('adds two numbers', () => {
  assert.strictEqual(add(2, 3), 5);
});

// const dc = require("diagnostics_channel");

//  const channel = dc.channel("app-log");

//  channel.subscribe((message) => {
//   console.log("Subscriber got:", message);
// });

//  channel.publish({ event: "start", time: Date.now() });
// channel.publish({ event: "end", time: Date.now() });