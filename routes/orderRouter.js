// routes/orderRouter.js
const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create a new order
router.post('/orders', async (req, res) => {
  try {
    const { username, items, totalAmount, paymentMethod, address, phoneNumber } = req.body;

    // Validate required fields
    if (!username || !items || !totalAmount || !paymentMethod || !address || !phoneNumber) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Create a new order instance
    const newOrder = new Order({
      username,
      items,
      totalAmount,
      paymentMethod,
      address,
      phoneNumber,
    });

    console.log('New order:', newOrder);

    // Save the order to the database
    const savedOrder = await newOrder.save();

    res.status(201).json({ message: 'Order saved successfully', order: savedOrder });
  } catch (error) {
    console.error('Error saving order:', error);
    res.status(500).json({ error: 'Failed to save the order' });
  }
});

// Get all orders (for reference or admin panel)
router.get('/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

module.exports = router;
