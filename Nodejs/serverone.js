



const file = require("fs");

file.writeFile("text.txt","hi hello","utf-8",(err)=>{

    if(err) console.error(err);



}) 

file.readFile("text.txt","utf-8",(data,err)=>{
    if(data){
        console.log(data)
    }
    else{
        console.error(err )
    }
})

const stream=file.createWriteStream("textstream.txt");


stream.write("hi hello im here\n");
stream.write("Another thing here");
stream.end("Done");


