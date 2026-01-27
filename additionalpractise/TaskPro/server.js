const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();




const app = express();
 
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGOOSE_URI)
.then(()=>console.log("Mongo URL Connected Successfully"))
.catch((err)=>console.error(`Error Caught`,err));

 

app.listen(process.env.PORT,()=>{
    console.log(`Server Listening Port ${process.env.PORT}`);
})
