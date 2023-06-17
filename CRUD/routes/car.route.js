const express = require('express');
const app = express();
const carRoutes = express.Router();

let Car = require('../model/Car');

// api to add car
carRoutes.route('/add').post(function (req, res) {
  let car = new Car(req.body);
  car.save()
  .then(car => {
    res.status(200).json({'status': 'success','mssg': 'car added successfully'});
  })
  .catch(err => {
    res.status(409).send({'status': 'failure','mssg': 'unable to save to database'});
  });
});

// api to get cars
carRoutes.route('/').get(function (req, res) {
  Car.find(function (err, cars){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','cars': cars});
    }
  });
});

// api to get car
carRoutes.route('/car/:id').get(function (req, res) {
  let id = req.params.id;
  Car.findById(id, function (err, car){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','car': car});
    }
  });
});

// api to update route
carRoutes.route('/update/:id').put(function (req, res) {
    Car.findById(req.params.id, function(err, car) {
    if (!car){
      res.status(400).send({'status': 'failure','mssg': 'Unable to find data'});
    } else {
        car.modelo = req.body.modelo;
        car.cor = req.body.cor;
        car.marca = req.body.marca;
        car.num_porta = req.body.num_porta;

        car.save().then(business => {
          res.status(200).json({'status': 'success','mssg': 'Update complete'});
      })
    }
  });
});

// api for delete
carRoutes.route('/delete/:id').delete(function (req, res) {
  Car.findByIdAndRemove({_id: req.params.id}, function(err,){
    if(err){
      res.status(400).send({'status': 'failure','mssg': 'Something went wrong'});
    }
    else {
      res.status(200).json({'status': 'success','mssg': 'Delete successfully'});
    }
  });
});

module.exports = carRoutes;