const Joi = require('joi');
const {Schema, model} = require('mongoose');

const userSchema = Schema({
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter"
  },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    require: true,
  }
}, {versionKey: false, timestamps: true});

const joiSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  password: Joi.string().min(6).max(30).required(),
  subscription: Joi.string()
})

const User = model('user', userSchema);

module.exports = {
  User,
  joiSchema
};
