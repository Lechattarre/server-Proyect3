const router = require("express").Router()


const { verify } = require("jsonwebtoken")
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
router.put('/products/:id', verifyToken, editProduct)
router.delete('/products/:id', verifyToken, deleteProduct)
router.get('/products', verifyToken, getProduct)
router.get('/products/:id', verifyToken, getOneProduct)





module.exports = router