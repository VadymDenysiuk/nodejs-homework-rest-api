const {Contact} = require('../../models/contact')
const CreateError = require("http-errors");

const remove = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const removedContact = await Contact.findByIdAndDelete(contactId)

    
    if(!removedContact) {
      throw new CreateError(404, "Not found");
    }
    res.json({ message: "contact deleted", status: 200 })
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
    remove
}