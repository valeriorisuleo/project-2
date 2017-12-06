const User = require('../models/user');

function showRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/show', { user });
    })
    .catch(next);
}

function editRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      return res.render('users/edit', { user });
    })
    .catch(next);
}

function updateRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      for(const field in req.body) {
        user[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

//DOG CONTROLLER
function createDogRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      if(!user) return res.notFound();
      user.dogs.push(req.body); // req.body is equal to the dog data from the form
      return user.save();
    })
    .then((user) => {
      return res.redirect(`/users/${user.id}`);
    })
    .catch(next);
}

function deleteDogRoute(req, res, next) {
  User
  .findById(req.user.id)
  .exec()
  .then((user) => {
    if(!user) return res.notFound();
    // get the embedded record by it's id
    const dog = user.dogs.id(req.params.dogId);
    dog.remove();
    return user.save();
  })
  .then((user) => res.redirect(`/users/${user.id}`))
  .catch(next);
}

function newDogRoute(req, res, next) {
  User
  .findById(req.user.id)
  .exec()
  .then((user) => {
    if(!user) return res.notFound();
    return res.render('dogs/new', { user });
  })
  .catch(next);
}

function editDogRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      const dog = user.dogs.id(req.params.dogId);
      return res.render('dogs/edit', { user, dog });
    })
    .catch(next);
}

function updateDogRoute(req, res, next) {
  User
    .findById(req.user.id)
    .exec()
    .then((user) => {
      const dog = user.dogs.id(req.params.dogId);

      for(const field in req.body) {
        dog[field] = req.body[field];
      }

      return user.save();
    })
    .then(() => res.redirect(`/users/${req.params.id}`))
    .catch(next);
}

module.exports = {
  show: showRoute,
  edit: editRoute,
  update: updateRoute,
  createDog: createDogRoute,
  deleteDog: deleteDogRoute,
  newDog: newDogRoute,
  editDog: editDogRoute,
  updateDog: updateDogRoute
};
