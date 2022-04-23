const {Contact, favoriteJoiSchema} = require('../../models/contact');
const CreateError = require("http-errors");
const { validation } = require('../../middlewares/validation');

const updateFavorite = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {favorite} = req.body;

    const validationResult = favoriteJoiSchema.validate({favorite})
    validation(validationResult, res)
    
    const updatedFavorite = await Contact.findByIdAndUpdate(contactId, {favorite}, {new: true})
    
    if(!updatedFavorite) {
      throw new CreateError(404, "Not found");
    }
    res.json({ updatedFavorite, status: 200 })
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
  updateFavorite
}