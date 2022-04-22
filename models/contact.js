const {Schema, model} = require('mongoose');
const Joi = require('joi');

const contactSchema = Schema({
  name: {
    type: String,
    required: [true, 'Set name for contact'],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
}, {versionKey: false, timestamps: true});

const joiSchema = Joi.object().keys({ 
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: Joi.number().required(), 
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
}); 

const favoriteJoiSchema = Joi.object().keys({
  favorite: Joi.boolean().required()
})

const Contact = model('contact', contactSchema);

module.exports = {
  Contact,
  joiSchema,
  favoriteJoiSchema
};
