const router = require("express").Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
    getCartByCompany
} = require("../controllers/cart.controller");

const verifyToken = require("../middlewares/verifyToken");

router.get('/cart', verifyToken, getCart);
router.get('/cart/company/:companyId', verifyToken, getCartByCompany);
router.post('/cart', verifyToken, addToCart);
router.delete('/cart/:productId', verifyToken, removeFromCart);
router.delete('/cart', verifyToken, clearCart);

module.exports = router;