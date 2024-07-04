const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

// Database connection
const sequelize = new Sequelize('mysql://root:password@db:3306/crud_db');

const Data = sequelize.define('Data', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const app = express();
app.use(bodyParser.json());

// CRUD APIs
app.post('/api/data', async (req, res) => {
    const { name, age } = req.body;
    const newData = await Data.create({ name, age });
    res.status(201).json(newData);
});

app.get('/api/data', async (req, res) => {
    const data = await Data.findAll();
    res.json(data);
});

app.get('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Data.findByPk(id);
    if (data) {
        res.json(data);
    } else {
        res.status(404).send('Data not found');
    }
});

app.put('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const data = await Data.findByPk(id);
    if (data) {
        data.name = name;
        data.age = age;
        await data.save();
        res.json(data);
    } else {
        res.status(404).send('Data not found');
    }
});

app.delete('/api/data/:id', async (req, res) => {
    const { id } = req.params;
    const data = await Data.findByPk(id);
    if (data) {
        await data.destroy();
        res.status(204).send();
    } else {
        res.status(404).send('Data not found');
    }
});

const startServer = async () => {
    await sequelize.sync();
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
};

startServer();
