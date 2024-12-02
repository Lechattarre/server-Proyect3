const { Schema, model } = require("mongoose")

const cartSchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        },
        products: [
            {
                product: {
                    type: Schema.Types.ObjectId,
                    ref: 'Product'
                },
                quantity: {
                    type: Number
                }
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