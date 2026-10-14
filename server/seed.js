import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { Property } from './models/Property.js';

dotenv.config();

const sampleProperties = [
  {
    title: 'The Grand Vista Sky Residences',
    slug: 'grand-vista-sky-residences',
    type: 'Apartment',
    category: 'buy',
    price: '₹ 1.45 Cr',
    priceNumeric: 14500000,
    pricePerSqft: '₹ 7,250 / sq.ft',
    location: 'Gangapur Road',
    address: 'Serene Hills Avenue, Near Someshwar Waterfall, Gangapur Road, Nashik',
    bhk: 4,
    bathrooms: 4,
    area: 2000,
    parking: 2,
    furnishing: 'Ultra Luxury Semi-Furnished',
    possession: 'Ready to Move',
    builder: 'Karda Constructions',
    verified: true,
    featured: true,
    rating: 4.9,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Experience pinnacle luxury living at The Grand Vista. Double-height sunlit living rooms with panoramic vineyard views.',
    features: ['Panoramic Vineyard Views', 'Private Keycard Elevator', 'Smart Home Automation'],
    amenities: ['Infinity Swimming Pool', 'Rooftop Lounge', 'State of the Art Gym'],
    coordinates: { lat: 20.0084, lng: 73.7639 }
  },
  {
    title: 'Aura Signature Luxury Villa',
    slug: 'aura-signature-luxury-villa',
    type: 'Villa',
    category: 'buy',
    price: '₹ 2.85 Cr',
    priceNumeric: 28500000,
    pricePerSqft: '₹ 8,142 / sq.ft',
    location: 'Trimbak Road',
    address: 'Green Valley Enclave, Near Sula Vineyards, Trimbak Road, Nashik',
    bhk: 5,
    bathrooms: 5,
    area: 3500,
    parking: 3,
    furnishing: 'Fully Furnished Luxury Edition',
    possession: 'Ready to Move',
    builder: 'Architectural Landmark Developers',
    verified: true,
    featured: true,
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80'
    ],
    description: 'Tropical architectural villa with manicured private lawns and plunge pool.',
    features: ['Private Plunge Pool', 'Solar Power Roof Grid', 'Outdoor Firepit'],
    amenities: ['Private Heated Pool', 'Garden & Lawn', 'Solar Energy Grid'],
    coordinates: { lat: 19.9975, lng: 73.732 }
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas for seeding');
    await Property.deleteMany({});
    await Property.insertMany(sampleProperties);
    console.log('🎉 Successfully seeded properties into MongoDB Atlas!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seeding Failed:', err.message);
    process.exit(1);
  }
};

seedDB();
