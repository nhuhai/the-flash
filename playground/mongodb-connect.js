// const { MongoClient, ObjectID } = require('mongodb');

// MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
//   if (err) {
//     return console.log('Unable to connect to MongoDB server');
//   }
//   console.log('Connected to MongoDB server');
//   const db = client.db('TodoApp');

//   db.collection('Todos').insertOne({
//     text: 'Something to do',
//     completed: false
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unalbe to insert todo', err);
//     }

//     console.log(JSON.stringify(result.ops, undefined, 2));
//   });

//   // Inser new doc into Users (name, age, location)
//   db.collection('Users').insertOne({
//     name: 'Hai',
//     age: 27,
//     location: 'Sunnyvale'
//   }, (err, result) => {
//     if (err) {
//       return console.log('Unable to insert user', err);
//     }

//     console.log(JSON.stringify(result.ops, undefined, 2));
//   })

//   client.close();
// });

var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp');

var Todo = mongoose.model('Todo', {
  text: {
    type: String
  },
  completed: {
    type: Boolean
  },
  completedAt: {
    type: Number
  }
});

// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

var newTodo = new Todo({
  text: 'Eat dinner'
});

newTodo.save().then((doc) => {
  console.log('Saved todo', doc);
}, (err) => {
  console.log('Unable to create todo', err);
});
