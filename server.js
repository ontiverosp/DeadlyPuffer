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
var waitlist = [];

// Table List
var tables = [];

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

// Create New Reservation - takes in JSON input

app.post("/api/tables", function(req, res) {
  let newTable = req.body;
  if (tables.length >= 5) {
    waitlist.push(newTable);
  } else {
    tables.push(newTable);
  }
  console.log(newTable);

  res.json(newTable);
});


// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
