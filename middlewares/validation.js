const validation = (validationResult, res) => {
  if(validationResult.error) {
    return res.status(400).json({ message: validationResult.error.message})
  }
}

module.exports = {
  validation,
}