const router = require("express").Router();

const {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
} = require("../controllers/cart.controller");

const verifyToken = require("../middlewares/verifyToken");

router.get('/cart', verifyToken, getCart);
router.post('/cart', verifyToken, addToCart);
router.delete('/cart/:productId', verifyToken, removeFromCart);
router.delete('/cart', verifyToken, clearCart);

module.exports = router;
