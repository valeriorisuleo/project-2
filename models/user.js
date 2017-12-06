const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

//schema for dog

const dogSchema = new mongoose.Schema({
  //we define the content of the dogs
  name: { type: String, required: true },
  breed: { type: String, required: true },
  size: { type: String, required: true },
  age: { type: Number, required: true },
  attitude: { type: String, required: true },
  image: { type: String, required: true}

  //Who create the dog
  // createdBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true }   //because comments is embedded we need a new schema for it(step2)

}, {
  //We also want to know the day and the time when the dog was created.
  timestamps: true
});

dogSchema.methods.ownedBy = function ownedBy(user) {
  return this.createdBy.id === user.id;
};

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String },
  address: { type: String },
  password: { type: String },
  park: {
    placeId: { type: String },
    name: { type: String },
    lat: { type: Number },
    lng: { type: Number }
  },
  dogs: [ dogSchema ]
});


userSchema
  .virtual('passwordConfirmation') // virtual is not stored in database, but used to check pw exists
  .set(function setPasswordConfirmation(passwordConfirmation) {
    this._passwordConfirmation = passwordConfirmation;
  });

// lifecycle hook - mongoose middleware
userSchema.pre('validate', function checkPassword(next) {
  if(this.isModified('password') && this._passwordConfirmation !== this.password) this.invalidate('passwordConfirmation', 'does not match');
  next();
});

userSchema.pre('save', function hashPassword(next) {
  if(this.isModified('password')) {
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8));
  }
  next();
});

// apply method to the user instance created by userSchema
userSchema.methods.validatePassword = function validatePassword(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
