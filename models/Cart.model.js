const { Schema, model } = require("mongoose")

const cartSchema = new Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        items: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
                quantity: { type: Number, required: true, default: 1 }
            }
        ],
        status: {
            type: String,
            enum: ['pending, finished']
        }
    },
    {
        timestamps: true
    }
)

const Cart = model("Cart", cartSchema)

module.exports = Cart