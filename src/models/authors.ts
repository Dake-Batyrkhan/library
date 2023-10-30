const mongoose = require('mongoose');

const authorsSchema = new mongoose.Schema(
  {
    fullname: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Authors = mongoose.model('Author', authorsSchema);
module.exports = Authors;
