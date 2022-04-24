const { User } = require('../../models/user');
const { joiSchema } = require('../../models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const { validation } = require('../../middlewares/validation');

const login = async(req, res, next) => {
  try {
    const { email, password } = req.body;
    const validationResult = joiSchema.validate(req.body);

    validation(validationResult, res)

    const user = await User.findOne({email})
    if(!user) {
      return res.status(401).json({
        message: "Email or password is wrong"
      })
    }
    const passCompare = bcrypt.compareSync(password, user.password)

    if(!passCompare) {
      return res.status(401).json({
        message: "Email or password is wrsong"
      })
    }

    const payload = {
      id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'})
    await User.findByIdAndUpdate(user._id, {token})
    res.status(200).json({
      user: {
        email,
        token
      }
    })
    } catch (error) {
      next(error)
    }
}

module.exports = {
  login
}