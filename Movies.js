const MongoClient = require("mongodb").MongoClient;

const { response } = require("express");

const router = require("express").Router();

const movies = [
  { title: "Jaws", year: 1975, rating: 8, id: 1 },
  { title: "Avatar", year: 2009, rating: 7.8, id: 2 },
  { title: "Brazil", year: 1985, rating: 8, id: 3 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2, id: 4 },
];

router.get("/", (req, res) => {
  MongoClient.connect(
    "mongodb+srv://db-test:haidarlayal1998@cluster0.2kcqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    (error, db) => {
      // var result = db.db().collection("movies").find({})
      // .then((datadelete) => {
      //     res.redirect("/movies"); //URL
      //   });
      res.send({ status: 200, data: movies }); 
    }
  );
});

router.get("/read", (req, res) => {
  // router code here
  res.send({ status: 200, data: movies });
});

router.get("/read/by-date", (req, res) => {
  // router code here
  movies.sort(function (a, b) {
    var keyA = a.year,
      keyB = b.year;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  res.send({ status: 200, data: movies });
});

router.get("/read/by-rating", (req, res) => {
  // router code here
  movies.sort(function (a, b) {
    var keyA = a.rating,
      keyB = b.rating;
    // Compare the 2 dates
    if (keyA < keyB) return 1;
    if (keyA > keyB) return -1;
    return 0;
  });
  res.send({ status: 200, data: movies });
});

router.get("/read/by-title", (req, res) => {
  // router code here
  movies.sort(function (a, b) {
    var keyA = a.title,
      keyB = b.title;
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });
  res.send({ status: 200, data: movies });
});

// router.get('/read/id/:id' , (req , res)=>{
//     // router code here
//    if(req.params.id){

//     var filtereddata=movies.find(movie=>{
//         console.log(movie)
//         return movie.id==req.params.id
//     })
//         console.log(filtereddata)
//         if(filtereddata){
//         res.send({status:200, data:filtereddata});
//     }else{
//         res.status(404).send({status:404, error:true, message:`the movie ${req.params.id} does not exist`});
//     }
//    }else
//    res.status(404).send('Error 404: Not found');
// })

//OR
router.get("/read/id", (req, res) => {
  res.status(404).send("Error 404: Not found");
});
router.get("/read/id/:id", (req, res) => {
  // router code here

  if (req.params.id && req.user) {
    var filtereddata = undefined;

    for (var i = 0; i < movies.length; i++) {
      if (req.params.id == movies[i].id) {
        filtereddata = movies[i].id;
      }
    }

    if (filtereddata) {
      res.send({ status: 200, data: filtereddata });
    } else {
      res.status(404).send({
        status: 404,
        error: true,
        message: `the movie ${req.params.id} does not exist`,
      });
    }
  }
});

router.post("/add", (req, res) => {
  //router.post("/add:year([0-9]{4})", (req, res) => {   });
  // :year[allow only numeric]{specify length}
  //router.post("/add:year([a-zA-Z]{4})", (req, res) => {   });
  // :year[allow only characcters]{specify length}

  // router code here
  // console.log(req.query.year);
  if (
    req.query.title &&
    req.query.year &&
    req.query.year.toString().length == 4 &&
    !isNaN(req.query.year) &&
    req.user
  ) {
    MongoClient.connect(
      "mongodb+srv://db-test:haidarlayal1998@cluster0.2kcqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      (error, db) => {
        db.db()
          .collection("movies")
          .insertOne({
            title: req.query.title,
            year: req.query.year,
            rating: req.query.rating ? req.query.rating : "4",
            id: Math.random(),
          });
      }
    );
    movies.push({
      title: req.query.title,
      year: req.query.year,
      rating: req.query.rating ? req.query.rating : "4",
      id: Math.random(),
    });
    res.send({
      status: 200,
      message: movies,
    });
  } else {
    res.send({
      status: 403,
      error: true,
      message: "you cannot create a movie without providing a title and a year",
    });
  }
});

router.delete("/delete/:id", (req, res) => { 
  // router code here

  var isdeleted = 0;
  if (req.params.id && req.user) {
    // for (let i in movies) { // for(var i =0 ; i<movies.length ; i++)
    //   if (movies[i].id == req.params.id) {
    //     movies.splice(i, 1);
    //     isdeleted = 1;
    //   }
    // }

    MongoClient.connect(
      "mongodb+srv://db-test:haidarlayal1998@cluster0.2kcqn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      (error, db) => {
        db.db().collection("movies").deleteOne({//deleteOne is a promise fn. (It has .then and .catch)

            _id: req.params.id, //like SQL where condition
          })
          .then((datadelete) => { //deleted successfully
            res.redirect("/movies"); //res.redirect("URL");   //redirects me to localhost:3000/movies 
          })
          .catch((err) => {
            //error in deleting or ID not found
            res.send({
              status: 404,
              error: true,
              message: `the movie ${res.params.id} does not exist`,
            });
          });
      }
    );
  }
});

router.put("/update/:id", (req, res) => {
  // router code here
  var isdeleted = 0;
  if (req.params.id && req.user) {
    for (let i in movies) {
      // for(var i =0 ; i < movies.length ; i++)
      if (movies[i].id == req.params.id) {
        movies[i].title = req.query.title ? req.query.title : movies[i].title;
        movies[i].rating = req.query.rating
          ? req.query.rating
          : movies[i].rating;
        movies[i].year = req.query.year ? req.query.year : movies[i].year;
      }
    }
  }
  res.send({ status: 200, data: movies });
});

module.exports = router;
