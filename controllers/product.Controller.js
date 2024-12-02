const mongoose = require('mongoose')

const Product = require('./../models/Product.model')

const getProduct = (req, res, next) => {
    Product
        .find()
        // .select({})
        .then(products => res.json(products))
        .catch(err => next(err))
}

const getOneProduct = (req, res, next) => {

    const { id: productId } = req.params

    if (!mongoose.types.ObjectId.isValid(productId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Product
        .find(productId)
        // .select({})
        .then(products => res.json(products))
        .catch(err => next(err))
}

const saveProduct = (req, res, next) => {
    const {
        name,
        description,
        cover,
        price,
        stock,
        specs,
        category,
        subcategory,
        brand,
        company
    } = req.body;

    const { _id: owner } = req.payload;

    if (!name || !price || !stock || !category) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    Product.create({
        name,
        description,
        cover,
        price,
        stock,
        specs,
        category,
        subcategory,
        brand,
        company,
        owner
    })
        .then(product => res.status(201).json(product))
        .catch(err => {
            console.error("Error al guardar el producto:", err);
            next(err);
        });
};

const editProduct = (req, res, next) => {
    const { name,
        description,
        cover,
        price,
        stock,
        specs,
        category,
        subcategory,
        brand,
        company } = req.body
    const { id: productId } = req.params


    if (!mongoose.types.ObjectId.isValid(productId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }


    Product
        .findByIdAndUpdate(productId, { name, description, cover, price, stock, specs, category, subcategory, brand, company }, { runValidators: true })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteProduct = (req, res, next) => {

    const { id: productId } = req.params

    if (!mongoose.types.ObjectId.isValid(productId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Product
        .findByIdAndDelete(productId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterProducts = (req, res, next) => {
    Product
        .find(req.query)
        .then(products => res.json(products))
        .catch(err => next(err))
}

module.exports = {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts
}