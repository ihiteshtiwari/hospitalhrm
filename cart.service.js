const Cart = require('./models/cart');

class CartService {
  async addToCart(userId, itemId) {
    const cart = await Cart.findOneAndUpdate(
      { userId },
      { $addToSet: { items: itemId } },
      { upsert: true, new: true }
    ).populate('items');
    return cart;
  }

  async getCartItems(userId) {
    const cart = await Cart.findOne({ userId }).populate('items');
    return cart ? cart.items : [];
  }

  async clearCart(userId) {
    const cart = await Cart.findOneAndUpdate({ userId }, { items: [] }, { new: true });
    return cart;
  }
}

module.exports = new CartService();
