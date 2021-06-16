const router = require('express').Router()



router.get('/' , (req , res)=>{ //If user does not pass anything.
    res.send({ status: 200, message: "hello" });
})

router.get('/:id' , (req , res)=>{ // :id is Dynamic

    res.send({ status: 200, message: req.params.id?req.params.id : "ID not set" });
    // router code here
})

module.exports  = router