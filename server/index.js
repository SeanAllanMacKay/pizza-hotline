/*
// This is a Backend-for-Frontend (BFF). It recieves requests from the frontend application and sends requests to all relavent services.
// All data manipulation (including middleware) between what comes from the services and what is sent to the client happens here.
// It also keeps all requests hidden from the client, mitigating information leakage.
*/

const express = require("express");
const path = require("path");

const app = express();
const http = require("http").Server(app);
const bodyParser = require("body-parser");
require('dotenv').config();

///////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  Initialize Server
//
///////////////////////////////////////////////////////////////////////////////////////////////////////
  app.use(bodyParser.json());
  app.use(express.json());

  const {
    PORT
  } = process.env

  http.listen(PORT || 8081);

  app.use(express.static(path.join(__dirname, "../build")));

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "build", "index.html"));
  });


///////////////////////////////////////////////////////////////////////////////////////////////////////
//
//  API
//
///////////////////////////////////////////////////////////////////////////////////////////////////////

   // Sign up
   const signUp = require('./api/auth/sign-up')
   app.use('/sign-up', signUp);