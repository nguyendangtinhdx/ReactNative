var express = require("express");
var app = express();
var mysql = require("mysql");
var bodyParser = require("body-parser");
app.use(bodyParser.json({ type: "application/json" }));
// support URL-encode body
app.use(bodyParser.urlencoded({ extended: true }));

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "react_native"
});

var server = app.listen(4000, function() {
  var host = server.address().address;
  var port = server.address.port;

  console.log("server start at port 4000");
});

con.connect(function(error) {
  if (error) console.log("error");
  else console.log("connected");
});

// load data
app.get("/api/users", function(req, res) {
  con.query("SELECT * FROM users", function(error, rows, fields) {
    if (error) console.log("error");
    else {
      res.send(JSON.stringify(rows));
    }
  })
});

// insert
app.post("/api/users", function(req, res) {
  con.query("INSERT INTO users SET ?", req.body, function(error, rows, fields) {
    if (error) console.log("error");
    else {
      res.send(JSON.stringify(rows));
    }
  })
});

// search
app.get("/api/users/:id", function(req, res) {
  con.query("SELECT * FROM users WHERE name LIKE ? OR email LIKE ? OR phone LIKE ?" , ['%' + req.params.id + '%', '%' + req.params.id + '%', '%' + req.params.id + '%'], function(error, rows, fields) {
    if (error) console.log("error");
    else {
      res.send(JSON.stringify(rows));
    }
  })
});

// update
app.put("/api/users", function(req, res) {
  con.query("UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?", [req.body.name, req.body.email, req.body.phone, req.body.id], function(error, rows, fields) {
    if (error) console.log("error");
    else {
      res.send(JSON.stringify(rows));
    }
  })
});

// delete
app.delete("/api/users/:id", function(req, res) {
  con.query("DELETE FROM users WHERE id = ?" , req.params.id , function(error, rows, fields) {
    if (error) console.log("error");
    else {
      res.send(JSON.stringify(rows));
      res.end('successfully deleted');
    }
  })
});