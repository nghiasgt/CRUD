const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const port = 3000;
app.use(bodyParser.json());

const sequelize = new Sequelize('crud_db', 'root', 'password', {
  host: 'db',
  dialect: 'mysql'
});

const Data = sequelize.define('Data', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  timestamps: false
});

sequelize.sync().catch(err => {
  console.error('Unable to sync database:', err);
});

// crud 
// Create
app.post('/api/data', async (req, res) => {
  try {
    const { name, age } = req.body;
    const newData = await Data.create({ name, age });
    res.status(201).json(newData);
  } catch (err) {
    console.error('Error creating data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// read al 
app.get('/api/data', async (req, res) => {
  try {
    const allData = await Data.findAll();
    res.json(allData);
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// read One
app.get('/api/data/:id', async (req, res) => {
  try {
    const data = await Data.findByPk(req.params.id);
    if (data) {
      res.json(data);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (err) {
    console.error('Error fetching data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// update
app.put('/api/data/:id', async (req, res) => {
  try {
    const { name, age } = req.body;
    const [updated] = await Data.update({ name, age }, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedData = await Data.findByPk(req.params.id);
      res.json(updatedData);
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (err) {
    console.error('Error updating data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// delete
app.delete('/api/data/:id', async (req, res) => {
  try {
    const deleted = await Data.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Data not found' });
    }
  } catch (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// run sẻver 
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
