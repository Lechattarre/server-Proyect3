const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                },
                quantity: {
                    type: Number,
                    default: 1
                },
                price: {
                    type: Number,
                }
            }
        ],
        status: {
            type: String,
            enum: ['active', 'pending', 'finished'],
            default: 'active'
        },
    },
    {
        timestamps: true
    }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
