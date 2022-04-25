const fs = require("fs/promises")
const path  = require("path")
const { User } = require("../../models/user")
const Jimp = require('jimp');

const avatarsDir = path.join(__dirname, '../../', 'public', 'avatars')

const updateAvatar = async(req, res, next) => {
  const {path: tempUpload, originalname} = req.file;
  const {_id: id} = req.user;
  const imageName = `${id}_${originalname}`
  Jimp.read(tempUpload, (err, image) => {
    if (err) throw err;
    image
      .resize(250, 250)
  });
  try {
    const resultUpload = path.join(avatarsDir, imageName)
    
    await fs.rename(tempUpload, resultUpload)
    const avatarUrl = path.join('public', 'avatars', imageName)
    await User.findByIdAndUpdate(req.user._id, {avatarUrl});
    res.json({avatarUrl})
  } catch (error) {
    await fs.unlink(tempUpload)
    next(error)
  }
}

module.exports = {
  updateAvatar
}