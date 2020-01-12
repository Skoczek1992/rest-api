const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv1 = require('uuid/v1');

router.route('/concerts').get((req, res) => {
  res.json(db.concerts);
});

router.route('/concerts/:id').get((req, res) => {
  let newDb = db.concerts.filter((item) => {
    return item.id == req.params.id;
  })
  res.json(newDb);
});

router.route('/concerts').post((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  const newPost = {
    performer: performer,
    genre: genre,
    price: price,
    day: day,
    image: image,
    id: uuidv1(),
  };
  db.concerts.push(newPost);
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').put((req, res) => {
  const { performer, genre, price, day, image } = req.body;
  for (let post of db.concerts) {
    if (post.id === req.params.id) {
      post.performer = performer;
      post.genre = genre;
      post.price = price;
      post.day = day;
      post.image = image;
    }
  }
  res.json({ message: 'OK' });
});

router.route('/concerts/:id').delete((req, res) => {
  const { id } = req.params;
  db.concerts = db.concerts.filter((item) => {
    return item.id != id;
  })

  res.send({ message: 'OK' });
});

module.exports = router;
