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
    console.log('Query recibida:', req.query)

    Product
        .find(req.query)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' })
            }
            res.json(product)
        })
        .catch(err => next(err))
}



const filterProductsPrice = (req, res, next) => {

    const { minPrice, maxPrice } = req.query
    const filters = {}

    if (minPrice || maxPrice) {
        filters.price = {}
        if (minPrice) filters.price.$gte = parseFloat(minPrice)
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice)
    }

    Product
        .find(filters)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'products not found' })
            }

            res.json(products)
        })
        .catch(err => next(err))

}


const filterProductsByCategory = (req, res, next) => {
    const { category } = req.query;

    if (!category) {
        return res.status(400).json({ message: 'Se debe proporcionar una categoría.' });
    }

    Product.find({ category: new RegExp(category, 'i') })
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos en esta categoría.' });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsByPrice = (req, res, next) => {
    const { minPrice, maxPrice } = req.query;

    if (!minPrice && !maxPrice) {
        return res.status(400).json({ message: 'Se debe proporcionar al menos un valor de precio.' });
    }

    const filters = {};
    if (minPrice) filters.price = { $gte: parseFloat(minPrice) };
    if (maxPrice) filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };

    Product.find(filters)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos en este rango de precios.' });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

const filterProductsByCategoryAndPrice = (req, res, next) => {
    const { category, minPrice, maxPrice } = req.query;

    const filters = {};

    if (category) {
        filters.category = new RegExp(category, 'i');
    }

    if (minPrice || maxPrice) {
        filters.price = {};
        if (minPrice) filters.price.$gte = parseFloat(minPrice);
        if (maxPrice) filters.price.$lte = parseFloat(maxPrice);
    }

    Product.find(filters)
        .then(products => {
            if (products.length === 0) {
                return res.status(404).json({ message: 'No se encontraron productos con los filtros aplicados.' });
            }
            res.json(products);
        })
        .catch(err => next(err));
};

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
                return res.status(404).json({ message: 'products not found' })
            }
            res.status(200).json(products)
        })
        .catch(err => next(err))
}
const companyfilter = (res, req, next) => {
    const { company } = req.query
    const filter = {}

    if (company) {
        filter.company = company
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

module.exports = {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts,
    filterProductsByPrice,
    filterProductsByCategory,
    filterProductsByCategoryAndPrice,
    subCategoryfilter,
    companyfilter
}