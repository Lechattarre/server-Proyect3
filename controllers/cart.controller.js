const Cart = require('../models/Cart.model');
const addToCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId, quantity } = req.body;

        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({ user: userId, items: [] });
        }

        const existingItem = cart.items.find(item => item.product.toString() === productId);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();

        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar producto al carrito' });
    }
};

const getCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId }).populate('items.product'); // Populamos para traer info del producto

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

const removeFromCart = async (req, res) => {
    try {
        const userId = req.user._id;
        const { productId } = req.params;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.items = cart.items.filter(item => item.product.toString() !== productId);

        await cart.save();

        res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al eliminar producto del carrito' });
    }
};

const clearCart = async (req, res) => {
    try {
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Carrito no encontrado' });
        }

        cart.items = [];

        await cart.save();

        res.status(200).json({ message: 'Carrito vaciado', cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al vaciar el carrito' });
    }
};

module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart
};
