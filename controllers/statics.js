const User = require('../models/user');

function indexRoute(req, res, next) {
  User
    .find()
    .exec()
    .then((users) => {

      const markers = users.reduce((array, user) => {

        const park = array.find((_park) => {
          return _park.placeId === user.park.placeId;
        });
        console.log(park);

        if(park && user.dogs.length > 0) {
          park.dogs = park.dogs.concat(user.dogs);
        }

        if(!park && user.park.placeId) {
          const park = user.park.toObject();
          park.dogs = user.dogs;
          array.push(park);
        }

        return array;
      }, []);

      res.render('statics/index', { markers });
    })
    .catch(next);
}

module.exports = {
  index: indexRoute
};
