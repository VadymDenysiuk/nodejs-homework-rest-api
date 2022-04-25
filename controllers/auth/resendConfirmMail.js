const { User } = require("../../models/user");
const { joiSchema } = require('../../models/user')
const { validation } = require('../../middlewares/validation');
const { sendMail } = require('../../helpers/sendMail');

const resendConfirmMail = async(req, res, next) => {
  try {
    const validationResult = joiSchema.validate(req.body);
    validation(validationResult, res)
    
    const {email} = req.body;
    const user = await User.findOne({email});
    if(user.verify){
        res.status(400).json({
          message: "Verification has already been passed"
        })
    }
    const mail = {
        to: email,
        subject: "Confirm email",
        html: `<a target="_blank" href='http://localhost:3000/api/users/${user.verificationToken}'>Confirm your mail</a>`
    }
    sendMail(mail);
    res.status(200).json({
        "message": "Verification email sent"
    })
  } catch (error) {
    next(error)
  }
}

module.exports = {
  resendConfirmMail,
}