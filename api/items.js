const { ObjectID } = require('mongodb');
const _ = require('lodash');
const { Item } = require('../models/item');

module.exports = function itemsApi (app) {
  app.post('/items', (req, res) => {
    const item = _.pick(req.body, [
      'name',
      'price',
      'price1',
      'price2',
      'price3',
      'price4',
      'provider',
      'quantity'
    ]);

    item.modifiedAt = new Date().getTime();

    const itemModel = new Item(item);

    itemModel.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/items', (req, res) => {
    Item.find().then((items) => {
      res.send({ items });
    }, (e) => {
      res.status(400).send(e);
    });
  });

  app.get('/items/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Item.findById(id)
      .then((item) => {
        if (!item) {
          return res.status(404).send();
        }

        return res.send({ item });
      })
      .catch(e => res.status(400).send());
  });

  app.delete('/items/:id', (req, res) => {
    const id = req.params.id;

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Item.findByIdAndRemove(id)
      .then((item) => {
        if (!item) {
          return res.status(404).send();
        }

        return res.send({ item });
      })
      .catch(e => res.status(400).send());
  });

  app.patch('/items/:id', (req, res) => {
    const id = req.params.id;
    const body = _.pick(req.body, ['name']);

    if (!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    body.modifiedAt = new Date().getTime();

    Item.findByIdAndUpdate(id, { $set: body }, { new: true })
      .then((item) => {
        if (!item) {
          return res.status(404).send();
        }

        return res.send({ item });
      })
      .catch(e => res.status(400).send());
  });
};
