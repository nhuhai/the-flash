const { ObjectID } = require('mongodb');
const { Todo } = require('../models/todo');
const _ = require('lodash');

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

  app.delete('/todos/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id)
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }

        return res.send({ todo });
      })
      .catch(e => res.status(400).send());
  });

  app.patch('/todos/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['text', 'completed']);
    const completed = body.completed;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    if (_.isBoolean(completed) && completed) {
      body.completedAt = new Date().getTime();
    } else {
      body.completed = false;
      body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, { $set: body }, { new: true })
      .then((todo) => {
        if (!todo) {
          return res.status(404).send();
        }

        return res.send({ todo });
      })
      .catch(e => res.status(400).send());
  });
};
