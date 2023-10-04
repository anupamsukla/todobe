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

app.put("/todos/:id",async (req, res) => {

  const id = req.params.id;
  const name = req.body.name;
  const done = req.body.done;
  try {
    const existingTodo =  connection.query('SELECT * FROM todo WHERE id = ?', [id]);

    if (existingTodo.length === 0) {
      return res.status(404).json({ error: 'TODO not found' });
    }

    // Update the TODO with the new data
    connection.query('UPDATE todo SET name = ?, done = ? WHERE id = ?', [name, done, id], (error, results) => {
      if (error) {
        console.error('Error updating TODO:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      // Check the affectedRows property to verify if the update was successful
      if (results.affectedRows === 1) {
        res.json({ message: 'TODO updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update TODO' });
      }
    });

    
    // Return the updated TODO
    res.json({ message: 'TODO updated successfully' });
  } catch (error) {
    console.error('Error updating TODO:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }

  })