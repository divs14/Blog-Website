//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const homeStartingContent = "Welcome to my website! I am thrilled to have you here, ready to embark on a journey of discovery and inspiration.";
const aboutContent = " Hey there! My name is Divyanshu Gupta, I have done my schooling and my coaching from Kota, Rajasthan. I have done my schooling till Class 12th in Nalanda Academy, Kota and have done coaching in Resonance Eduventures for JEE. After clearing exam, I took admission in the IDD (Integrated Dual Degree) program of IIT(BHU) Varanasi. I have an immense passion for problem-solving, and I am also interested towards creating websites that people loves!.";
const contactContent = "My contact details are :-";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var DB = 'mongodb+srv://divyanshuguptacer20:Azt1msPWAw1LzTUi@cluster0.aapsi0m.mongodb.net/'
mongoose.connect(DB, {useNewUrlParser: true});

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

app.get("/", function(req, res){

  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts:posts
      });
  });
});

app.get("/compose", function(req, res){
  res.render("compose");
});

app.post("/compose", function(req, res){
  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/");
    }
  });
});

app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});

app.get("/about", function(req, res){
  res.render("about", {aboutContent: aboutContent});
});

app.get("/contact", function(req, res){
  res.render("contact", {contactContent: contactContent});
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
