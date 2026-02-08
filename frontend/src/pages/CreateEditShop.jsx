import React, { useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";
import { useNavigate } from "react-router-dom";

function CreateEditShop() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    openTime: "",
    closeTime: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Shop image is required");
      return;
    }

    if (formData.closeTime <= formData.openTime) {
      alert("Closing time must be greater than opening time");
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();
      data.append("name", formData.name);
      data.append("address", formData.address);
      data.append("city", formData.city);
      data.append("openTime", formData.openTime);
      data.append("closeTime", formData.closeTime);
      data.append("image", image);

      axios.post(`${serverUrl}/api/shop/create-edit`, data, {
  withCredentials: true,
});


      alert("Shop created successfully");
      navigate("/owner/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to create shop");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 px-4">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">
          Create Your Shop
        </h2>

        {/* BACK BUTTON */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-gray-600 mb-4 hover:underline"
        >
          ← Back
        </button>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Shop Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <textarea
            name="address"
            placeholder="Shop Address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            rows="3"
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            className="w-full border p-3 rounded-lg"
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-600">Opening Time</label>
              <input
                type="time"
                name="openTime"
                value={formData.openTime}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-600">Closing Time</label>
              <input
                type="time"
                name="closeTime"
                value={formData.closeTime}
                onChange={handleChange}
                className="w-full border p-3 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-600 block mb-2">
              Shop Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full"
              required
            />

            {preview && (
              <img
                src={preview}
                alt="Shop Preview"
                className="mt-3 h-40 w-full object-cover rounded-lg border"
              />
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#ff4d2d] text-white py-3 rounded-lg font-semibold hover:bg-[#e04328]"
          >
            {loading ? "Saving..." : "Create Shop"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateEditShop;
