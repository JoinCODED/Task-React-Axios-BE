const { model, Schema } = require('mongoose');
const msgSchema = new Schema(
  {
    msg: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: 'created_at' } }
);
module.exports = model('Msg', msgSchema);
