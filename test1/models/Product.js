
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

var productSchema = new Schema(
    {
        name: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        status: {
            type: String,
            required: true
        },
        ownedBy:{
            type: mongoose.Types.ObjectId,
            ref: "Users"
        }
    },
    {
        timestamps: true
    }
);

export default model('Products', productSchema);