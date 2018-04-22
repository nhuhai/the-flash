const { Todo } = require('../models/todo');

module.exports = function todoApis (app) {
  app.post('/todos', (req, res) => {
    const todo = new Todo({
      text: req.body.text
    });

    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
      res.send({ todos });
    }, (e) => {
      res.status(400).send(e);
    });
  });
};
