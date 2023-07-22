const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
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
