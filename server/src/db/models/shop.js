import { model, Schema } from 'mongoose';

const shopSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for shop'],
      trim: true,
      minlength: 3,
      maxlength: 30,
    },
    address: {
      type: String,
      required: [true, 'Set address for shop'],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    website: {
      type: String,
      required: [true, 'Set website for shop'],
      minlength: 6,
      maxlength: 150,
    },
  },
  {
    timestamps: false,
    versionKey: false,
  },
);

export default model('Shop', shopSchema);
