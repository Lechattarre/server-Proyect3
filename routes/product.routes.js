const router = require("express").Router();

const {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProductsPrice,
    filterProductsByCategory,
    filterProductsBySubCategory,
    filterProductsByCompany,
    filterProducts
} = require("../controllers/product.Controller");

const verifyToken = require("../middlewares/verifyToken");

router.get('/products', verifyToken, filterProducts)
router.get('/products/price', verifyToken, filterProductsPrice)
router.get('/products/category', verifyToken, categoryfilter)
router.get('/products/subcategory', verifyToken, subCategoryfilter)
router.get('/products/company', verifyToken, companyfilter);
router.get('/products', verifyToken, filterProducts);

router.get('/products/price', verifyToken, filterProductsPrice);

router.get('/products/category', verifyToken, filterProductsByCategory);

router.get('/products/subcategory', verifyToken, filterProductsBySubCategory);

router.get('/products/company', verifyToken, filterProductsByCompany);

router.get('/products/:id', verifyToken, getOneProduct);

router.post('/products', verifyToken, saveProduct);

router.put('/products/:id', verifyToken, editProduct);

router.delete('/products/:id', verifyToken, deleteProduct);

router.get('/products/all', verifyToken, getProduct);

module.exports = router;