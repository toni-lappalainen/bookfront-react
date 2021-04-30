const cors = require("cors");
const express = require("express");

global.__basedir = __dirname;

//=== ROUTERS ===
const bookRouter = require("./bookRoutes");

const app = express();

app.use(cors());
app.options("*", cors());

// === MIDDLEWARE ===
app.use(express.json());

// === ROUTES ===
app.use("/books", bookRouter);

app.listen(3100, function () {
  console.log("listening on 3100");
});
