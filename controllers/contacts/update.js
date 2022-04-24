const {Contact, joiSchema} = require('../../models/contact')
const CreateError = require("http-errors");
const { validation } = require('../../middlewares/validation');

const update = async (req, res, next) => {
  try {
  const {contactId} = req.params;
  const validationResult = joiSchema.validate(req.body)
  validation(validationResult, res)

  const updatedContact = await Contact.findByIdAndUpdate(contactId, req.body, {new: true})
  
  if(!updatedContact) {
    throw new CreateError(404, "Not found");
  }
  res.json({ updatedContact, status: 200 })
  } catch (error) {
      if(error.message.includes("Cast to ObjectId failed")){
        error.status = 404;
        error.message = 'Not found'
  }
    next(error)
  // Ищет функцию с 4 параметрами (Находит в app)
  }   
}

module.exports = {
  update
}