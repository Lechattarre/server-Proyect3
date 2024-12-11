const { Schema, model } = require("mongoose");

const cartSchema = new Schema(
    {
        user: { 
            type: Schema.Types.ObjectId, 
            ref: 'User', 
            required: true },
        items: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true
                },
                quantity:
                    { type: Number, required: true, default: 1 }
            }
        ],
        status: {
            type: String,
            enum: ['pending', 'finished'],
            default: 'pending'
        },
        isPriceValid: { type: Number, default: 1.0 },
        isTotalValid: { type: Number, default: 1.0 },
        total: { type: Number, required: true, default: 0.0 }
    },
    {
        timestamps: true
    }
);

const Cart = model("Cart", cartSchema);

module.exports = Cart;
