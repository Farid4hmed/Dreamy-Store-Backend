const { Router } = require("express");
const route = Router();

const express = require("express");

route.use(express.json());
route.use(express.urlencoded({extended: true}));

const Product = require("../models/product");

route.post("/add", async (req, res, next) => {
    try{
        const name = req.body.name;
        const desc = req.body.desc;
        const sku = req.body.sku;
        const imgUrls = req.body.imgUrls;
        const reviews = req.body.reviews;
        const stars = req.body.stars;
        const available = req.body.available;
        const category = req.body.category;
        const company = req.body.company;
        const colors = req.body.colors;
        const price = req.body.price;
        const freeShipping = req.body.freeShipping;

        const newProduct = {
            name: name,
            desc: desc,
            sku: sku,
            imgUrls: imgUrls,
            customerRevs: reviews,
            stars: stars,
            available: available,
            category: category,
            company: company,
            colors: colors,
            price: price,
            freeShipping: freeShipping
        }

        const result = await Product.create(newProduct);
        if(result)res.send("Product added successfully!");
        else res.send("There were some issues.");

    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/fetch", async (req, res, next) => {
    try{
        Product.find({}, (err, data)=>{
            if(err)console.log(err);
            else {
                res.status(200).send(data);
            }
        }).sort({price: 1});
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/getColors", async (req, res, next) => {
    try{
         Product.find({}, (err, data)=>{
            if(err)console.log(err);
            else {
                let colors = new Set([]);
                data.map((product) => {
                    product.colors.map((color) => {
                        colors.add(color);
                    });
                });
                res.status(200).send([...colors]);
            }
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/maxPrice", async (req, res, next) => {
    try{
         Product.find({}, (err, data) => {
            if(err)console.log(err);
            else {
                let maxPrice = 0;
                data.map((product) => {
                    if(product.price > maxPrice)maxPrice = product.price;
                });
                res.send(maxPrice.toString());
            }
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/companies", async (req, res, next) => {
    try{
         Product.find({}, (err, data) => {
            if(err)console.log(err);
            else {
                let companies = new Set([]);
                data.map((product) => {
                    companies.add(product.company);
                });
                res.status(200).send([...companies]);
            }
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/categories", async (req, res, next) => {
    try{
        Product.find({}, (err, data) => {
            if(err)console.log(err);
            else {
                let categories = new Set([]);
                data.map((product) => {
                    categories.add(product.category);
                });

                res.status(200).send([...categories]);
            }
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
})



module.exports = route;