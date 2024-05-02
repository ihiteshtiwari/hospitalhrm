const express = require('express');
const router = express.Router();
const cartService = require('./cart.service');

router.post('/addToCart', async (req, res, next) => {
  const { userId, itemId } = req.body;
  try {
    const cart = await cartService.addToCart(userId, itemId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

router.get('/getCartItems/:userId', async (req, res, next) => {
  const { userId } = req.params;
  try {
    const cartItems = await cartService.getCartItems(userId);
    res.json(cartItems);
  } catch (error) {
    next(error);
  }
});

router.post('/clearCart', async (req, res, next) => {
  const { userId } = req.body;
  try {
    const cart = await cartService.clearCart(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
