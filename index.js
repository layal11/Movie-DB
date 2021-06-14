var express = require("express");

var app = express();

app.get("/test", (request, response) => {
  response.send({ status: 200, message: "ok" });
});

app.get("/time", (request, response) => {
  var date = new Date();
  response.send({
    status: 200,
    message:
      // date.getHours()< 10 && "0" + date.getHours()
      (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) +
      ":" +
      (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
      ":" +
      (date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds()),
  });
});

app.get("/", (request, response) => {
  response.send({ status: 200, message: "ok" });
});

var route = require("./Hello-ID");
//Routes
app.use("/hello", route);

// localhost:3000/search?s=dsdsb
app.get("/search", (request, response) => {
  console.log(request.query.s);
  response.send({
    status: request.query.s ? 200 : 500,
    message: request.query.s ? "Ok" : "you have to provide a search",
    data: request.query.s,
    error: request.query.s ? undefined : true,
  });
});
// OR
// app.get("/search", (request, response) => {
//   console.log(request.query.s);
//   response.send(
//     request.query.s ?
//     {
//     status: 200,
//     message: "Ok" ,
//     data: request.query.s,
//   } :{
//     status: 500,
//     message: "you have to provide a search",
//     error: true
//   });
// });

var movies_route = require("./Movies");
app.use("/movies", movies_route);









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
