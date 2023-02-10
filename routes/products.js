const { Router } = require("express");
const route = Router();

const express = require("express");

route.use(express.json());
route.use(express.urlencoded({extended: true}));

const Product = require("../models/product");
const Category = require("../models/category");
const Company = require("../models/company");

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

route.get("/fetchCategory", async (req, res, next) => {
    try{
        Category.find({}, (err, data)=>{
            if(err)console.log(err);
            else res.status(200).send(data);
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/makeCategories/:categ", async (req, res, next) => {
    try{    
        const category = req.params.categ;

        const newCateg = { name: category }
        await Category.create(newCateg);
        res.send("Successful");
    }
    catch(err){
        console.log(err);
        next(err);
    }
});


route.get("/makeCompany/:company", async (req, res, next) => {
    try{
        const company = req.params.company;

        const newCompany = { name: company };
        await Company.create(newCompany);
        res.send("Successful");
    }
    catch(err){
        console.log(err);
        next(err);
    }
});

route.get("/getCompany", async (req, res, next) => {
    try{
        Company.find({}, (err, data)=>{
            if(err)console.log(err);
            else res.status(200).send(data);
        })
    }
    catch(err){
        console.log(err);
        next(err);
    }
})




module.exports = route;