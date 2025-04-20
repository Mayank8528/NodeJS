const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/MenuItem');

// POST: Add menu item
router.post('/', async (req, res) => {
  try {
    const data2 = req.body;
    const MenuItem2 = new MenuItem(data2);
    const response2 = await MenuItem2.save();
    console.log('Data Saved');
    res.status(200).json(response2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// GET: Get all menu items
router.get('/', async (req, res) => {
  try {
    const data2 = await MenuItem.find();
    console.log('Data Fetched');
    res.status(200).json(data2);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// ✅ NEW: GET by taste
router.get('/:taste', async (req, res) => {
  try {
    const tasteParam = req.params.taste;
    const filteredItems = await MenuItem.find({ taste: tasteParam });
    if (filteredItems.length === 0) {
      return res.status(404).json({ message: 'No items found with that taste.' });
    }
    res.status(200).json(filteredItems);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
