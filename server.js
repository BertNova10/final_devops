const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");

const app = express();
const PORT = 2001;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(expressLayouts);

// Set EJS and layout options
app.set("view engine", "ejs");
app.set("layout", "layout"); // Default layout file is layout.ejs

// Dummy data
let todos = ["Learn Express.js", "Build a To-Do App"];

// Routes
app.get("/", (req, res) => {
  res.render("index", { todos });
});

app.post("/add", (req, res) => {
  const newTodo = req.body.todo;
  if (newTodo.trim()) {
    todos.push(newTodo);
  }
  res.redirect("/");
});

app.post("/delete", (req, res) => {
  const index = req.body.index;
  todos.splice(index, 1);
  res.redirect("/");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
