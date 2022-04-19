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
	for (let i=0; i<list.length; i++) {
		if (list[i].todoItemId == req.params.number) {
			res.status(200).json(list[i]);
			return;
		} 
	}
});

app.post('/api/TodoItems', (req, res) => {
    //Add an item to the dataset. 
	//If there is already an item with a matching todoItemId, 
	//overwrite the existing item.

	for (let i=0; i<list.length; i++) {
		if (list[i].todoItemId == req.body.todoItemId) {
			list.splice(i, 1, req.body);
			res.status(201).json(req.body);
			return;
		} 
	}
	list.push(req.body);
	
});

app.delete('/api/TodoItems/:number', (req, res) => {
	for(let i=0; i<list.length; i++) {
		if (list[i].todoItemId == req.params.number) {
			res.json(list[i]);
			list.splice(i, 1);
			return;
		}
	}
});

module.exports = app;