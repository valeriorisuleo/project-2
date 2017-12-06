const router = require('express').Router();
const registrations = require('../controllers/registrations');
const sessions = require('../controllers/sessions');
const secureRoute = require('../lib/secureRoute');
const users = require('../controllers/users');
const parks = require('../controllers/parks');
const statics = require('../controllers/statics');

// router.route('/')
// .get(secureRoute, users.show);

router.route('/')
  .get(statics.index);

//PARK ROUTE
router.route('/parks')
.get(secureRoute, parks.index)
.post(secureRoute, parks.create);

router.route('/parks/new')
.get(secureRoute, parks.new);

//USER ROUTE
router.route('/users/:id/edit')
.get(secureRoute, users.edit);

router.route('/users/:id')
.get(secureRoute, users.show)
.put(secureRoute, users.update);

//DOG ROUTE

router.route('/users/:id/dogs')
  .post(secureRoute, users.createDog);

router.route('/users/:id/dogs/:dogId')
  .delete(secureRoute, users.deleteDog)
  .put(secureRoute, users.updateDog);

router.route('/users/:id/dogs/:dogsId/edit')
  .get(secureRoute, users.editDog);

router.route('/users/:id/dogs/new')
  .get(secureRoute, users.newDog);

//REGISTER ROUTE
router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);



router.all('*', (req, res) => res.notFound());

module.exports = router;
