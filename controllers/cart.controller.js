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

        const cart = await Cart.findOne({ user: userId }).populate('items.product');

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

const getCartByCompany = async (req, res) => {
    try {
        const { companyId } = req.params;

        const carts = await Cart.find({})
            .populate('items.product') // Populamos productos para acceder a la información completa
            .populate('user', 'firstName lastName'); // Populamos usuario para obtener su nombre

        if (!carts || carts.length === 0) {
            return res.status(404).json({ message: 'No hay carritos disponibles' });
        }

        const filteredCarts = carts.flatMap(cart => {
            const companyProducts = cart.items
                .filter(item => item.product.company.toString() === companyId)
                .map(item => ({
                    cartId: cart._id, // Incluimos el ID del carrito
                    userName: `${cart.user.firstName} ${cart.user.lastName}`,
                    productName: item.product.name,
                    productCategory: item.product.category,
                    price: item.product.price, // Usamos el precio del producto
                    quantity: item.quantity,
                    total: item.product.price * item.quantity, // Calculamos el total
                    createdAt: cart.createdAt,
                    updatedAt: cart.updatedAt
                }));

            return companyProducts.length > 0 ? companyProducts : [];
        });

        if (filteredCarts.length === 0) {
            return res.status(404).json({ message: 'No se encontraron productos para esta compañía' });
        }

        filteredCarts.sort((a, b) => {
            if (a.userName < b.userName) return -1;
            if (a.userName > b.userName) return 1;
            return a.productName.localeCompare(b.productName);
        });

        res.status(200).json(filteredCarts);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener los carritos' });
    }
};


module.exports = {
    addToCart,
    getCart,
    removeFromCart,
    clearCart,
    getCartByCompany
};
