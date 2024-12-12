const Cart = require('../models/Cart.model');
const Product = require('../models/Product.model');
const mongoose = require('mongoose')


const addToCart = (req, res) => {
    const userId = req.user._id;
    const { productId, quantity } = req.body;

    Product.findById(productId)
        .then(product => {
            if (!product) {
                return res.status(404).json({ message: 'Producto no encontrado' });
            }

            if (product.stock < quantity) {
                return res.status(400).json({ message: `Solo hay ${product.stock} unidades disponibles` });
            }

            return Cart.findOne({ user: userId });
        })
        .then(cart => {
            if (!cart) {
                cart = new Cart({ user: userId, items: [] });
            }

            const existingItem = cart.items.find(item => item.product.toString() === productId);

            if (existingItem) {
                if (existingItem.quantity + quantity > product.stock) {
                    return res.status(400).json({ message: `No puedes agregar más de ${product.stock} unidades en total` });
                }
                existingItem.quantity += quantity;
            } else {
                cart.items.push({ product: productId, quantity });
            }

            cart.total = cart.items.reduce((sum, item) => sum + item.quantity * product.price, 0);

            return cart.save();
        })
        .then(cart => {
            res.status(200).json({ message: 'Producto agregado al carrito', cart });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al agregar producto al carrito' });
        });
};

const getCartById = (req, res) => {
    const userId = req.user._id;

    Cart.findOne({ user: userId })
        .populate('items.product')
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            const total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

            res.status(200).json({ cart, total });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al obtener el carrito' });
        });
};

const removeFromCart = (req, res) => {
    const userId = req.user._id;
    const { productId } = req.params;

    Cart.findOne({ user: userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            cart.items = cart.items.filter(item => item.product.toString() !== productId);

            cart.total = cart.items.reduce((sum, item) => sum + item.quantity * item.product.price, 0);

            return cart.save();
        })
        .then(cart => {
            res.status(200).json({ message: 'Producto eliminado del carrito', cart });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al eliminar producto del carrito' });
        });
};

const clearCart = (req, res) => {
    const userId = req.user._id;

    Cart.findOne({ user: userId })
        .then(cart => {
            if (!cart) {
                return res.status(404).json({ message: 'Carrito no encontrado' });
            }

            cart.items = [];
            cart.total = 0;

            return cart.save();
        })
        .then(cart => {
            res.status(200).json({ message: 'Carrito vaciado', cart });
        })
        .catch(error => {
            console.error(error);
            res.status(500).json({ message: 'Error al vaciar el carrito' });
        });



};
const checkoutCart = (req, res) => {
    const { cart } = req.body;
    const { _id: userId } = req.params;

    if (!cart || cart.length === 0) {
        return res.status(400).json({ message: 'El carrito está vacío' });
    }

    const newCart = new Cart({
        user: userId,
        items: cart
    });

    newCart.save()
        .then(cart => {
            res.status(201).json(cart);
        })
        .catch(err => {
            res.status(500).json({ message: 'Error al guardar el carrito', error: err });
        });
};
module.exports = {
    addToCart,
    getCartById,
    removeFromCart,
    checkoutCart,
    clearCart
};
