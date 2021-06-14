const router = require("express").Router();

const movies = [
  { title: "Jaws", year: 1975, rating: 8, id: 1 },
  { title: "Avatar", year: 2009, rating: 7.8, id: 2 },
  { title: "Brazil", year: 1985, rating: 8, id: 3 },
  { title: "الإرهاب والكباب‎", year: 1992, rating: 6.2, id: 4 },
];

router.get("/", (req, res) => {
  // router code here
});

router.get("/create", (req, res) => {
  // router code here
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

  if (req.params.id) {
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

router.get("/update", (req, res) => {
  // router code here
});

router.get("/delete", (req, res) => {
  // router code here
});

module.exports = router;
