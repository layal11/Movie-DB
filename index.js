var express = require("express");

// var responseTime = require("resonse-time"); 


var app = express();


app.get("/test", (request, response) => { 
    response.send({ status: 200, message: "ok" }); 
});

var date = new Date();
app.get("/time", (request, response) => { 
     response.send({ status: 200, message: date.getHours() + ":" + date.getMinutes()}); 
    });


app.listen(3000);


// Importing "Express JS" module into out application
//var express = require("express");

//var responseTime = require("resonse-time"); //Terminal Cammand:  npm install response-time

// Intializing an "instance" called app using Express type
//var app = express();

// whenever there is a request for this URL or Path or Endpoint "/something" ==> i should have a call back mechanism which is (request and response)
//app.get("/test", (request, response) => { // request captured as input
//  response.send({ status: 200, message: "ok" }); // response is the output
//});

//app.get("/time", (request, response) => { // request captured as input
//  response.send(); // response is the output
//});

//Starting app at port 3000
// it calls the node feature: http.createServer to listen to this paticular port number
//app.listen(3000);
