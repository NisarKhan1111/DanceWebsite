const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require('body-parser')
const port = 8000;
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/contactDance',{useNewUrlParser:true});

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

  const contact = mongoose.model('contact', contactSchema);

app.use('static',express.static('static'));
app.use(express.urlencoded());
app.set('view engine','pug');// Set the template engine
app.set('views',path.join(__dirname,'views')); // Set thr view directory
app.get("/",(req,res)=>{
    const params = {}
    res.status(200).render('home.pug',params)
});
app.get("/contact",(req,res)=>{
    const params = {}
    res.status(200).render('contact.pug',params)
});
app.post("/contact",(req,res)=>{
    const mydata = new contact(req.body);
    mydata.save().then(()=>{
        res.send("This item has been  saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
});

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
});