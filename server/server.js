const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

app.post("/todo", (req, res) => {
  console.log("in post on server side", req.body);
});

app.listen(port, () => {
  console.log("listening on port: ", port);
});
