import Property from "../models/property.models.js";

export const addProperty = async (req, res, next) => {
  try {

    const { title, description, price, location, property_type, beds, bathrooms, bedrooms, features, imageUrl,ownerName,ownerContact } = req.body;

    if (!Array.isArray(imageUrl) || imageUrl.length === 0) {
      return res.status(400).json({ error: "Images should be a non-empty array of URLs." });
    }

    const property = await Property.create({
      title,
      description,
      price,
      location,
      property_type,
      beds,
      bathrooms,
      bedrooms,
      features,
      imageUrl,
      ownerName,
      ownerContact,
    });

    return res.status(201).json(property);
  } catch (error) {
    console.error("Error adding property:", error);
    next(error);
  }
};

export const getProperty = async (req,res,next) => {
  try{
    const id = req.params.id;
  const property = await Property.find({_id:id});
  res.status(200).json(property);

  }
  catch(error){
    next(error);
  }
}

export const getProperties = async (req, res, next) => {
  try {
    const searchTerm = req.query.search;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const features = req.query.features ? req.query.features.split(",") : [];
    const bedrooms = req.query.bedrooms ? parseInt(req.query.bedrooms) : null;
    const bathrooms = req.query.bathrooms ? parseInt(req.query.bathrooms) : null;
    const beds = req.query.beds ? parseInt(req.query.beds) : null;
    const sortOption = req.query.sort || "newest"; // Default sorting is "new to old"

    let query = {};
    
    // Search filter
    if (searchTerm) {
      query.$or = [
        { title: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
        { location: { $regex: searchTerm, $options: "i" } },
        { property_type: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Feature filter
    if (features.length > 0) {
      query.features = { $in: features };
    }

    // Bedrooms, Bathrooms, Beds filter
    if (bedrooms !== null) query.bedrooms = bedrooms;
    if (bathrooms !== null) query.bathrooms = bathrooms;
    if (beds !== null) query.beds = beds;

    // Sorting Logic
    let sortQuery = {};
    if (sortOption === "price_high") {
      sortQuery.price = -1; // Highest price first
    } else if (sortOption === "price_low") {
      sortQuery.price = 1; // Lowest price first
    } else if (sortOption === "newest") {
      sortQuery.createdAt = -1; // Newest first
    } else if (sortOption === "oldest") {
      sortQuery.createdAt = 1; // Oldest first
    }

    const total = await Property.countDocuments(query);
    const properties = await Property.find(query).sort(sortQuery).skip(skip).limit(limit);

    res.status(200).json({
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: properties,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req,res,next) => {
  try{
    const id = req.params.id;
    await Property.findByIdAndDelete(id);
    res.status(200).json({message:"Property Deleted Successfully"});
  }
  catch(error){
    next(error);
  }
}

