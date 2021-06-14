const router = require('express').Router()

const movies = [
    { title: 'Jaws', year: 1975, rating: 8 },
    { title: 'Avatar', year: 2009, rating: 7.8 },
    { title: 'Brazil', year: 1985, rating: 8 },
    { title: 'الإرهاب والكباب‎', year: 1992, rating: 6.2 }
]


router.get('/' , (req , res)=>{
    // router code here
})


router.get('/create' , (req , res)=>{
    // router code here
})

router.get('/read' , (req , res)=>{
    // router code here
    res.send({status:200, data:movies });
})

router.get('/read/by-date' , (req , res)=>{
    // router code here
    movies.sort(function(a, b) {
        var keyA = a.year,
          keyB = b.year;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    res.send({status:200, data: movies });
})

router.get('/read/by-rating' , (req , res)=>{
    // router code here
    movies.sort(function(a, b) {
        var keyA = a.rating,
          keyB = b.rating;
        // Compare the 2 dates
        if (keyA < keyB) return 1;
        if (keyA > keyB) return -1;
        return 0;
      });
    res.send({status:200, data: movies });
})

router.get('/read/by-title' , (req , res)=>{
    // router code here
    movies.sort(function(a, b) {
        var keyA = a.title,
          keyB = b.title;
        // Compare the 2 dates
        if (keyA < keyB) return -1;
        if (keyA > keyB) return 1;
        return 0;
      });
    res.send({status:200, data: movies });
})

router.get('/update' , (req , res)=>{
    // router code here
})

router.get('/delete' , (req , res)=>{
    // router code here
})



module.exports  = router