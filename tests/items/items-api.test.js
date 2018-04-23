const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('../../server');
const { Item } = require('../../models/item');

const items = [
  {
    _id: new ObjectID(),
    name: 'First item'
  },
  {
    _id: new ObjectID(),
    name: 'Second item',
  }
];

beforeEach((done) => {
  Item.remove({})
    .then(() => Item.insertMany(items))
    .then(() => done());
});

describe('POST /items', () => {
  it('should create a new item', (done) => {
    const name = 'Bút bi TL-027';

    request(app)
      .post('/items')
      .send({ name })
      .expect(200)
      .expect((res) => {
        expect(res.body.name).toBe(name);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Item.find({ name })
          .then((items) => {
            expect(items.length).toBe(1);
            expect(items[0].name).toBe(name);
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should not create item with invalid body data', (done) => {
    request(app)
      .post('/items')
      .send({})
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Item.find({})
          .then((items) => {
            expect(items.length).toBe(2);
            done();
          })
          .catch(e => done(e));
      })
  });
});

describe('GET /items', () => {
  it('should get all items', (done) => {
    request(app)
      .get('/items')
      .expect(200)
      .expect(res => expect(res.body.items.length).toBe(2))
      .end(done);
  });
});

describe('GET /items/:id', () => {
  it('should return item doc', (done) => {
    request(app)
      .get(`/items/${items[0]._id.toHexString()}`)
      .expect(200)
      .expect(res => expect(res.body.item.name).toBe(items[0].name))
      .end(done);
  });

  it('should return 404 if item not found', (done) => {
    const hexId = new ObjectID().toHexString();

    request(app)
      .get(`/items/${hexId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for non-object ids', (done) => {
    request(app)
      .get('/items/123abc')
      .expect(404)
      .end(done);
  });
});

describe('DELETE /items/:id', () => {
  it('should remove an item', (done) => {
    const hexId = items[1]._id.toHexString();

    request(app)
      .delete(`/items/${hexId}`)
      .expect(200)
      .expect(res => expect(res.body.item._id).toBe(hexId))
      .end((err, res) => {
        if (err) {
          return done(err);
        }

        Item.findById(hexId)
          .then((item) => {
            expect(item).toBeFalsy();
            done();
          })
          .catch(e => done(e));
      });
  });

  it('should return 404 if item not found', (done) => {
    const hextId = new ObjectID().toHexString();

    request(app)
      .delete(`/items/${hextId}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if object id is invalid', (done) => {
    request(app)
      .delete('/items/123abd')
      .expect(404)
      .end(done);
  });
});

describe('PATCH /items/:id', () => {
  it('should update the item', (done) => {
    const hexId = items[0]._id.toHexString();
    const newName = 'This should be the new name';

    request(app)
      .patch(`/items/${hexId}`)
      .send({
        name: newName
      })
      .expect(200)
      .expect((res) => {
        const { name, modifiedAt } = res.body.item;

        expect(name).toBe(newName);
        expect(typeof modifiedAt).toBe('number');
      })
      .end(done);
  });
});
