const { model, Schema } = require('mongoose');
const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    messages: [{ type: Schema.Types.ObjectId, ref: 'Msg' }],
  },
  { timestamps: { createdAt: 'created_at' } }
);
roomSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtual fields are serialised.
roomSchema.set('toJSON', {
  virtuals: true,
});

module.exports = model('Room', roomSchema);
