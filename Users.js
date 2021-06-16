const router = require("express").Router();

const users = [
  { username: "layal", password: "123" },
  { username: "majd", password: "123" }
];

router.get("/", (req, res) => {
    res.send({staus: 200, message: req.user});
});

router.post("/login", (req, res) => {
  // router code here
  console.log(req.query.username, req.query.password)
  
  if(req.query.username && req.query.password){
    for (let i in users) { // for(var i =0 ; i < users.length ; i++)
        if (users[i].username == req.query.username && users[i].password == req.query.password){
            req.user = users[i];
        }
      }
  }
  res.send({staus: 200, message: req.user});
});

router.post("/create", (req, res) => {
  // router code here
  users.push({ username: req.query.username, password: req.query.password });
  res.send({ staus: 200, message: "created successfully!" });
});

router.put("/update", (req, res) => {
  // router code here
  if (req.query.username) {
    for (let i in users) {
      // for(var i =0 ; i < users.length ; i++)
      if (users[i].username == req.query.username) {
        users[i].password = req.query.password;
      }
    }
  }
  res.send({ status: 200, message: "updated successfully!" });
});

router.delete("/delete", (req, res) => {
  // router code here
  var isdeleted = 0;
  if (req.query.username) {
    for (let i in users) { // for(var i =0 ; i<movies.length ; i++)
      if (movies[i].username == req.query.username) {
        users.splice(i, 1);
        isdeleted = 1;
      }
    }
  }
  res.send({status:200 , message: "deleted successfully!"});
});

module.exports = router;
