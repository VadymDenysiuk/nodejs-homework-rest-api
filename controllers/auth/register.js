const { User } = require('../../models/user')
const { joiSchema } = require('../../models/user')
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar')
const { validation } = require('../../middlewares/validation');
const {v4} = require('uuid');
const { sendMail } = require('../../helpers/sendMail');


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
    const verificationToken = v4()

    const avatarUrl = gravatar.url(email);
    await User.create({subscription, email, password: hashPassword, avatarUrl, verificationToken})
  
    const mail = {
      to: email,
      subject: 'Confirm email',
      html: `<a target='_blanc' href='http:localhost:3000/api/users/verify/${verificationToken}'>Confirm your email</a>`
    }
    await sendMail(mail)

    res.status(201).json({
      user: {
        email,
        subscription,
        avatarUrl,
        verificationToken
      }
    })
    } catch (error) {
      next(error)
    }
}

module.exports = {
  register
}