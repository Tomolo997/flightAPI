const mongoose = require('mongoose');
const validator = require('validator');
const bycrpt = require('bcryptjs');
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please provide  your email '],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Please confirm your password'],
    validate: {
      //this only works on CREATE and SAVE!!! => update does not work, for updating we must use save.
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
  flights: { type: Array, default: [] },
});

/*
db.update({'Searching criteria goes here'},
{
 $push : {
    flights :  {
             "from": ZAG,
             "to": ZAG
           } //inserted data is the object to be inserted 
  }
});
*/

const Users = mongoose.model('Users', userSchema);

module.exports = Users;
