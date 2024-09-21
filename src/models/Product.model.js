import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
    id: {
        type: Number,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    images: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    newPrice: {
        type: Number,
        require: true
    },
    oldPrice: {
        type: Number,
        require: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    avilable: {
        type: Boolean,
        default: true
    },
    size: {
        type: String,
        enum: ["S", "M", "L", "XL"],
        require: true
    }
},
    {
        timestamps: true
    }
);

export const Product = mongoose.model("Product", productSchema);