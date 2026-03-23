// const express = require("express");
// const cors = require("cors");
// const mongoose = require("mongoose");
// require("dotenv").config();
// const fs = require("fs");
// const path = require("path");
// const readline = require("readline");
// const util = require("util");
// const http = require("http");
// const os = require("os");
// const { StringDecoder } = require("string_decoder");
// const zlib = require("zlib");
// const EventEmitter = require("events");

// console.log("------------------1. Buffer---------------------");
// console.log("-----i. Buffer from method")
// console.log("It helps to create a new buffer from string");

// const buffVar = "hello";
// const converted = Buffer.from(buffVar);
// console.log(converted);

// console.log("-----ii. Buffer alloc method");
// console.log("It helps allocate memory for a new buffer");
// const buffAlloc = Buffer.alloc(6);
// console.log(buffAlloc);

// console.log("-----iii. Buffer.isBuffer");
// console.log("Returns true/false checking whether it's a buffer or not");
// const bufVar = "hello";
// const truBuff = Buffer.from(bufVar);
// console.log(Buffer.isBuffer(bufVar));
// console.log(Buffer.isBuffer(truBuff));

// console.log("------------------2. File Systems---------------------");
// console.log("-----i. ReadFile");

// fs.readFile("files/firstfile.txt", "utf-8", (err, data) => {
//   if (err) console.error(err);
//   else {
//     console.log("File read:");
//     console.log("' " + data + " '");
//   }
// });

// console.log("-----ii. WriteFile");
// fs.writeFile("files/firstfile.txt", "Written here", "utf-8", (err) => {
//   if (err) console.error(err);
//   else console.log("File written");
// });

// console.log("-----iii. Append File");
// fs.appendFile("files/firstfile.txt", "Hi hello appended new line", "utf-8", (err) => {
//   if (err) console.error(err);
//   else console.log("Append file does not replace existing contents");
// });

// console.log("-----iv. Read Dir File");
// fs.readdir("./", (err, files) => {
//   if (err) console.error(err);
//   else {
//     console.log("Files in directory:");
//     console.log(files);
//   }
// });

// console.log("-----v. existsSync");
// console.log("Check whether the file exists or not");
// const checks = fs.existsSync("files/firstfile.txt");
// console.log(checks);

// console.log("------------------3. Path Module---------------------");
// console.log("-----i. Path Join");
// const pathJoinVar = path.join(__dirname, "/", "firstfile.txt");
// console.log(pathJoinVar + " : result of path.join");

// console.log("-----ii. Path Resolve");
// const pathResolveVar = path.resolve("Nodejs", "..", "firstfile.txt");
// console.log(pathResolveVar);

// console.log("-----iii. Path basename");
// console.log(path.basename("C:/Works/recordsodejs/firstfile.txt"));

// console.log("-----iv. Path dirname");
// console.log(path.dirname("C:/Works/recordsodejs/firstfile.txt"));

// console.log("-----v. Path extname");
// console.log(path.extname("C:/Works/recordsodejs/firstfile.mp4"));

// console.log("------------------4. Streams---------------------");
// console.log("-----i. Read Stream");
// const readStream = fs.createReadStream("files/firstfile.txt", { encoding: "utf8" });
// console.log(readStream);

// console.log("-----ii. Write Stream");
// const writeStream = fs.createWriteStream("files/output.txt");
// console.log(writeStream);

// console.log("-----iii. Stream on");
// const readStreamOn = fs.createReadStream("files/firstfile.txt", "utf8");
// readStreamOn.on("data", chunk => console.log(chunk));
// readStreamOn.on("end", () => console.log("Finished reading file"));
// readStreamOn.on("error", err => console.error(err));

// console.log("-----iv. Stream Pipe");
// // Commented because file may not exist: const readPipeStream = fs.createReadStream("../largefile.mp4");
// // const writePipeStream = fs.createWriteStream("filesewupdated.mp4");
// // readPipeStream.pipe(writePipeStream);

// console.log("-----v. Stream Pause/Resume/isPaused");
// const rs = fs.createReadStream("files/firstfile.txt", { encoding: "utf8", highWaterMark: 5 });
// rs.on("data", chunk => {
//   console.log(chunk);
//   rs.pause();
//   console.log("Paused:", rs.isPaused());
//   setTimeout(() => {
//     rs.resume();
//     console.log("Resumed:", rs.isPaused());
//   }, 1500);
// });
// rs.on("end", () => console.log("File reading done"));

// console.log("------------------5. Process Object---------------------");
// console.log("Process env variables:", process.env.PORT);
// console.log("Current working directory:", process.cwd());
// console.log("Process ID:", process.pid);
// console.log("Memory Usage:", process.memoryUsage());
// console.log("Platform:", process.platform);
// console.log("Architecture:", process.arch);
// process.emitWarning("This is the Warning created by process emitWarning");
// process.on("warning", warning => console.log(warning.name, warning.message));

// console.log("------------------6. HTTP Server---------------------");
// const server = http.createServer((req, res) => {
//   res.write("Hello from HTTP Server");
//   res.end();
// });
// server.listen(process.env.PORT, () => console.log(`${process.env.PORT} Server Listening`));

// console.log("------------------7. Readline Module---------------------");
// const groupInputs = readline.createInterface({ input: process.stdin, output: process.stdout });
// groupInputs.question("What is your name? ", (answer) => {
//   console.log(`Hello, ${answer}`);
//   groupInputs.close();
// });
// groupInputs.on("line", input => {
//   console.log("You typed:", input);
//   if (input === "exit") groupInputs.close();
// });

// console.log("------------------8. Util Module---------------------");
// const readFilePromise = util.promisify(fs.readFile);
// async function readFileExample() {
//   try {
//     const data = await readFilePromise("files/firstfile.txt", "utf-8");
//     console.log(data);
//   } catch (err) {
//     console.error(err);
//   }
// }
// readFileExample();
// console.log("util.types.isDate:", util.types.isDate(new Date()));
// console.log("util.types.isPromise:", util.types.isPromise(Promise.resolve(42)));
// const msg = util.format('Hello %s, your score is %d', 'Alice', 95);
// console.log(msg);

// console.log("------------------9. Globals---------------------");
// global.arr = 32;
// console.log(arr);
// console.log("__dirname:", __dirname);
// console.log("__filename:", __filename);

// console.log("------------------10. Environment variables---------------------");
// console.log("NODE_ENV:", process.env.NODE_ENV);
// console.log("PORT:", process.env.PORT);
// console.log("DB_URL:", process.env.DB_URL);
// console.log("API_KEY:", process.env.API_KEY);
// console.log("HOME:", process.env.HOME);

// console.log("------------------11. Events in Nodejs---------------------");
// const emitter = new EventEmitter();
// emitter.on('greet', name => console.log('Hello triggered with', name));
// emitter.emit('greet', 'Alice');

// console.log("------------------12. Errors in Nodejs---------------------");
// try { throw new Error('Something went wrong'); } catch (err) { console.log(err.message); }
// try { const num = 42; num(); } catch (err) { console.log(err.name, err.message); }
// try { console.log(notDefinedVar); } catch (err) { console.log(err.name); }
// try { eval('foo bar'); } catch (err) { console.log(err.name); }
// try { new Array(-1); } catch (err) { console.log(err.name); }

// console.log("------------------13. Timers---------------------");
// const timeout = setTimeout(() => console.log('Runs after 2 seconds'), 2000);
// clearTimeout(timeout);
// let count = 0;
// const interval = setInterval(() => {
//   console.log('Repeating every 1s');
//   count++;
//   if (count === 5) clearInterval(interval);
// }, 1000);
// setImmediate(() => console.log('Runs after I/O cycle'));

// console.log("------------------14. Console---------------------");
// console.log("Hello Node.js");
// console.error("This is an error message");
// console.warn("This is a warning message");
// console.table([{ name: 'Alice', age: 25 }, { name: 'Bob', age: 30 }]);
// console.time('LoopTime'); for (let i = 0; i < 1000000; i++); console.timeEnd('LoopTime');

// console.log("------------------15. OS Module---------------------");
// console.log('Platform:', os.platform());
// console.log('Architecture:', os.arch());
// console.log('CPU Info:', os.cpus());
// console.log('Free Memory:', os.freemem());
// console.log('Total Memory:', os.totalmem());
// console.log('System Uptime (seconds):', os.uptime());

// console.log("------------------21. StringDecoder---------------------");
// const decoder = new StringDecoder('utf8');
// const buf1 = Buffer.from('Hello Node.js!');
// console.log(decoder.write(buf1));
// const buf2 = Buffer.from([0xe2, 0x82]);
// const buf3 = Buffer.from([0xac]);
// console.log(decoder.write(buf2));
// console.log(decoder.write(buf3));
// console.log(decoder.end());

// console.log("------------------22. Zlib---------------------");

// console.log("-----i. zlib gzip")
// const zlibinput = "hello from zlib";

// zlib.gzip(zlibinput, (err, buffer) => {
//   if (err) {
//     console.log("Error occurred during gzip:", err);
//     return;
//   }

//   console.log("Gzipped buffer:", buffer);
//   console.log("-----ii. zlib gunzip")
//   zlib.gunzip(buffer, (err, result) => {
//     if (err) {
//       console.log("Error occurred during gunzip:", err);
//       return;
//     }

//     console.log(result + "909");
//   });
// });

// console.log("-----iii. zlib createZip")
// fs.createReadStream('files/firstfile.txt').pipe(zlib.createGzip()).pipe(fs.createWriteStream('output.txt.gz'));

// console.log("-----iv. zipCreateunzip")
// fs.createReadStream('input.txt.gz')
//   .pipe(zlib.createGunzip())
//   .pipe(fs.createWriteStream('output.txt'))
//   .on('finish', () => console.log('File decompressed successfully'));





// console.log("------------------23. SQLite---------------------");

// console.log("-----i. Open/Crate Data base")
// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('test.db');

// console.log("-----ii. Table Creation");
// db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)');

// console.log("-----iii. Query Data");
// db.all('SELECT * FROM users', [], (err, rows) => console.log(rows));



// console.log("------------------24. HTTPS Server in Nodejs---------------------");

// // const https = require('https');

// // console.log("Used to secure the connection apis calls")

// //  const options = {
// //   key: fs.readFileSync('key.pem'),
// //   cert: fs.readFileSync('cert.pem')
// // };

// console.log("-----i. https Creation")
// //  const serverhttps = https.createServer(options, (req, res) => {
// //   res.writeHead(200);
// //   res.end('Hello Secure World!');
// // });

// //  server.listen(3000, () => {
// //   console.log('HTTPS Server running on https://localhost:3000');
// // });

// console.log("-----ii. https example connection")
// // https.get('https://jsonplaceholder.typicode.com/posts/1', (res) => {

// //   let data = '';

// //    res.on('data', chunk => {
// //     data += chunk;
// //   });

// //    res.on('end', () => {
// //     console.log('Response Data:', JSON.parse(data));
// //   });

// // }).on('error', err => {
// //   console.error('Error:', err.message);
// // });


// console.log("------------------25. HTTP/2 Server in Nodejs---------------------");
// console.log("------ Simple HTTP/2 Client Example ------");

// // const http2 = require('http2');

// // console.log("-----i. connecttion implement");
// // const client = http2.connect('http://localhost:3000');

// // console.log("----- ii. Send request")
// // const req = client.request({ ':path': '/' });

// // console.log("-----iii. Receive response")
// // req.on('data', (chunk) => {
// //   console.log("Response:", chunk.toString());
// // });

// // console.log("-----iv. close connection")
// // req.on('end', () => {
// //   client.close();
// // });

// // req.end();

// console.log("------------------25. UDB/datagram---------------------");
// // console.log("Send data in small pockets called datagram faster than tcp")


// // const dgram = require('dgram');

// //  const udpserver = dgram.createSocket('udp4');

// //  udpserver.on('message', (msg, rinfo) => {
// //   console.log(`Message from ${rinfo.address}:${rinfo.port}`);
// //   console.log("Data:", msg.toString());
// // });

// // udpserver.bind(process.env.PORT, () => {
// //   console.log("UDP Server listening on port 4000");
// // });

// console.log("------------------26. Query String---------------------");

// const querystring = require('querystring');

// console.log("----- i. parse query string");
// const parsed = querystring.parse('name=John&age=25');
// console.log("Parsed:", parsed);

// console.log("-----ii.convert object to query string")
// const str = querystring.stringify({ city: 'New York', country: 'USA' });
// console.log("Stringified:", str);

// console.log("-----iii. Escape query characters")
// const escaped = querystring.escape('hello world & hi');
// console.log("Escaped:", escaped);

// console.log("-----v. Unescape")
// const unescaped = querystring.unescape(escaped);
// console.log("Unescaped:", unescaped);

// console.log("-----vi. URLSearchparams")
// const params = new URLSearchParams({
//   name: 'rajaganesh',
//   age: 20
// });

// console.log("Query String:", params.toString());

// console.log("Name:", params.get('name'));

// params.append('city', 'London');
// params.set('name', 'vicky')
// console.log("Updated:", params.toString());

// // console.log("------------------27. DNS---------------------");

// console.log("-----i. Lookup")
// console.log("find the ip address of a domain name ")
// const dns = require("dns");

// dns.lookup('youtube.com', (err, address, version) => {
//   if (err) throw err;
//   console.log('IP Address:', address);
//   console.log('IP Version:', version);
// });

// // console.log("-----ii. resolve");
// // console.log("Can get A, AAAA, CNAME infos")

// // dns.resolve('google.com', 'CNAME', (err, addresses) => {
// //   if (err) throw err;
// //   console.log('Addresses:', addresses);
// // });

// console.log("-----iii. Reverse lookup")
// console.log("Used to find domain name from an ip address")
// dns.reverse('8.8.8.8', (err, hostnames) => {
//   if (err) throw err;
//   console.log('Hostnames:', hostnames);
// });

// console.log("-----iv. resolve mx")
// dns.resolveMx('gmail.com', (err, addresses) => {
//   if (err) {
//     console.log(err);
//     return;
//   }

//   console.log(addresses);
// });


// console.log("------v. DNS TXT  ------");


// dns.resolveTxt('google.com', (err, records) => {
//   if (err) throw err;
//   console.log('TXT Records:', records);
// });


// // console.log("------28. Net/Tcp Creation ------");

// // const net = require('net');

// //  const server = net.createServer((socket) => {

// //   console.log("Client connected");

// //   socket.on('data', (data) => {
// //     console.log("Received:", data.toString());

// //      socket.write("Hello from TCP Server!");
// //   });

// //   socket.on('end', () => {
// //     console.log("Client disconnected");
// //   });

// // });

// //  server.listen(5000, () => {
// //   console.log("TCP Server running on port 5000");
// // });



// console.log("------29. TLS ------");

// // console.log("------ TLS Server Example ------");

// // const tls = require('tls');
// // const fs = require('fs');

// // // SSL options
// // const options = {
// //   key: fs.readFileSync('key.pem'),
// //   cert: fs.readFileSync('cert.pem')
// // };

// // // Create TLS server
// // const server = tls.createServer(options, (socket) => {

// //   console.log("Secure client connected");

// //   socket.write("Hello Secure Client!");

// //   socket.on('data', (data) => {
// //     console.log("Received:", data.toString());
// //   });

// // });

// // server.listen(6000, () => {
// //   console.log("TLS Server running on port 6000");
// // });


// console.log("------30. URL Module------");

// const myUrl = new URL('https://example.com:3000/path?name=John&age=25');

// console.log("Hostname:", myUrl.hostname);
// console.log("Port:", myUrl.port);
// console.log("Path:", myUrl.pathname);

// console.log("Name:", myUrl.searchParams.get('name'));

// myUrl.searchParams.append('city', 'London');

// console.log("Updated URL:", myUrl.href);

// // console.log("------31. Async Hook------");
// // console.log("------ Async Hooks Example ------");

// // const async_hooks = require('async_hooks');
// // const fs = require('fs');

// // console.log("-----i. Hook Created")
// // console.log("Through this we can see the flow of settimeout")
// //  const hook = async_hooks.createHook({

// //   // 2️ When async resource is created
// //   init(asyncId, type, triggerAsyncId) {
// //     fs.writeSync(1, `Init: ${type} | ID: ${asyncId}\n`);
// //   },

// //   // 3️ Before callback
// //   before(asyncId) {
// //     fs.writeSync(1, `Before: ${asyncId}\n`);
// //   },

// //   // 4️ After callback
// //   after(asyncId) {
// //     fs.writeSync(1, `After: ${asyncId}\n`);
// //   },

// //   // 5️ Destroy
// //   destroy(asyncId) {
// //     fs.writeSync(1, `Destroy: ${asyncId}\n`);
// //   }

// // });

// //  hook.enable();

// //  setTimeout(() => {
// //   console.log("Timeout executed");
// // }, 1000);


// console.log("------32. Async Context Tracking  ------");



// const { AsyncLocalStorage } = require('async_hooks');
// console.log("Used for multiple operations simultaneously")
// console.log("Easy to store both results")

// const asyncLocalStorage = new AsyncLocalStorage();

//  function handleRequest(requestId) {

//    asyncLocalStorage.run({ id: requestId }, () => {

//     console.log("Start Request:", requestId);

//     // Async operation
//     setTimeout(() => {

//        const store = asyncLocalStorage.getStore();
//       console.log("Inside Timeout, Request ID:", store.id);

//     }, 1000);
//   });
// }

// // Simulate multiple requests
// handleRequest("REQ-1");
// handleRequest("REQ-2");



// console.log("------33. Worker Threads  ------");

// const { Worker, isMainThread } = require('worker_threads');
// console.log("Usually used for heavy calculations");
// if (isMainThread) {

//   console.log("Main thread started");

//    const worker = new Worker('./worker.js');

//    worker.on('message', (result) => {
//     console.log("Result from worker:", result);
//   });

//   worker.on('error', (err) => {
//     console.error("Worker error:", err);
//   });

//   worker.on('exit', (code) => {
//     console.log("Worker exited with code", code);
//   });

// }


console.log("------34. Child Process ------");
console.log("used to create a another nodejs process ")

const {exec,spawn,fork,execFile}=require('child_process');
const { stdout, stderr } = require("process");
console.log("-----i. exec()")
console.log("Used to implement process inside comment line");
exec('dir',(err,stdout,stderr)=>{
  console.log(stdout+"sss")
})
console.log("-----ii. spawn");
console.log("Used to stream data continueosly like large running process node files or another" );

const childspawn = spawn ('node',['childcheck.js']);

childspawn.stdout.on('data',(data)=>{
  console.log(data.toString()+"---->");
})


// console.log("-----iii. fork");
// fork('worker.js')


console.log("------ iv. execFile() Example ------");


execFile('node', ['-v'], (err, stdout) => {
  console.log("Node Version:", stdout);
});

// console.log("------35. Cluster Module ------");
// // console.log("Cluster usually  used for to handle multiple requests  on mulitple cpu's and run multiple node process")
// // const cluster = require('cluster');

// // if (cluster.isPrimary) {
// //   const cpuCount = os.cpus().length;

// //   for (let i = 0; i < cpuCount; i++) {
// //     cluster.fork();
// //   }
// // } else {
// //   http.createServer((req, res) => {
// //     res.end("Handled by worker " + process.pid);
// //   }).listen(process.env.PORT);
// // }

// console.log("Cluster fork create another node process")
// console.log("cluster isPrimary check is the cpu main thing primary")


// console.log("------36. REPL ------");
// console.log("read eval print loop")
// console.log("INstead of creating file we can directly run this code directly in comment")
// console.log(Math.sqrt(16));
// Math.sqrt(16)
// console.log("node start ----->node")
// console.log(" '>'used for store last evaluated value -----> 2+5  _+3  --->results 10")
// console.log("entering into editor mode ------> .editor")
// console.log("saving the file  --------> .save savejs.js")
// console.log("load the file  -------->.load mySession.js")

// console.log("------37. TTY ------");
// console.log("Press any key (press q to quit)");
// console.log("For interacting with comment")

// if (process.stdin.isTTY) {
//   process.stdin.setRawMode(true);
// }

// process.stdin.resume();

// process.stdin.on("data", (key) => {
//   const input = key.toString();

//   if (input === "q") {
//     console.log("Exiting...");
//     process.exit();
//   }

//   console.log("You pressed:", input);
// });

// console.log("------38. Crypto ------");
// console.log("-----i. Hashing")
// const crypto = require("crypto");
// const dataInside = "hello private data here";
// const secondData="here the another data";
// const hash = crypto.createHash("sha256")
// hash.update(dataInside);
// hash.update(secondData);
// hash.digest('hex');
// console.log("sha 256: "+hash);
// console.log("sha33")
// console.log("-----ii. hash with secret key");
// const hashwithsecret = "Mysecret123";
// const resulshassecret = crypto.createHmac("sha256",hashwithsecret).update(dataInside).digest('hex');
// console.log(resulshassecret+"secr") 

// console.log("-----iii. Generate random bytes")
// const random = crypto.randomBytes(16).toString('hex');

// console.log("Random Key:", random); 

// console.log("------39. Permissions ------");
// console.log("-----i. File access - fs.access")
// fs.access('test.txt', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
//   if (err) {
//     console.log('File is not accessible');
//   } else {
//     console.log('File can be read and written');
//   }
// });


// console.log("-----ii. file permission change - chmod")
// fs.chmod('files/firstfile.txt', 0o644, (err) => {
//   if (err) throw err;
//   console.log('File permissions changed to 644');
// }); 

// console.log("-----iii. change access for the file - chown")
// fs.chown('files/firstfile.txt', 1000, 1000, (err) => {
//   if (err) {
//     console.log("Cannot change owner (requires admin/root)");
//   } else {
//     console.log("File owner changed successfully");
//   }
// });


// console.log("------40. Debugger    ------");
// console.log("----- node inspect debugger.js");


// console.log("------41. Performance and Performance hooks------");
// const { performance, PerformanceObserver } = require("perf_hooks");

// console.log("-----i. console.time and console.timeEnd");
// console.time("Loop Time");
// for(let i = 0; i < 1e6; i++){
//   Math.sqrt(i);
// }
// console.timeEnd("Loop Time");


// console.log("-----ii. performance.now()");
// const start = performance.now();

// for(let i = 0; i < 1e6; i++){
//   Math.sqrt(i);
// }

// const end = performance.now();
// console.log("Execution time: " + (end - start) + " ms");


// console.log("-----iii. process.hrtime()");
// const startHr = process.hrtime();

// for(let i = 0; i < 1e6; i++){
//   Math.sqrt(i);
// }

// const endHr = process.hrtime(startHr);
// console.log("Execution time: " + endHr[0] + " seconds and " + (endHr[1] / 1e6) + " ms");


// console.log("-----iv. process.memoryUsage()");
// const memory = process.memoryUsage();

// console.log("RSS:", memory.rss);
// console.log("Heap Total:", memory.heapTotal);
// console.log("Heap Used:", memory.heapUsed);
// console.log("External:", memory.external);


// console.log("-----v. perf_hooks performance observer");
// const obs = new PerformanceObserver((list) => {
//   console.log("Measured duration:", list.getEntries()[0].duration + " ms");
// });

// obs.observe({ entryTypes: ["measure"] });

// performance.mark("startWork");

// for(let i = 0; i < 1e6; i++){
//   Math.sqrt(i);
// }

// performance.mark("endWork");

// performance.measure("Work Duration", "startWork", "endWork");
// console.log("----- Vi. process.now Example -----");


// function slowFunction() {
//   for (let i = 0; i < 1e7; i++) {}
// }

// const starting = performance.now();

// slowFunction();

// const ending = performance.now();

// console.log("Execution time:", (ending - starting).toFixed(3), "ms");
// console.log("----- Vii. process.hrtime Example -----");

// function heavyTask() {
//   for (let i = 0; i < 1e7; i++) {}
// }

// const startTime = process.hrtime();

// heavyTask();

// const diff = process.hrtime(startTime);

// console.log("Execution time:", diff[0], "seconds", diff[1] / 1e6, "ms");

// console.log("------42. Inspector ------");

// console.log("node --inspect-brk inspector.js");


// console.log("------43. Diagnostic Channel ------");
// console.log("Used to create and subscribe to channel")

// const dc = require("diagnostics_channel");
// const channel=dc.channel("my-app");
// channel.subscribe((message,name)=>{
//   console.log("Received Message: ",message)
// })

// channel.publish({user:"vasi",action:"update"});


// console.log("------43. Testrunner------");

// console.log("node --test testrunner.js");  



// console.log("------44. Trace Event------");

// console.log("node --trace-events-enabled traceevent.js");
// console.log("It will crete a node_trace.1.log file ");

// console.log("----> open in browser 'https://ui.perfetto.dev' ");
// console.log("------> and upload that node_trace.1.log file");


// console.log("------ 45.  Report Example ------");

// // process.report.writeReport();

// // console.log("Report Generated");


// console.log("------ 46. Assertion Testing ------");
// const assert = require('node:assert');

// assert.strictEqual(2 + 3, 5);


// assert.strictEqual(2 + 3, 5);
// let assertEmail='vasi@gmail.com'
// assert.match(assertEmail, /@gmail\.com$/);



// console.log("Test Passed -----------------------");
// console.log("Test Passed -----------------------");



// // server.js
// const net = require("net");

// const PORT = 3000;
// const HOST = "127.0.0.1";

// const server = net.createServer((socket) => {
//   console.log(` Client connected: ${socket.remoteAddress}:${socket.remotePort}`);

//   socket.write("Welcome! You are connected to the server.\n");

//   socket.on("data", (data) => {
//     console.log(` Received: ${data.toString().trim()}`);
//     socket.write(`Echo: ${data}`);
//   });

//   socket.on("end", () => {
//     console.log("🔌 Client disconnected.");
//   });

//   socket.on("error", (err) => {
//     console.error(`❌ Socket error: ${err.message}`);
//   });
// });

// server.listen(PORT, HOST, () => {
//   console.log(`🚀 Server running on ${HOST}:${PORT}`);
// });


// console.log("------ 46.  C++ addons ------");

// console.log("C++ addons is a way to write a part of nodejs application in C++ and then use in js");
// #include <node.h>

// using v8::FunctionCallbackInfo;
// using v8::Value;
// using v8::Number;
// using v8::Isolate;

// void Add(const FunctionCallbackInfo<Value>& args) {
//   Isolate* isolate = args.GetIsolate();

//   double a = args[0]->NumberValue(isolate->GetCurrentContext()).FromJust();
//   double b = args[1]->NumberValue(isolate->GetCurrentContext()).FromJust();

//   args.GetReturnValue().Set(Number::New(isolate, a + b));
// }

// void Initialize(v8::Local<v8::Object> exports) {
//   NODE_SET_METHOD(exports, "add", Add);
// }

// NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)

// const addon = require("./build/release/addon")
// console.log(addon.add(5,3))


console.log("------ 47.  C++ addons with node API ------");
console.log("Node-API (N-API) is a stable interface that lets you write C/C++ native addons without depending directly on the V8 engine.")

console.log("1. create a file name addon.cc")
// // #include <node_api.h>

// napi_value Add(napi_env env, napi_callback_info info) {
//   size_t argc = 2;
//   napi_value args[2];
//   napi_get_cb_info(env, info, &argc, args, NULL, NULL);

//   double a, b;
//   napi_get_value_double(env, args[0], &a);
//   napi_get_value_double(env, args[1], &b);

//   napi_value result;
//   napi_create_double(env, a + b, &result);

//   return result;
// }

// napi_value Init(napi_env env, napi_value exports) {
//   napi_value fn;
//   napi_create_function(env, NULL, 0, Add, NULL, &fn);
//   napi_set_named_property(env, exports, "addNumbers", fn);
//   return exports;
// }

// NAPI_MODULE(NODE_GYP_MODULE_NAME, Init)
// console.log("2. set targets")
// {
//   "targets": [
//     {
//       "target_name": "addon",
//       "sources": [ "addon.cc" ]
//     }
//   ]
// }
console.log("3. build addon")
// node-gyp configure
// node-gyp build

// console.log("Above comment create this file build/Release/addon.node ")

// console.log("4. Use that wisely in nodejs")

// const addon = require('./build/Release/addon');

// const result = addon.addNumbers(5, 7);

// console.log("Result from C++ Addon:", result);


// console.log("------ 48.  C++ addons with node API ------");

// console.log("The C++ Embedder API refers to the V8 engine’s C++ interface that allows a C++ program to embed the JavaScript engine inside it.")

// console.log("------ 49. V8 Engine ------");

// console.log("V8 is the JavaScript engine used by Node.js and Google Chrome. It compiles JavaScript code into machine code so it can run very fast.");


// const v8 = require('v8');

// console.log("Heap statistics from V8:");
// console.log(v8.getHeapStatistics());


// console.log("------ 50. VM Module ------");

// console.log("The vm module allows running JavaScript code inside a separate sandboxed environment. It is useful for executing dynamic code safely.");

// // Example
// const vm = require('vm');

// const code = "2 + 3";
// const result = vm.runInThisContext(code);

// console.log("VM execution result:", result);

// console.log("------ 51. WASI (WebAssembly System Interface) ------");

// console.log("WASI allows WebAssembly programs to run outside the browser and interact with the system, such as files or environment variables. Node.js supports WASI to run WebAssembly modules.");

// // Example (basic demonstration)
// const { WASI } = require('wasi');

// const wasi = new WASI({
//   args: process.argv,
//   env: process.env
// });

// console.log("WASI instance created. It can be used to run WebAssembly modules.");

 

// console.log("------ 52. Punycode ------");

// console.log("Punycode is used to convert Unicode characters (like international domain names) into ASCII format so they can be used in URLs and DNS systems.");

// const punycode = require('punycode');

// const unicodeDomains = "mañana.com";
// const asciiDomains = punycode.toASCII(unicodeDomains);

// console.log("Unicode Domain:", unicodeDomains);
// console.log("ASCII (Punycode) Domain:", asciiDomains);

// console.log("------ 54. Internationalization ------");

// console.log("Internationalization allows formatting numbers, dates, and currencies based on different languages and regions.");

// const number = 1234567.89;

// const formatted = new Intl.NumberFormat('de-DE').format(number);

// console.log("German format:", formatted);

// const date = new Date();

// const formattedDate = new Intl.DateTimeFormat('en-GB').format(date);

// console.log("Formatted Date:", formattedDate);

// console.log("------ 55. CommonJS ------");

// console.log("CommonJS is the default module system used in Node.js. It allows exporting and importing functionality between files using require() and module.exports.");


// const add = (a, b) => a + b;

// module.exports = { add };

//  const math = require('./math');

// console.log("Addition result:", math.add(2,3));


//  console.log("------ 56. ECMAScript Modules ------");

// console.log("ECMAScript Modules are the modern JavaScript module system that uses import and export syntax.");

 
// // export function multiply(a, b) {
// //   return a * b;
// // }

// //  import { multiply } from './math.mjs';

// // console.log("Multiplication result:", multiply(3,4));


// console.log("------ 57. Node Module API ------");

// console.log("The Node Module API allows developers to create reusable modules and access built-in Node.js functionality like file systems, networking, and streams.");

//  const os = require('os');

// console.log("Operating System:", os.platform());
// console.log("CPU Cores:", os.cpus().length);

// console.log("------ 58. Packages ------");

// console.log("A package in Node.js is a directory that contains code, dependencies, and a package.json file describing the project.");

//  const packageInfo = {
//   name: "my-node-app",
//   version: "1.0.0",
//   main: "index.js"
// };

// console.log("Example package info:", packageInfo);


// console.log("------ 59. Single Executable Applications ------");

// console.log("Node.js allows bundling an application and its dependencies into a single executable file that can run without installing Node separately.");

//  console.log("Example command:");
// console.log("node --experimental-sea-config sea-config.json");

