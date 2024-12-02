const router = require("express").Router()

const {
    getProduct,
    getOneProduct,
    saveProduct,
    editProduct,
    deleteProduct,
    filterProducts
} = require("../controllers/product.Controller")

const verifyToken = require("../middlewares/verifyToken")


router.get('/products/search', verifyToken, filterProducts)
router.post('/products', verifyToken, saveProduct)
router.put('/products/:_id', verifyToken, editProduct)
router.delete('/products/:_id', verifyToken, deleteProduct)
router.get('/products', verifyToken, getProduct)
router.get('/products/:_id', verifyToken, getOneProduct)





module.exports = router