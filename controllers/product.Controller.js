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
    const { _id: productId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        return res.status(404).json({ message: "ID not valid ;)" });
    }

    Product
        .findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            res.json(product);
        })
        .catch(err => next(err));
};


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
        brand
    } = req.body;

    const { _id: company } = req.payload;

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
    const { _id: productId } = req.params


    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }


    Product
        .findByIdAndUpdate(productId, { name, description, cover, price, stock, specs, category, subcategory, brand, company }, { new: true }, { runValidators: true })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const deleteProduct = (req, res, next) => {

    const { _id: productId } = req.params

    if (!mongoose.Types.ObjectId.isValid(productId)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Product
        .findByIdAndDelete(productId)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const filterProducts = (req, res, next) => {
    console.log('Query recibida:', req.query);

    Product
        .find(req.query)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }
            res.json(product);
        })
        .catch(err => next(err));
};




module.exports = {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts
}