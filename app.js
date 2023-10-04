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
  connection.query('SELECT * FROM users', function (err, rows, fields) {
    if (err) throw err
    res.send(rows)
  })
})
