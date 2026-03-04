console.log("Trace Example Started");

for (let i = 0; i < 1e7; i++) {
  Math.sqrt(i);
}

setTimeout(() => {
  console.log("Async Task Done");
}, 1000);