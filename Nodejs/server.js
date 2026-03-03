const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const readline = require("readline");
const util = require("util");
const http = require("http");
const os = require("os");
const { StringDecoder } = require("string_decoder");
const zlib = require("zlib");
const EventEmitter = require("events");

console.log("------------------1. Buffer---------------------");
console.log("-----i. Buffer from method")
console.log("It helps to create a new buffer from string");

const buffVar = "hello";
const converted = Buffer.from(buffVar);
console.log(converted);

console.log("-----ii. Buffer alloc method");
console.log("It helps allocate memory for a new buffer");
const buffAlloc = Buffer.alloc(6);
console.log(buffAlloc);

console.log("-----iii. Buffer.isBuffer");
console.log("Returns true/false checking whether it's a buffer or not");
const bufVar = "hello";
const truBuff = Buffer.from(bufVar);
console.log(Buffer.isBuffer(bufVar));
console.log(Buffer.isBuffer(truBuff));

console.log("------------------2. File Systems---------------------");
console.log("-----i. ReadFile");

fs.readFile("files/firstfile.txt", "utf-8", (err, data) => {
  if (err) console.error(err);
  else {
    console.log("File read:");
    console.log("' " + data + " '");
  }
});

console.log("-----ii. WriteFile");
fs.writeFile("files/firstfile.txt", "Written here", "utf-8", (err) => {
  if (err) console.error(err);
  else console.log("File written");
});

console.log("-----iii. Append File");
fs.appendFile("files/firstfile.txt", "Hi hello appended new line", "utf-8", (err) => {
  if (err) console.error(err);
  else console.log("Append file does not replace existing contents");
});

console.log("-----iv. Read Dir File");
fs.readdir("./", (err, files) => {
  if (err) console.error(err);
  else {
    console.log("Files in directory:");
    console.log(files);
  }
});

console.log("-----v. existsSync");
console.log("Check whether the file exists or not");
const checks = fs.existsSync("files/firstfile.txt");
console.log(checks);

console.log("------------------3. Path Module---------------------");
console.log("-----i. Path Join");
const pathJoinVar = path.join(__dirname, "/", "firstfile.txt");
console.log(pathJoinVar + " : result of path.join");

console.log("-----ii. Path Resolve");
const pathResolveVar = path.resolve("Nodejs", "..", "firstfile.txt");
console.log(pathResolveVar);

console.log("-----iii. Path basename");
console.log(path.basename("C:/Works/recordsodejs/firstfile.txt"));

console.log("-----iv. Path dirname");
console.log(path.dirname("C:/Works/recordsodejs/firstfile.txt"));

console.log("-----v. Path extname");
console.log(path.extname("C:/Works/recordsodejs/firstfile.mp4"));

console.log("------------------4. Streams---------------------");
console.log("-----i. Read Stream");
const readStream = fs.createReadStream("files/firstfile.txt", { encoding: "utf8" });
console.log(readStream);

console.log("-----ii. Write Stream");
const writeStream = fs.createWriteStream("files/output.txt");
console.log(writeStream);

console.log("-----iii. Stream on");
const readStreamOn = fs.createReadStream("files/firstfile.txt", "utf8");
readStreamOn.on("data", chunk => console.log(chunk));
readStreamOn.on("end", () => console.log("Finished reading file"));
readStreamOn.on("error", err => console.error(err));

console.log("-----iv. Stream Pipe");
// Commented because file may not exist: const readPipeStream = fs.createReadStream("../largefile.mp4");
// const writePipeStream = fs.createWriteStream("filesewupdated.mp4");
// readPipeStream.pipe(writePipeStream);

console.log("-----v. Stream Pause/Resume/isPaused");
const rs = fs.createReadStream("files/firstfile.txt", { encoding: "utf8", highWaterMark: 5 });
rs.on("data", chunk => {
  console.log(chunk);
  rs.pause();
  console.log("Paused:", rs.isPaused());
  setTimeout(() => {
    rs.resume();
    console.log("Resumed:", rs.isPaused());
  }, 1500);
});
rs.on("end", () => console.log("File reading done"));

console.log("------------------5. Process Object---------------------");
console.log("Process env variables:", process.env.PORT);
console.log("Current working directory:", process.cwd());
console.log("Process ID:", process.pid);
console.log("Memory Usage:", process.memoryUsage());
console.log("Platform:", process.platform);
console.log("Architecture:", process.arch);
process.emitWarning("This is the Warning created by process emitWarning");
process.on("warning", warning => console.log(warning.name, warning.message));

console.log("------------------6. HTTP Server---------------------");
const server = http.createServer((req, res) => {
  res.write("Hello from HTTP Server");
  res.end();
});
server.listen(process.env.PORT, () => console.log(`${process.env.PORT} Server Listening`));

console.log("------------------7. Readline Module---------------------");
const groupInputs = readline.createInterface({ input: process.stdin, output: process.stdout });
groupInputs.question("What is your name? ", (answer) => {
  console.log(`Hello, ${answer}`);
  groupInputs.close();
});
groupInputs.on("line", input => {
  console.log("You typed:", input);
  if (input === "exit") groupInputs.close();
});

console.log("------------------8. Util Module---------------------");
const readFilePromise = util.promisify(fs.readFile);
async function readFileExample() {
  try {
    const data = await readFilePromise("files/firstfile.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}
readFileExample();
console.log("util.types.isDate:", util.types.isDate(new Date()));
console.log("util.types.isPromise:", util.types.isPromise(Promise.resolve(42)));
const msg = util.format('Hello %s, your score is %d', 'Alice', 95);
console.log(msg);

console.log("------------------9. Globals---------------------");
global.arr = 32;
console.log(arr);
console.log("__dirname:", __dirname);
console.log("__filename:", __filename);

console.log("------------------10. Environment variables---------------------");
console.log("NODE_ENV:", process.env.NODE_ENV);
console.log("PORT:", process.env.PORT);
console.log("DB_URL:", process.env.DB_URL);
console.log("API_KEY:", process.env.API_KEY);
console.log("HOME:", process.env.HOME);

console.log("------------------11. Events in Nodejs---------------------");
const emitter = new EventEmitter();
emitter.on('greet', name => console.log('Hello triggered with', name));
emitter.emit('greet', 'Alice');

console.log("------------------12. Errors in Nodejs---------------------");
try { throw new Error('Something went wrong'); } catch (err) { console.log(err.message); }
try { const num = 42; num(); } catch (err) { console.log(err.name, err.message); }
try { console.log(notDefinedVar); } catch (err) { console.log(err.name); }
try { eval('foo bar'); } catch (err) { console.log(err.name); }
try { new Array(-1); } catch (err) { console.log(err.name); }

console.log("------------------13. Timers---------------------");
const timeout = setTimeout(() => console.log('Runs after 2 seconds'), 2000);
clearTimeout(timeout);
let count = 0;
const interval = setInterval(() => {
  console.log('Repeating every 1s');
  count++;
  if (count === 5) clearInterval(interval);
}, 1000);
setImmediate(() => console.log('Runs after I/O cycle'));

console.log("------------------14. Console---------------------");
console.log("Hello Node.js");
console.error("This is an error message");
console.warn("This is a warning message");
console.table([{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]);
console.time('LoopTime'); for (let i = 0; i < 1000000; i++); console.timeEnd('LoopTime');

console.log("------------------15. OS Module---------------------");
console.log('Platform:', os.platform());
console.log('Architecture:', os.arch());
console.log('CPU Info:', os.cpus());
console.log('Free Memory:', os.freemem());
console.log('Total Memory:', os.totalmem());
console.log('System Uptime (seconds):', os.uptime());

console.log("------------------21. StringDecoder---------------------");
const decoder = new StringDecoder('utf8');
const buf1 = Buffer.from('Hello Node.js!');
console.log(decoder.write(buf1));
const buf2 = Buffer.from([0xe2, 0x82]);
const buf3 = Buffer.from([0xac]);
console.log(decoder.write(buf2));
console.log(decoder.write(buf3));
console.log(decoder.end());

console.log("------------------22. Zlib---------------------");

console.log("-----i. zlib gzip")
const zlibinput = "hello from zlib";

zlib.gzip(zlibinput, (err, buffer) => {
  if (err) {
    console.log("Error occurred during gzip:", err);
    return;
  }

  console.log("Gzipped buffer:", buffer);
  console.log("-----ii. zlib gunzip")
  zlib.gunzip(buffer, (err, result) => {
    if (err) {
      console.log("Error occurred during gunzip:", err);
      return;
    }

    console.log(result + "909");
  });
});

console.log("-----iii. zlib createZip")
fs.createReadStream('files/firstfile.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.txt.gz'));

console.log("-----iv. zipCreateunzip")
fs.createReadStream('input.txt.gz')
  .pipe(zlib.createGunzip())
  .pipe(fs.createWriteStream('output.txt'))
  .on('finish', () => console.log('File decompressed successfully'));





console.log("------------------23. SQLite---------------------");

console.log("-----i. Open/Crate Data base")
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('test.db');

console.log("-----ii. Table Creation");
db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');

console.log("-----iii. Query Data");
db.all('SELECT * FROM users', [], (err, rows) => console.log(rows));



console.log("------------------24. HTTPS Server in Nodejs---------------------");

// const https = require('https');

// console.log("Used to secure the connection apis calls")

//  const options = {
//   key: fs.readFileSync('key.pem'),
//   cert: fs.readFileSync('cert.pem')
// };

console.log("-----i. https Creation")
//  const serverhttps = https.createServer(options, (req, res) => {
//   res.writeHead(200);
//   res.end('Hello Secure World!');
// });

//  server.listen(3000, () => {
//   console.log('HTTPS Server running on https://localhost:3000');
// });

console.log("-----ii. https example connection")
// https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {

//   let data = '';

//    res.on('data', chunk => {
//     data += chunk;
//   });

//    res.on('end', () => {
//     console.log('Response Data:', JSON.parse(data));
//   });

// }).on('error', err => {
//   console.error('Error:', err.message);
// });
 

console.log("------------------25. HTTP/2 Server in Nodejs---------------------");
console.log("------ Simple HTTP/2 Client Example ------");

// const http2 = require('http2');

// console.log("-----i. connecttion implement");
// const client = http2.connect('http://localhost:3000');

// console.log("----- ii. Send request")
// const req = client.request({ ':path': '/' });

// console.log("-----iii. Receive response")
// req.on('data', (chunk) => {
//   console.log("Response:", chunk.toString());
// });

// console.log("-----iv. close connection")
// req.on('end', () => {
//   client.close();
// });

// req.end();

console.log("------------------25. UDB/datagram---------------------");
// console.log("Send data in small pockets called datagram faster than tcp")


// const dgram = require('dgram');

//  const udpserver = dgram.createSocket('udp4');

//  udpserver.on('message', (msg, rinfo) => {
//   console.log(`Message from ${rinfo.address}:${rinfo.port}`);
//   console.log("Data:", msg.toString());
// });
 
// udpserver.bind(process.env.PORT, () => {
//   console.log("UDP Server listening on port 4000");
// });

console.log("------------------26. Query String---------------------");
 
const querystring = require('querystring');

console.log("----- i. parse query string");
  const parsed = querystring.parse('name=John&age=25');
console.log("Parsed:", parsed);

 console.log("-----ii.convert object to query string")
const str = querystring.stringify({ city: 'New York', country: 'USA' });
console.log("Stringified:", str);

 console.log("-----iii. Escape query characters")
const escaped = querystring.escape('hello world & hi');
console.log("Escaped:", escaped);

console.log("-----v. Unescape")
const unescaped = querystring.unescape(escaped);
console.log("Unescaped:", unescaped);

console.log("-----vi. URLSearchparams")
const params = new URLSearchParams({
  name: 'rajaganesh',
  age: 20
});

console.log("Query String:", params.toString());

 console.log("Name:", params.get('name'));

 params.append('city', 'London');
 params.set('name','vicky')
console.log("Updated:", params.toString());