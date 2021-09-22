const { model, Schema } = require('mongoose');
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);
module.exports = model('User', userSchema);
