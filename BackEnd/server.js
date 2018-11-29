var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var mongoose = require('mongoose');
var mongoDB = 'mongodb://G00347526:Password123@ds141783.mlab.com:41783/lab5'
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
var postSchema = new Schema({
    firstname: String,
    surname: String,
    number: String,
    job: String,
    website: String
})

var PostModel = mongoose.model('post', postSchema);
//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


app.get('/', function (req, res) {
    res.send('Hello from Express');
})

app.post('/api/posts', function (req, res) {
    console.log("post successful");
    console.log(req.body.firstname);
    console.log(req.body.surname);
    console.log(req.body.number);
    console.log(req.body.job);
    console.log(req.body.website);

    PostModel.create({
        firstname: req.body.firstname,
        surname: req.body.surname,
        number: req.body.number,
        job: req.body.job,
        website: req.body.website  
    },
    function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    })
    
    // adding this text will close server (stopping double posts)
})

app.get('/api/posts', function (req, res) {

    PostModel.find(function (err, data) {
        if (err)
            res.send(err);
        res.json(data);
    });

})

app.delete('/api/posts/:id', function (req, res) {
    console.log(req.params.id);

    PostModel.deleteOne({ _id: req.params.id },
        function (err, data) {
            res.send(data);
        })
})

app.get('/api/posts/:id', function(req,res){
    PostModel.find({ _id: req.params.id},
        function (err, data) {
            if (err)
                return handleError(err);
            res.json(data);
    });
});

app.put('/api/posts/:id', function(req,res){
    PostModel.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
        if (err) return next(err);
         res.json(post);
    });
});
    

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})