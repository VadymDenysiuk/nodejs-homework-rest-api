const {Contact, joiSchema} = require('../../models/contact');
const { validation } = require('../../middlewares/validation');

const add = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const validationResult = joiSchema.validate(req.body);
    validation(validationResult, res);
  
    const addedContact = await Contact.create({...req.body, owner: _id});
    res.json({addedContact, status: 201 });
  } catch (error) {
        next(error);
    }
};

module.exports = {
    add
};