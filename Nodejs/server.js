// const express=require("express");
// const cors=require("cors");
// const mongoose = require("mongoose");



// require("dotenv").config();

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

// console.log("----- iii. Stream on and end ")

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

console.log("----- iv. Stream Pipe ");

const readPipeStream = fs.createReadStream("../largefile.mp4");
const writePipeStream  = fs.createWriteStream("files/newupdated.mp4");

const check =readPipeStream.pipe(writePipeStream);
if(check){
    console.log("Large file copied through stream pipe");
}


