import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    type: { type: String, required: true }, // Apartment, Villa, Commercial Office, Plots, etc.
    category: { type: String, required: true, enum: ['buy', 'rent', 'commercial', 'plots'] },
    price: { type: String, required: true },
    priceNumeric: { type: Number, required: true },
    pricePerSqft: { type: String },
    location: { type: String, required: true },
    address: { type: String, required: true },
    bhk: { type: Number, default: 0 },
    bathrooms: { type: Number, default: 0 },
    area: { type: Number, required: true }, // in sq.ft
    parking: { type: Number, default: 0 },
    furnishing: { type: String, default: 'Unfurnished' },
    possession: { type: String, default: 'Ready to Move' },
    builder: { type: String },
    verified: { type: Boolean, default: true },
    featured: { type: Boolean, default: false },
    rating: { type: Number, default: 4.8 },
    reviewsCount: { type: Number, default: 0 },
    image: { type: String, required: true },
    gallery: [{ type: String }],
    description: { type: String },
    features: [{ type: String }],
    amenities: [{ type: String }],
    videoUrl: { type: String },
    tour360Url: { type: String },
    coordinates: {
      lat: { type: Number },
      lng: { type: Number }
    }
  },
  { timestamps: true }
);

export const Property = mongoose.model('Property', propertySchema);
