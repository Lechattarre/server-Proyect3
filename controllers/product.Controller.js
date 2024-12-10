const Product = require("../models/Product.model");
const mongoose = require('mongoose')


const filterProducts = (req, res, next) => {
    const { category, subcategory, company, minPrice, maxPrice } = req.query;
    const filters = {};

    if (category) filters.category = category;
    if (subcategory) filters.subcategory = subcategory;
    if (company) filters.company = company;
    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    Product.find(filters)
        .then(products => {
            if (!products.length) {
                return res.status(404).json({ message: "No se encontraron productos" });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsPrice = (req, res, next) => {
    const { minPrice, maxPrice } = req.query;
    const filters = {};

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    Product.find(filters)
        .then(products => {
            if (!products.length) {
                return res.status(404).json({ message: "No se encontraron productos con ese rango de precio" });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsByCategory = (req, res, next) => {
    const { category } = req.query;
    const filters = category ? { category } : {};

    Product.find(filters)
        .then(products => {
            if (!products.length) {
                return res.status(404).json({ message: "No se encontraron productos en esa categoría" });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsBySubCategory = (req, res, next) => {
    const { subcategory } = req.query;
    const filters = subcategory ? { subcategory } : {};

    Product.find(filters)
        .then(products => {
            if (!products.length) {
                return res.status(404).json({ message: "No se encontraron productos en esa subcategoría" });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsByCompany = (req, res, next) => {
    const { company } = req.query;
    const filters = company ? { company } : {};

    Product.find(filters)
        .then(products => {
            if (!products.length) {
                return res.status(404).json({ message: "No se encontraron productos de esa empresa" });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const getProduct = (req, res, next) => {
    Product.find()
        .then(products => res.json(products))
        .catch(err => next(err));
};

const getOneProduct = (req, res, next) => {
    const { id } = req.params;

    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: "Producto no encontrado" });
            }
            res.json(product);
        })
        .catch(err => next(err));
};

const saveProduct = (req, res, next) => {
    const { name, description, price, stock, category, subcategory, specs, cover, company } = req.body;

    if (!name || !price || !stock || !category) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    Product.create({ name, description, price, stock, category, subcategory, specs, cover, company })
        .then(product => res.status(201).json(product))
        .catch(err => next(err));
};

const editProduct = (req, res, next) => {
    const { id } = req.params;
    const { name, description, price, stock, category, subcategory, company } = req.body;

    Product.findByIdAndUpdate(id, { name, description, price, stock, category, subcategory, company }, { new: true })
        .then(product => res.json(product))
        .catch(err => next(err));
};

const deleteProduct = (req, res, next) => {
    const { id } = req.params;


    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ message: "id not valid ;)" })
        return
    }

    Product
        .findByIdAndDelete(id)
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const categoryfilter = (res, req, next) => {
    const { category } = req.query
    const filter = {}

    if (category) {
        filter.category = category
    }
    Product
        .find(filter)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'products not found' });
            }
            res.status(200).json(products);
        })
        .catch(err => next(err))
}

const subCategoryfilter = (res, req, next) => {
    const { subcategory } = req.query
    const filter = {}

    if (subcategory) {
        filter.subcategory = subcategory
    }
    Product
        .find(filter)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'products not found' });
            }
            res.status(200).json(products);
        })
        .catch(err => next(err))
}

const companyfilter = (req, res, next) => {
    const { id: company } = req.query;

    const filter = { company };

    Product.find(filter)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'Products not found' });
            }
            res.status(200).json(products);
        })
        .catch(err => next(err));
};

module.exports = {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    categoryfilter,
    subCategoryfilter,
    companyfilter,
    filterProducts,
    filterProductsPrice,
    filterProductsByCategory,
    filterProductsBySubCategory,
    filterProductsByCompany
};
