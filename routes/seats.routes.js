const express = require('express');
const router = express.Router();
const db = require('./../db');
const uuidv1 = require('uuid/v1');

router.route('/seats').get((req, res) => {
  res.json(db.seats);
});

router.route('/seats/:id').get((req, res) => {
  for (let post of db.seats) {
    if (req.params.id === post.id) {
      res.json(post);
    }
  }
});

router.route('/seats').post((req, res) => {
  const { day, seat, client, email } = req.body;
  let check = true;
  for (let post of db.seats) {
    if (post.day === day && post.seat === seat) {
      res.json({ message: 'This seat is already taken' });
      check = false;
    }
  }
  if (check === true) {
    const newPost = {
      day: day,
      seat: seat,
      client: client,
      email: email,
      id: uuidv1(),
    };
    db.seats.push(newPost);
    res.json({ message: 'OK' });
  }
});

router.route('/seats/:id').put((req, res) => {
  const { day, seat, client, email } = req.body;
  let check = true;
  for (let post of db.seats) {
    if (post.day === day && post.seat === seat) {
      res.json({
        message: 'This is not your seat',
      });
      check = false;
    }
  }
  for (let post of db.seats) {
    if (check === true && post.id === req.params.id) {
      post.day = day;
      post.seat = seat;
      post.client = client;
      post.email = email;
    }
  }
  res.json({ message: 'OK' });
});


router.route('/seats/:id').delete((req, res) => {
  const { id } = req.params;
  db.seats = db.seats.filter((item) => {
    return item.id != id;
  })

  res.send({ message: 'OK' });
});

module.exports = router;
