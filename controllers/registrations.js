const User = require('../models/user');
// const rp = require('request-promise');

function newRoute(req, res) {
  return res.render('registrations/new');
}

function createRoute(req, res, next) {
  // req.body is equal to all of the user data from the register form
  // rp({
  //   method: 'GET',
  //   url: 'https://maps.googleapis.com/maps/api/geocode/json',
  //   qs: {
  //     address: req.body.address,
  //     key: 'AIzaSyBT0Od7wbBiJLpCARGISQy2ZKlD9hrTT7w'
  //   },
  //   json: true
  // }).then((response) => {
  //
  //   req.body.latitude = response.results[0].geometry.location.lat;
  //   req.body.longitude = response.results[0].geometry.location.lng;
    // req.body is equal to all of the user data from the register form PLUS the new lat and lng

  User
    .create(req.body)
    .then(() => res.redirect('/users/show'))
    .catch((err) => {
      if(err.name === 'ValidationError') {
        req.flash('alert', 'Passwords do not match');
        return res.redirect('/login');
      }
      next();
    });
  // })
  // .catch(next);

}

module.exports = {
  new: newRoute,
  create: createRoute
};
