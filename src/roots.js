const express = require('express');
const Users = require('../src/models/login')
const router = new express.Router()

//Add to database
router.post('/addMongoose',(req,res) => {
    if(!req.body.username || !req.body.password){
        res.status(400).send('Input error')
        return;
    }
    const course = new Users({
        username: req.body.username,
        password:req.body.password
    })
    course.save()
    .then(()=>res.status(200).send('Added'))
    .catch((e)=> res.status(404).send(e))
})

//Show data from database
router.get('/customerMongoose',(req,res)=>{
    Users.find()
    .then(documents => res.status(200).send(documents))
    .catch((e)=> res.status(404).send(e))
})

//Delete record from database
router.delete('/deleteMongoose/:id',(req,res)=>{
Users.deleteOne({_id: req.params.id}).then(result =>{
    console.log(result)
    res.status(200).send('Customer deleted')
});
});


//General successful message
//res.status(200).json({
//message: ""
//variable need to save data on  
//})


//Welcome Page
router.post('/',async(req,res) => {
  try {
      const user = await Users.findByCredentials(req.body.username,req.body.password)
      res.send('Welcome Sameh')
  } catch (error) {
      res.status(400).send(error)
  }
})
// Show All
router.get('/customer',(req,res) => {
    res.send(course)
})

// Add 
router.post('/add',(req,res) => {
    if(!req.body.name || !req.body.number){
        res.status(400).send('Input error')
        return;
    }
    const course = {
        name:req.body.name,
        number:req.body.number
    }
    courses.push(course);
    res.send('Added')
})
// Update by name
router.put('/update/:name',(req,res)=>{
    // const course = courses.find(req.params.name)
    // course.number = req.body.number
    const sam = req.params.name
    const rek = courses.find(el => el.name ===sam)
    rek.number=req.body.number
    res.send("updated")
})

// Find by name
router.get('/find/:name',(req,res)=>{
    const sam = req.params.name
    const rek = courses.find(el => el.name ===sam)
    res.send(rek)
})

// Delete
router.delete('/delete/:name', (req,res) => {
    const sam = req.params.name
    const rek = courses.find(el => el.name ===sam)
    const index = courses.indexOf(rek);
    courses.splice(index,1);
    res.send('deleted')  
})


module.exports = router