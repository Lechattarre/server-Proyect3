const router = require("express").Router()

const {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts,
    filterProductsByPrice,
    filterProductsByCategory,
    filterProductsByCategoryAndPrice,
    companyfilter,
    subCategoryfilter
} = require("../controllers/product.Controller")

const verifyToken = require("../middlewares/verifyToken")

router.get('/products', verifyToken, filterProducts)
router.get('/products/category', filterProductsByCategory);
router.get('/products/price', filterProductsByPrice);
router.get('/products/filter', filterProductsByCategoryAndPrice);
router.get('/products/subcategory', verifyToken, subCategoryfilter)
router.get('/products/company', verifyToken, companyfilter)

router.post('/products', verifyToken, saveProduct)
router.put('/products/:_id', verifyToken, editProduct)
router.delete('/products/:_id', verifyToken, deleteProduct)

router.get('/products/all', verifyToken, getProduct)
router.get('/products/details/:_id', verifyToken, getOneProduct)

module.exports = router
