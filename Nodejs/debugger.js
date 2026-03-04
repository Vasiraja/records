console.log("------ Node.js Debugger Demo ------");

 let x = 5;
let y = 10;

debugger;  

let sum = x + y;
console.log("Sum:", sum);

 async function fetchData() {
  let data = await Promise.resolve(42);
  debugger;  
  console.log("Fetched data:", data);
}

fetchData();

console.log("Program End");