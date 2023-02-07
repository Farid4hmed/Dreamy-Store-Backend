const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
    {
        name: { type:String },
        desc: { type:String },
        imgUrls: { type:Array },
        customerRevs: { type:Number },
        stars: { type:Number },
        available: { type:String },
        sku: { type:String },
        category: { type:String },
        company: { type:String },
        colors: { type:Array },
        price: { type:Number },
        freeShipping: { type:Number }
    }
);

module.exports = mongoose.model("Product", productSchema);