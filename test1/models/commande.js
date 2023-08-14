
import mongoose from 'mongoose';
const { Schema, model } = mongoose;
import Products from './Product.js';
const commandeSchema = new Schema(
    {
        items: [{id: String,
            name: String,
            price : String,
            product : String,
            quantity : String,}],
        clientId: {
            type: String,
            required: true
        },
        total: {
            type: Number,
            required: true
        },

    },
    {
        timestamps: true
    }
);

export default model('Commandes', commandeSchema);