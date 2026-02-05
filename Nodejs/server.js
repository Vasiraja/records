// const express=require("express");
// const cors=require("cors");
// const mongoose = require("mongoose");



require("dotenv").config();

// const app = express();



// app.listen(process.env.PORT,()=>{

//     console.log(`Server listening ${process.env.PORT}`);
// })


// console.log("------------------1. Buffer---------------------");
// console.log("-----i. Buffer from method")
// console.log("It helps to create a new buffer code from string")

// const buffVar = "hello";
// const converted=Buffer.from(buffVar);
// console.log(converted)

// console.log("-----ii. Buffer alloc method");
// console.log("It helps to memory allocation for the buffer");
// const buffAlloc = Buffer.alloc(6);
// console.log(buffAlloc);

// console.log("-----iii. Buffer.isBuffer");
// console.log("It return true or false statement checking whether buffer or not");
// const bufVar = "hello";
// const truBuff= Buffer.from(bufVar);
// console.log(Buffer.isBuffer(bufVar))
// console.log(Buffer.isBuffer(truBuff));

// console.log("------------------2. File Systems---------------------");


const fs = require("fs");
// console.log("-----i. ReadFile")

// fs.readFile("files/firstfile.txt","utf-8",(err,data)=>{
//     if(err){
//         console.error(err)
//     }
//     console.log("File readed below");
//     console.log("' "+data+" '");
// }) 

// console.log("-----ii. WriteFile");

// fs.writeFile("files/firstfile.txt","Written here","utf-8",(err,data)=>{

//     console.log("File Written below")
//     if(err) console.error(err)

// })

// console.log("-----iii. Append File ");

// fs.appendFile("files/firstfile.txt","\nHi hello appended new line","utf-8",(err,data)=>{
//     console.log("Append file does not replace already existing contents in file")
//     if(err)console.error(err)
// })

// console.log("-----iv. Read Dir File ");

// fs.readdir("./",(err,files)=>{
//     console.log("Return the list of files in the given directory.")
//     if(err)console.error(err);
//     console.log(files)
//     console.log("above")
// })

// console.log("-----v. existSync");
// console.log("Check whether the file exists or not")
// const check = fs.existsSync("files/firstfile.txt");
// console.log(check);



// console.log("------------------3. Path Module  ---------------------");
// const path = require("path");

// console.log("-----i. Path Join")

// const pathJoinVar = path.join(__dirname,"/","firstfile.txt");

// console.log(pathJoinVar+": This is exactly happen when use path join for merging that path")
 
// console.log("-----ii. Path Resolve")
// console.log("Used to resolve the path merging from the project root folder")
// const pathResolveVar=path.resolve("Nodejs","..","firstfile.txt")
// console.log(pathResolveVar)

// console.log("-----iii. Path base");
// console.log("It given the last base file which mentionedin  the directory end")

// console.log(path.basename("C:/Works/records/Nodejs/firstfile.txt"," "));''


// console.log("-----iv. Path directory");
// console.log("It given the directory name which mentioned for the file")

// console.log(path.dirname("C:/Works/records/Nodejs/firstfile.txt"));

// console.log("-----v. path ext name");
// console.log("It given the extention of that exact file in the path")

// console.log(path.extname("C:/Works/records/Nodejs/firstfile.mp4"));


// console.log("------------------4. Streams  ---------------------");
// console.log("----- i. Read Stream");
// console.log("It returns a ReadStream object instead of the file contents.");
// console.log("Helpful for reading large files.");

// const readStream = fs.createReadStream("files/firstfile.txt", { encoding: "utf8" });
// console.log(readStream);

// console.log("----- ii. Write Stream");
// console.log("It returns a WriteStream object used to write data in chunks.");
// console.log("Helpful for writing large or continuous data.");

// const writeStream = fs.createWriteStream("files/output.txt");
// console.log(writeStream); 

// console.log("----- iii. Stream on ")

// const readStreamOn = fs.createReadStream("files/firstfile.txt", "utf8");

// readStreamOn.on("data", chunk => {
//   console.log(chunk);   
// }); 

// readStreamOn.on("end", () => {
//   console.log("Finished reading file");
// });

// readStreamOn.on("error", err => {
//   console.error(err);
// });

// console.log("----- iv. Stream Pipe ");

// const readPipeStream = fs.createReadStream("../largefile.mp4");
// const writePipeStream  = fs.createWriteStream("files/newupdated.mp4");

// const check =readPipeStream.pipe(writePipeStream);
// if(check){
//     console.log("Large file copied through stream pipe")
// } 
  
//     console.log("----- iv. Stream Pause and Resume and isPaused method ");

// const rs = fs.createReadStream("files/firstfile.txt", {
//   encoding: "utf8",
//   highWaterMark: 5
// });

// rs.on("data", chunk => {
//   console.log(chunk);
//   rs.pause();
//   console.log(" Paused...\n");
//   console.log(rs.isPaused());

//   setTimeout(() => {
//     console.log(" Resumed...\n");

//     rs.resume();
//       console.log(rs.isPaused());

//   }, 1500);
// });

// rs.on("end", () => {
//   console.log("Filed Reading Done");
// });
// console.log("----- iv. Stream Unpipe ");
// console.log("Through this unpipe we stop sending those data from the read file to write file, like cut the subscription")

// const readPipeStream = fs.createReadStream("../largefile.mp4");
// const writePipeStream  = fs.createWriteStream("files/newupdated.mp4");

// const checkUn =readPipeStream.pipe(writePipeStream);
// if(checkUn){
//     console.log("Large file copied through stream pipe")
// } 
//   const checkUnpipe=readPipeStream.unpipe(writePipeStream);
//   if(checkUnpipe){
//     console.log("unpipe implemented between those write and read file")
//   }


// console.log("------------------5. Process Object  ---------------------");

// console.log("Process object mainly used for global level access and provide multiple dependencies for the project")

// console.log("----- i. Process env variables")
//  console.log("Below port get by env variables through process object")
// console.log(process.env.PORT);


// console.log("----- ii. Process cwd")
//  console.log("Current Working Directory")
// console.log(process.cwd());


// console.log("----- iii. Process ID")
// console.log("Given the id of the specific process , through this we can  monitoring, log, kill processes programmatically")
// console.log(process.pid);  


// console.log("-----iv. Process Memory Usage");
// console.log("Return specific memory usage of the process")
// console.log(process.memoryUsage());


// console.log("-----v. Process Platform");
// console.log("Return the platform for the current project");
// console.log(process.platform)



// console.log("-----vi. Process Archietecture");
// console.log("Return the platform archietecture");
// console.log(process.arch)


// console.log("-----vii. process emitwarning")
// console.log("Emits a warning instead of throwing an error");
// console.log(process.emitWarning("This is the Warning created by process emitwarning"));
 

// console.log("-----viii. Process on")

// process.on("warning", warning => {
//   console.log("Listener active!");
//   console.log(warning.name, warning.message);
// });

//  process.emitWarning("This feature is deprecated", "DeprecationWarning");



//  console.log("------------------6. HTTP Server  ---------------------");

 const http = require("http");
const { Readline } = require("readline/promises");

// console.log("-----i. Create HTTP Server")

 const createServer= http.createServer((req,res)=>{
    console.log("Server Created")
 })

 console.log("-----ii. Listen Server")

//  createServer.listen(process.env.PORT,()=>{
//     console.log(`${process.env.PORT} Server Listening`)
//  })

//  console.log("-----iii. Request Method and Response Method");
//  const newServer= http.createServer((req,res)=>{
//     console.log("Server Created")
//     console.log(req.url);
//     console.log(req.method);
//     console.log(res.statusCode); 
//     console.log(res.statusMessage);
//         res.write("Written notes\n");

//     res.end("Hi hello")
//  })
 
//   newServer.listen(process.env.PORT,()=>{
//     console.log(`${process.env.PORT} Server Listening`)
//  })  

 
//  console.log("------------------7. Readline Module  ---------------------");
console.log("Basically readline is used to read content in the CLI and display output");

// console.log("-----i. CreateInterface");

 const readline = require("readline");

 const groupInputs = readline.createInterface({
    input: process.stdin,
    output: process.stdout 
});

// console.log(groupInputs);
// console.log("-----ii. rl.questions and r1.close ")

//  groupInputs.question("What is your name? ", (answer) => {
//     console.log(`Hello, ${answer}`);
//     groupInputs.close();
// });

// console.log("-----iii. rl.on rl.close ")
// console.log("This will listen every time wheter you typing or not and display what you type")
// groupInputs.on("line", (input) => {
//     console.log("You typed:", input);

//     if (input === "exit") { 
//         groupInputs.close(); 
//     }
// });


//  console.log("------------------8. Util  ---------------------");

const util =require("util");
 
console.log("-----i. util.promisify")

const readFilePromise = util.promisify(fs.readFile);
console.log("Unlike readfile it will create a promise while creating ")
async function readFileExample() {
  try {
    const data = await readFilePromise("files/firstfile.txt", "utf-8");
    console.log(data);
  } catch (err) {
    console.error(err);
  }
}

readFileExample(); 

console.log("-----ii. util.types.isBuffer")

console.log("For checking date valid or not")
 const date = new Date();

 const notDate="2020-20-04"

 console.log(util.types.isDate(date));   
console.log(util.types.isDate(notDate));


// console.log("-----iii. util.types.isError");

// const errorUtil = "here the error";
// const errorUtilNew = new Error("here error");

// console.log(util.types.isError(errorUtil));
// console.log(util.types.isError(errorUtilNew));


console.log("-----iv. Promise Util Error ")

const promise = new Promise((resolve) => resolve(42));
const notPromise = 42;

console.log(util.types.isPromise(promise));    
console.log(util.types.isPromise(notPromise));