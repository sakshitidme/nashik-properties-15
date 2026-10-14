import express from 'express';
import { Property } from '../models/Property.js';

const router = express.Router();

// Get all properties
router.get('/', async (req, res) => {
  try {
    const { category, location, minPrice, maxPrice } = req.query;
    let query = {};
    if (category) query.category = category;
    if (location) query.location = new RegExp(location, 'i');
    if (minPrice || maxPrice) {
      query.priceNumeric = {};
      if (minPrice) query.priceNumeric.$gte = Number(minPrice);
      if (maxPrice) query.priceNumeric.$lte = Number(maxPrice);
    }
    const properties = await Property.find(query).sort({ createdAt: -1 });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching properties', error: err.message });
  }
});

// Get property by slug or id
router.get('/:idOrSlug', async (req, res) => {
  try {
    const param = req.params.idOrSlug;
    const property = await Property.findOne({
      $or: [{ _id: param.match(/^[0-9a-fA-F]{24}$/) ? param : null }, { slug: param }]
    });
    if (!property) return res.status(404).json({ message: 'Property not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching property detail', error: err.message });
  }
});

// Create new property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ message: 'Error creating property', error: err.message });
  }
});

export default router;
