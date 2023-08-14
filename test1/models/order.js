import mongoose from 'mongoose';
const { Schema, model } = mongoose;
const orderSchema = new Schema(
    {

        status: {
            type: String,
            required: true
        },
        items: [{id: String,
            name: String,
            price : String,
            product : String,
            quantity : String,}],
        clientId: {
            type: mongoose.Types.ObjectId,
            ref: "Users"
        },
        total: {
            type: Number,
            required: true
        },
        commande:{
            type: mongoose.Types.ObjectId,
            ref: "Commandes"
        }
    },
    {
        timestamps: true
    }
);

export default model('orders', orderSchema);