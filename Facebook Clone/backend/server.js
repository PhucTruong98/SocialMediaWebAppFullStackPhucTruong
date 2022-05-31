const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const {readdirSync} = require("fs");
const app = express();
//make it use json for response
app.use(express.json());
const dotenv = require("dotenv");
dotenv.config();




//using cors and only allow 3000 which is front end to connect
//here define the options for cors
app.use(cors());

//first route
app.get("/", (req, res) => {
  res.send("welcome from home dfsda");
});

// routes
//automaticly scan the route folder and call app.use() for that route file, neat!
readdirSync("./routes").map((r) => app.use("/", require("./routes/" + r)));








//database

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
}).then(() => {console.log("Database cinnected successully")}).catch((err) => {console.log("Error connecting to mongodb", err)});


const PORT = process.env.PORT || 8000;



app.listen(PORT, () => {
  console.log("server is listening now");
});
