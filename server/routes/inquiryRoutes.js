import express from 'express';
import { Inquiry } from '../models/Inquiry.js';

const router = express.Router();

// Create new contact / property inquiry
router.post('/', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted successfully', inquiry });
  } catch (err) {
    res.status(400).json({ message: 'Error submitting inquiry', error: err.message });
  }
});

// Get all inquiries (admin)
router.get('/', async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 });
    res.json(inquiries);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching inquiries', error: err.message });
  }
});

export default router;
