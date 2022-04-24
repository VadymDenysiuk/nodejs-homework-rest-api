const {Contact} = require('../../models/contact')

const getAll = async (req, res, next) => {
  try {
    const {_id} = req.user;
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({owner: _id}, '', {skip, limit: Number(limit)}).populate('owner', '_id name email')
    res.json({contacts, status: 200})
  } catch (error) {
    next(error)
  }
};

module.exports = {
    getAll
}