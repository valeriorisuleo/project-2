const Park = require('../models/park');

function indexRoute(req, res, next) {
  Park
    .find()
    .exec()
    .then((parks) => res.render('parks/index', { parks }))
    .catch(next);
}

function createRoute(req, res, next) {
  Park
    .findOne({ placeId: req.body.placeId })
    .exec()
    .then((park) => {
      if(park) return false;
      return Park.create(req.body);
    })
    .then(() => res.redirect('/users/:id'))
    .catch((err) => {
      if(err.name === 'ValidationError') return res.badRequest('/parks', err.toString());
      next(err);
    });
}

function newRoute(req, res) {
  return res.render('parks/new');
}


module.exports = {
  index: indexRoute,
  create: createRoute,
  new: newRoute
};
