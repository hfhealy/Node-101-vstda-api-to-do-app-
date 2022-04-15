const express = require('express');
const morgan = require('morgan');

var bodyParser = require('body-parser');

var list = [
	{
		todoItemId: 0,
		name: 'an item',
		priority: 3,
		completed: false
	},
	{
		todoItemId: 1,
		name: 'another item',
		priority: 2,
		completed: false
	},
	{
		todoItemId: 2,
		name: 'a done item',
		priority: 1,
		completed: true
	}
];

const app = express();

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.set('json spaces', 2);

app.get('/', (req, res) => {
    res.json({ 'status': 'ok' });
});

app.get('/api/TodoItems', (req, res) => {
    res.json(list);
});

app.get('/api/TodoItems/:number', (req, res) => {
    // console.log("line 46", list[req.params.number]);
    res.json(list[req.params.number]);
});

app.post('/api/TodoItems', (req, res) => {
    res.status(201).json(req.body);
});

app.delete('/api/TodoItems/:number', (req, res) => {
    res.json(list[req.params.number]);
});

module.exports = app;