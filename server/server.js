require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 5000;
const pg = require("pg");
const Pool = pg.Pool;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  //   ssl: true,
});
//   database: "weekend-to-do-app", //name of database
//   host: "localhost", // where is database
//   port: 5432, // always default port
//   max: 10, // number of connections
//   idleTimeoutMillis: 10000, // 10 second timeout.

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("server/public"));

app.listen(port, () => {
  console.log("listening on port: ", port);
});

app.post("/todo", (req, res) => {
  console.log("in post on server side", req.body);
  const query = `INSERT INTO "todo" ("task") VALUES ($1);`;
  const values = [req.body.task];
  pool
    .query(query, values)
    .then((results) => {
      res.sendStatus(201);
    })
    .catch((err) => {
      console.log("error with insert", err);
      res.sendStatus(500);
    });
});

app.get("/todo", (req, res) => {
  console.log("in /todo GET");
  const query = `SELECT * From "todo" ORDER BY "id";`;
  pool
    .query(query)
    .then((results) => {
      res.send(results.rows);
    })
    .catch((err) => {
      console.log("error with server side GET", err);
      res.sendStatus(500);
    });
});

app.put("/todo/:id", (req, res) => {
  console.log("/todo PUT", req.params.id, req.body);
  const query = `UPDATE "todo" SET complete=$1 WHERE id = $2;`;
  const values = [req.body.complete, req.params.id];
  pool
    .query(query, values)
    .then((results) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error server side PUT ", err);
      res.sendStatus(500);
    });
});

app.delete("/todo/:id", (req, res) => {
  console.log("in server side delete", req.params.id);
  const query = `DELETE FROM "todo" WHERE id=$1;`;
  const values = [req.params.id];
  pool
    .query(query, values)
    .then((response) => {
      res.sendStatus(200);
    })
    .catch((err) => {
      console.log("error with sending back Delete on server side", err);
      res.sendStatus(500);
    });
});
