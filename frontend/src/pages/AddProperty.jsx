import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PropertyForm = () => {
  const navigate = useNavigate();
  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
    property_type: "Residential",
    beds: "",
    bathrooms: "",
    bedrooms: "",
    features: [],
    imageUrl: [],
    ownerName: "",
    ownerContact: "",
  });
  const [selectedImages, setSelectedImages] = useState([]);
  const [uploading, setUploading] = useState(false);

  const propertyTypes = [
    "Buy",
    "Rent",
    "Commercial",
    "Residential",
    "Land",
    "Villa",
    "Apartment",
    "House",
    "Office",
    "Shop",
    "Warehouse",
  ];
  const featuresList = [
    "Wifi",
    "Parking",
    "Garden",
    "Swimming Pool",
    "Security",
    "Balcony",
    "Gym",
    "Furnished",
    "Garage",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPropertyData({ ...propertyData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setPropertyData((prevState) => {
      return {
        ...prevState,
        features: checked
          ? [...prevState.features, value]
          : prevState.features.filter((f) => f !== value),
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const handleImageUpload = async () => {
    if (selectedImages.length === 0) {
      alert("Please select images first!");
      return;
    }
    setUploading(true);
    const uploadedImages = await Promise.all(
      selectedImages.map(async (file) => {
        const imageData = new FormData();
        imageData.append("image", file);

        try {
          const response = await fetch(
            `https://api.imgbb.com/1/upload?key=${
              import.meta.env.VITE_APP_IMGBB_API_KEY
            }`,
            {
              method: "POST",
              body: imageData,
            }
          );
          const data = await response.json();
          return data.data.url;
        } catch (error) {
          console.error("Image upload error:", error);
          return null;
        }
      })
    );

    const validImages = uploadedImages.filter((url) => url !== null);
    if (validImages.length > 0) {
      setPropertyData((prev) => ({ ...prev, imageUrl: validImages }));
    }
    setUploading(false);
    setSelectedImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://realestatewebsite-eix3.onrender.com/api/property/add",
        propertyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Property Submitted Successfully:", response.data);
      alert("Property added successfully!");
      setPropertyData({
        title: "",
        description: "",
        price: "",
        location: "",
        property_type: "Residential",
        beds: "",
        bathrooms: "",
        bedrooms: "",
        features: [],
        imageUrl: [],
        ownerName: "",
        ownerContact: "",
      });
      setSelectedImages([]);
      document
        .querySelectorAll("input[type='checkbox']")
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    } catch (error) {
      console.error("Error submitting property:", error);
      alert("Failed to add property.");
    }
  };

  const handleLogOut = () => {
    localStorage.removeItem("Auth");
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center">
        <button
          type="button"
          onClick={handleLogOut}
          className=" bg-red-500 text-white p-2 rounded-md hover:bg-red-600 cursor-pointer "
        >
          LogOut
        </button>
      </div>
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-center mb-4">Add Property</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="title"
            placeholder="Property Title"
            value={propertyData.title}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />
          <textarea
            name="description"
            placeholder="Description"
            value={propertyData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          ></textarea>

          <div className="flex gap-4">
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={propertyData.price}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded-md"
            />
            <input
              type="number"
              name="beds"
              placeholder="Beds"
              value={propertyData.beds}
              onChange={handleChange}
              required
              className="w-1/2 p-2 border rounded-md"
            />
          </div>

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={propertyData.location}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          />

          <select
            name="property_type"
            onChange={handleChange}
            required
            className="w-full p-2 border rounded-md"
          >
            {propertyTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="bedrooms"
            placeholder="Bedrooms"
            value={propertyData.bedrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="number"
            name="bathrooms"
            placeholder="Bathrooms"
            value={propertyData.bathrooms}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />

          <div>
            <p className="font-semibold">Features:</p>
            {featuresList.map((feature) => (
              <label key={feature} className="flex items-center">
                <input
                  type="checkbox"
                  value={feature}
                  onChange={handleCheckboxChange}
                  className="mr-2"
                  selected={!propertyData.features.includes(feature)}
                />
                {feature}
              </label>
            ))}
          </div>

          {selectedImages.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-2">
              {selectedImages.map((file, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="w-24 h-24 object-cover rounded-md"
                />
              ))}
            </div>
          )}

          <div className="flex space-x-2">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded-md"
            />
            <button
              type="button"
              onClick={handleImageUpload}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 cursor-pointer"
            >
              {uploading ? "Uploading..." : "Upload Images"}
            </button>
          </div>

          <input
            type="text"
            name="ownerName"
            placeholder="Owner Name (optional)"
            value={propertyData.ownerName}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />
          <input
            type="text"
            name="ownerContact"
            placeholder="Owner Contact (optional)"
            value={propertyData.ownerContact}
            onChange={handleChange}
            className="w-full p-2 border rounded-md"
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 cursor-pointer"
          >
            Upload Property
          </button>
        </form>
      </div>
    </>
  );
};

export default PropertyForm;
