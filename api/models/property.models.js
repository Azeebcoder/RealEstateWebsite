import mongoose from "mongoose";

const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  property_type: { type: String, required: true },
  beds: { type: Number},
  bathrooms:{ type: Number},
  bedrooms:{ type: Number},
  features: [{ type: String }],
  imageUrl: [{ type: String }],
  ownerName: { type: String },
  ownerContact: { type: String },
}, { timestamps: true });

const Property = mongoose.model("Property", propertySchema);
export default Property;
