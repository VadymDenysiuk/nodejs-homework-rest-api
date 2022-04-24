const {Contact} = require('../../models/contact')
const CreateError = require("http-errors");

const getById = async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const contact = await Contact.findById(contactId);
    
    if(!contact) {
      throw new CreateError(404, "Not found");
    }
    res.json({contact, status: 200 })
    } catch (error) {
        if(error.message.includes("Cast to ObjectId failed")){
          error.status = 404;
          error.message = 'Not found'
    }
      next(error)
    // Ищет функцию с 4 параметрами (Находит в app)
    }
    // const {contactId} = req.params;
    // const contact = await Contact.findById(contactId);
  
    // if(!contact) {
    //   res.json({message: 'Not found', status: 404 })
    //   return;
    // }
  
    // res.json({contact, status: 200 })
}

module.exports = {
    getById
}


