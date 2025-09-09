import { model, Schema } from 'mongoose';

const orderSchema = new Schema(
  {
    cartOrder: [
      {
        nameCart: {
          type: String,
          required: [true, 'Set nameCart for order'],
          trim: true,
          minlength: 3,
          maxlength: 30,
        },
        countCart: {
          type: Number,
          default: 1,
        },
      },
    ],
    addressOrder: {
      type: String,
      required: [true, 'Set address for order'],
      trim: true,
      minlength: 3,
      maxlength: 150,
    },
    emailOrder: {
      type: String,
      required: [true, 'Set email for order'],
      trim: true,
      lowercase: true,
    },
    phoneOrder: {
      type: String,
      required: [true, 'Set phone number for order'],
      minlength: 10,
      maxlength: 15,
      trim: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export default model('Order', orderSchema);
