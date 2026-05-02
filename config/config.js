require('dotenv').config();

module.exports = {
  PORT: process.env.PORT || 5000,
  GROQ_API_KEY: process.env.GROQ_API_KEY || 'INSERT_GROQ_API_KEY_HERE',
};
