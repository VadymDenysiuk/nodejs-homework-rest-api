const { User } = require('../../models/user')
const { joiSchema } = require('../../models/user')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const { validation } = require('../../middlewares/validation');

const register = async(req, res, next) => {
  try {
    const {subscription, email, password} = req.body;
    const validationResult = joiSchema.validate(req.body);
    
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    validation(validationResult, res)
  
    const user = await User.findOne({email})
    if(user) {
      res.status(409).json({
        message: "Email in use"
      })
    }
    const avatarUrl = gravatar.url(email);
    await User.create({subscription, email, password: hashPassword, avatarUrl})

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarUrl
      }
    })
    } catch (error) {
      next(error)
    }
}

module.exports = {
  register
}