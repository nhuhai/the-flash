const { Todo } = require('../models/todo');
const { ObjectID } = require('mongodb');

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

  app.get('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findById(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }

        return res.send({ todo });
      })
      .catch(e => res.status(400).send());
  });
};
