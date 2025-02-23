import axios from "axios";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { useParams } from "react-router-dom";

const PropertyDetail = () => {
  const [data, setData] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://realestatewebsite-eix3.onrender.com/api/property/get/${id}`
        );
        setData(response.data[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, [id]);

  if (!data) {
    return <h1 className="text-center text-2xl font-semibold mt-10">Loading...</h1>;
  }

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;
    
    try {
      await axios.delete(`https://realestatewebsite-eix3.onrender.com/api/property/delete/${id}`);
      alert("Property Deleted Successfully");
      window.location.href = "/"; // Redirect after deletion
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  const auth = localStorage.getItem("Auth");

  return (
    <section className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6 my-10">
      
      {/* Delete Button */}
      {auth === "true" && (
        <div className="flex justify-end mb-4">
        <button 
          onClick={handleDelete} 
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition shadow-md cursor-pointer"
        >
          Delete Property
        </button>
      </div>)}

      {/* Image Carousel */}
      {data.imageUrl && Array.isArray(data.imageUrl) && (
        <div className="rounded-lg overflow-hidden">
          <Carousel
            autoPlay
            infiniteLoop
            interval={3000}
            showStatus={false}
            stopOnHover
            showThumbs={false}
            showArrows
            showIndicators={false}
          >
            {data.imageUrl.map((image, index) => (
              <div key={index} className="h-[50vh] md:h-[70vh]">
                <img
                  src={image}
                  alt="property"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </div>
      )}

      {/* Property Details */}
      <div className="p-6">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
          {data.title?.toUpperCase() || "No Title"}
        </h1>
        <p className="text-gray-600 text-center text-lg mb-6">
          {data.description || "No Description Available"}
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 text-center">
          {[
            { label: "Price", value: `₹ ${data.price || "N/A"}` },
            { label: "Location", value: data.location || "N/A" },
            { label: "Type", value: data.property_type || "N/A" },
            { label: "Beds", value: data.beds || "N/A" },
            { label: "Bathrooms", value: data.bathrooms || "N/A" },
            { label: "Bedrooms", value: data.bedrooms || "N/A" }
          ].map((item, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow">
              <h2 className="text-xl font-semibold">{item.label}</h2>
              <p className="text-gray-700">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Features */}
        {data.features && Array.isArray(data.features) && (
          <div className="mt-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Features</h3>
            <ul className="flex flex-wrap gap-2">
              {data.features.map((feature, index) => (
                <li
                  key={index}
                  className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow"
                >
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Owner Details */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg shadow">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">
            Owner Information
          </h3>
          <p className="text-gray-700">
            <strong>Name:</strong> {data.ownerName || "N/A"}
          </p>
          <p className="text-gray-700">
            <strong>Contact:</strong> {data.ownerContact || "N/A"}
          </p>
        </div>

        {/* Last Updated */}
        <p className="text-center text-gray-500 text-sm mt-4">
          Last Updated: {data.updatedAt ? data.updatedAt.slice(0, 10) : "N/A"}
        </p>
      </div>
    </section>
  );
};

export default PropertyDetail;
