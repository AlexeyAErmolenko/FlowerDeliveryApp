import { model, Schema } from 'mongoose';

const cartSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for cart'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Set price for cart'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: false,
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    shopId: {
      type: Schema.Types.ObjectId,
      ref: 'shops',
    },
    photo: {
      type: String,
      default:
        'https://res.cloudinary.com/dserfv7z4/image/upload/v1756749931/shablon',
    },
  },
  {
    versionKey: false,
    timestamps: false,
  },
);

export default model('Cart', cartSchema);
