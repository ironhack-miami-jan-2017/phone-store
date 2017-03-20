const express = require('express');
const mongoose = require('mongoose');

const Phone = require('../models/phone-model');

const router = express.Router();


  // GET http://localhost:3000/api/phones
router.get('/phones', (req, res, next) => {
  Phone.find((err, phonesList) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(phonesList);
  });
});

  // POST http://localhost:3000/api/phones
router.post('/phones', (req, res, next) => {
  const thePhone = new Phone({
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  });

  thePhone.save((err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'new Phone created!',
      id: thePhone._id
    });
  });
});

router.get('/phones/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
       .json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.findById(req.params.id, (err, thePhone) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json(thePhone);
  });
});

router.put('/phones/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
       .json({ message: 'Specified id is not valid' });
    return;
  }

  const updates = {
    brand: req.body.brand,
    name: req.body.name,
    specs: req.body.specs,
    image: req.body.image
  };

  Phone.findByIdAndUpdate(req.params.id, updates, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Phone updated successfully'
    });
  });
});

router.delete('/phones/:id', (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400)
       .json({ message: 'Specified id is not valid' });
    return;
  }

  Phone.remove({ _id: req.params.id }, (err) => {
    if (err) {
      res.json(err);
      return;
    }

    res.json({
      message: 'Phone has been removed!'
    });
  });
});


module.exports = router;
