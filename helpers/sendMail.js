const sgMail = require('@sendgrid/mail')
const dotenv = require('dotenv')

dotenv.config();

const {SENDGRID_API_KEY} = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendMail = async(data) => {
  const email = {...data, from: '80970410371q@gmail.com'};
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  sendMail,
}