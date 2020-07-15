// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Waiting List (DATA)
// =============================================================
var waitlist = [
    {
      name: "",
      party_size: 0,
      number: 0,
      email: ""
    }
  ];

// Table List
  var tables = [
    {
      name: "",
      party_size: 0,
      number: 0,
      email: ""
    }
  ];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

// Displays all tables
app.get("/api/waitlist", function(req, res) {
  return res.json(waitlist);
});

// Displays all customers on waiting list
app.get("/api/tables", function(req, res) {
  return res.json(tables);
});

// Create New Characters - takes in JSON input
app.post("/api/waitlist", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var newReservation = req.body;

  console.log(newReservation);

  waitlist.push(newReservation);

  res.json(newReservation);
});

app.post("/api/tables", function(req, res) {

  var newTable = req.body;

  console.log(newTable);

  tables.push(newTable);

  res.json(newTable);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
