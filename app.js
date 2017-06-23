// Require dependencies.
const express = require('express');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const mustacheExpress = require('mustache-express');

// Create app.
const app = express();
// Instantiate todoList array.
const todoList = [];
// Configure dependencies.
app.engine('mustache', mustacheExpress());
app.set('views', './views');
app.set('view engine', 'mustache');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(express.static('./public'));

// Add route to render the To Do list on the index page.
app.get('/', function(req, res){
  res.render('index', {todoList: todoList});
});

// Receives data from form (action='/')
// 'req.body' now contains form data.
app.post('/', function(req, res){
// Check for validation errors and create error message.
  req.checkBody('item', 'Please enter something to do.' ).notEmpty();

  let errors = req.validationErrors();
  if (errors) {
// Render validation error messages.
    res.render('index', {errors: errors});
  } else {
// Add new todo to the To Do list.
      let todo = {
        'item': req.body.item,
        'priority': req.body.priority,
        'checked': ""
      };
      todoList.push(todo);
// Render index page with updated To Do list.
      res.render('index', {todoList: todoList});
    }
  });
// Local web server to run the app.
app.listen(3000, function(){
  console.log('Started express application!')
});
