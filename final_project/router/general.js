const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();



//Function to check if the user exists
const doesExist = (username)=>{
  let userswithsamename = users.filter((user)=>{
    return user.username === username
  });
  if(userswithsamename.length > 0){
    return true;
  } else {
    return false;
  }
}

public_users.post("/register", (req,res) => {
    const username = req.query.username;
    const password = req.query.password;

    if (username && password) {
      if (!doesExist(username)) { 
        users.push({"username":username,"password":password});
        return res.status(200).json({message: "User successfully registred. Now you can login"});
      } else {
        return res.status(404).json({message: "User already exists!"});    
      }
    } 
    return res.status(404).json({message: "Unable to register user."});
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
    let req_isbn = req.params.isbn;
    if (books[req_isbn]) {
        res.send(books[req_isbn])
    } else
        res.send(`Unable to find book with isbn: ${isbn}`)
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const all_isbns = Object.keys(books);
    let author = req.params.author;
    let found = Boolean(false);
   
    for (let i = 0; i < all_isbns.length; i++) {
        let isbn = all_isbns[i];
        let book = books[isbn]
    
        if(book['author'] == author){
            res.send(book);
            found = Boolean(true);
        }
     }
  
    if (!found) {
       res.send(`Unable to find book by author: ${author}`);
    }
 });
  

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const all_isbns = Object.keys(books)
    let title = req.params.title;
    let found = Boolean(false);

    for (let i = 0; i < all_isbns.length; i++) {
        let isbn = all_isbns[i];
        let book = books[isbn]

        if(book['title'] == title){
            res.send(book);
            found = Boolean(true);
        }
     }

    if (!found) {
       res.send(`Unable to find book by title: ${title}`);
    }
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    let isbn = req.params.isbn;
    let book = books[isbn];
    if(book) {
        res.send(book['reviews']);
    }
    else{
        res.send(`Unable to find book by isbn: ${isbn}`);
    }
});

module.exports.general = public_users;
