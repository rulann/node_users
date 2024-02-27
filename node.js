const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

const {MongoClient}=require('mongodb')

const connection="mongodb+srv://rulan:mongo123@cluster0.2fxosrh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"

const client= new MongoClient(connection)

const mydb= client.db('users')  

const collection= mydb.collection('user')


app.get('/', function(req, res){
    res.send('start server')
})

var bodyParse= require('body-parser')

var urlEncoded= bodyParse.urlencoded({extended:false})

app.get("/form", function(req,res)
{
   res.sendFile( __dirname + "/login.html") 
})

var fs =  require("fs");


app.post("/login",urlEncoded, async(req,res)=>
{
    const finduser= await collection.findOne({'username':req.body.username})
    if (finduser) 
    {
        res.sendFile(__dirname+"/userInfo.html")
    }
    else{
        res.sendFile(__dirname+"/signup.html")
    }
})


app.post("/register",urlEncoded, async(req,res)=>
{    //find 
     const createuser= await collection.insertOne({
        'username': req.body.username,
        'age': req.body.age,
        'email': req.body.email,
        'password': req.body.password,
        'gender': req.body.Gender
     })
     res.end("user added successfully")
})

var server= app.listen(9090, function()
{
    var host = server.address().address
    var port= server.address().port
})