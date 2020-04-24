const express = require("express");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");

const {
  PORT = 8080,
} = process.env

app.use(bodyParser.json());
app.use(express.json());

http.listen(PORT, (error) => {
  if(error){
    console.log(error)
  }
  else{
    console.log(`Server online: connected to port ${PORT}`)
  }
});

app.use(express.static(path.join(__dirname, "build")));

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});
