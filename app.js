const express = require('express');
const bodyParser = require('body-parser');
const cors=require('cors')

require('dotenv').config()
const mysql = require('mysql2')
const connection = mysql.createConnection(process.env.DATABASE_URL)
connection.connect()


const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json());
app.use(cors())

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


app.get('/todos', (req, res) => {
  connection.query('SELECT * FROM todo', function (err, rows, fields) {
    if (err) throw err
    res.send(rows)
  })
})


app.post("/todos", (req, res) => {
  const name = 'req.body.name';
  const age = req.body.age;
  // INSERT INTO todo (name, done) VALUES ('Task 1', false);
  connection.query('INSERT INTO todo (name,done) VALUES (?,?)', ['Task 3', false],
      (err, result, field) => {
          if (err) {
              console.log(err);
          }
          else {
              return res.json("successfully created ");

          }
      });
})