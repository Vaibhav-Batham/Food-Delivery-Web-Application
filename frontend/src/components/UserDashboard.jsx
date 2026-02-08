// src/components/UserDashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { serverUrl } from "../App";

function UserDashboard() {
  const [shops, setShops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedShop, setSelectedShop] = useState(null);
  const [menuItems, setMenuItems] = useState([]);

  // Fetch all shops
  const fetchShops = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/shop/all`);
      setShops(res.data.shops || []);
    } catch (err) {
      console.log("Failed to fetch shops:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch menu for selected shop
  const fetchMenu = async (shopId) => {
    try {
      const res = await axios.get(`${serverUrl}/api/menu/${shopId}`);
      setMenuItems(res.data.menu || []);
    } catch (err) {
      console.log("Failed to fetch menu:", err);
    }
  };

  useEffect(() => {
    fetchShops();
  }, []);

  const handleSelectShop = (shop) => {
    setSelectedShop(shop);
    fetchMenu(shop._id);
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Available Shops</h1>

      {/* Shop List */}
      {!selectedShop ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shops.map((shop) => (
            <div
              key={shop._id}
              className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
              onClick={() => handleSelectShop(shop)}
            >
              <img
                src={shop.image}
                alt={shop.name}
                className="w-full h-32 object-cover rounded mb-2"
              />
              <h2 className="font-bold text-lg">{shop.name}</h2>
              <p className="text-sm text-gray-500">{shop.address}</p>
              <p className="text-sm text-gray-400">
                Open: {shop.openingTime} - {shop.closingTime}
              </p>
            </div>
          ))}
        </div>
      ) : (
        // Menu Items of selected shop
        <div>
          <button
            onClick={() => setSelectedShop(null)}
            className="mb-4 text-blue-500 hover:underline"
          >
            ← Back to Shops
          </button>

          <h2 className="text-xl font-bold mb-4">{selectedShop.name} Menu</h2>

          {menuItems.length === 0 ? (
            <p className="text-gray-500">No items available.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menuItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white p-4 rounded shadow relative"
                >
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded mb-2"
                    />
                  )}
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                  <p className="font-semibold">₹{item.price}</p>
                  <p className="text-xs text-gray-500">
                    Category: {item.category}
                  </p>
                  <p className="text-xs text-gray-500">
                    Available: {item.available ? "Yes" : "No"}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default UserDashboard;
