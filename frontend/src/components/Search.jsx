import { useState, useEffect } from "react";
import axios from "axios";
import { FaSearch, FaBed, FaBath } from "react-icons/fa";
import { Link } from "react-router-dom";

const featureOptions = [
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

const Search = () => {
  const [properties, setProperties] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedFeatures, setSelectedFeatures] = useState([]);
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [beds, setBeds] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("newest"); // Default sorting option
  const limit = 6;

  useEffect(() => {
    fetchProperties();
  }, [search, selectedFeatures, bedrooms, bathrooms, beds, page, sort]);

  const fetchProperties = async () => {
    try {
      const features = selectedFeatures.join(",");
      const response = await axios.get(
        "https://realestatewebsite-eix3.onrender.com/api/property/get",
        {
          params: {
            search,
            features,
            bedrooms,
            bathrooms,
            beds,
            page,
            limit,
            sort,
          },
        }
      );
      setProperties(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching properties:", error);
    }
  };

  const handleFeatureChange = (feature) => {
    setSelectedFeatures((prev) =>
      prev.includes(feature)
        ? prev.filter((f) => f !== feature)
        : [...prev, feature]
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-6">
      {/* Sidebar - Filters */}
      <div className="bg-white shadow-lg rounded-xl p-6 md:w-1/4 w-full overflow-y-auto h-fit">
        <h2 className="text-lg font-semibold mb-4">Search & Filters</h2>

        {/* Search Bar */}
        <div className="flex items-center border rounded-lg px-4 py-2 shadow-sm mb-4">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search properties..."
            className="ml-2 outline-none w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Sorting Dropdown */}
        <div className="mt-4">
          <h3 className="font-medium mb-2">Sort By</h3>
          <select
            className="border p-2 rounded-md w-full"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="price_high">Price: High to Low</option>
            <option value="price_low">Price: Low to High</option>
          </select>
        </div>

        {/* Features Checkboxes */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Features</h3>
          <div className="flex md:flex-col gap-2 flex-row flex-wrap">
            {featureOptions.map((feature) => (
              <label key={feature} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  value={feature}
                  checked={selectedFeatures.includes(feature)}
                  onChange={() => handleFeatureChange(feature)}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">{feature}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Other Filters */}
        <div className="flex flex-col gap-4">
          <input
            type="number"
            placeholder="Bedrooms"
            className="border p-2 rounded-md"
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Bathrooms"
            className="border p-2 rounded-md"
            value={bathrooms}
            onChange={(e) => setBathrooms(e.target.value)}
          />
          <input
            type="number"
            placeholder="Beds"
            className="border p-2 rounded-md"
            value={beds}
            onChange={(e) => setBeds(e.target.value)}
          />
        </div>
      </div>

      {/* Property List */}
      <div className="md:w-3/4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.length > 0 ? (
            properties.map((property) => (
              <Link
                to={`/property/${property._id}`}
                key={property._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={
                    property.imageUrl[0] || "https://via.placeholder.com/300"
                  }
                  alt={property.title}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-bold mt-3">{property.title}</h3>
                <p className="text-gray-600">{property.location}</p>
                <p className="mt-2 text-sm text-gray-700">
                  {property.description}
                </p>
                <div className="flex items-center gap-4 mt-3 flex-wrap">
                  <span className="flex items-center">
                    <FaBed className="text-blue-500 mr-1" /> {property.bedrooms}{" "}
                    BedRooms
                  </span>
                  <span className="flex items-center">
                    <FaBed className="text-blue-500 mr-1" /> {property.beds}{" "}
                    Beds
                  </span>
                  <span className="flex items-center">
                    <FaBath className="text-blue-500 mr-1" />{" "}
                    {property.bathrooms} Baths
                  </span>
                </div>
                <div className="mt-3">
                  <span className="text-sm bg-gray-200 px-2 py-1 rounded-lg">
                    {property.property_type}
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 text-center col-span-3">
              No properties found.
            </p>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`mx-1 px-4 py-2 rounded-lg ${
                page === i + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Search;
