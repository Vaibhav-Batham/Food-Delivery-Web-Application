import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FaMotorcycle, FaMapMarkerAlt, FaCheckCircle, FaClock } from "react-icons/fa";

function DeliveryBoy() {
  const { userData } = useSelector((state) => state.user);
  const [isOnline, setIsOnline] = useState(true);

  // Mock Data for "Basic" Implementation
  const [assignedOrders, setAssignedOrders] = useState([
    {
      id: "ORD-12345",
      restaurant: "Burger King",
      address: "123 Swaroop Nagar, Kanpur, UP",
      status: "Ready for Pickup",
      amount: 450, // Rupees
      time: "10 mins ago"
    },
    {
      id: "ORD-67890",
      restaurant: "Pizza Hut",
      address: "456 Kakadeo, Kanpur, UP",
      status: "Out for Delivery",
      amount: 1200,
      time: "30 mins ago"
    }
  ]);

  if (!userData) return <div className="text-center mt-20">Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] pt-20 pb-10 px-4">
      <div className="max-w-md mx-auto">
        {/* Header / Status */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-gray-800">Hello, {userData.fullName}</h1>
            <p className={`text-sm font-medium ${isOnline ? "text-green-600" : "text-gray-500"}`}>
              {isOnline ? "You are Online" : "You are Offline"}
            </p>
          </div>
          <div
            onClick={() => setIsOnline(!isOnline)}
            className={`w-14 h-8 flex items-center bg-gray-300 rounded-full p-1 cursor-pointer transition-colors ${isOnline ? "bg-green-500" : ""}`}
          >
            <div className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ease-in-out ${isOnline ? "translate-x-6" : ""}`}></div>
          </div>
        </div>

        {/* Active Deliveries */}
        <div className="mb-4">
          <h2 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
            <FaMotorcycle className="text-[#ff4d2d]" /> Warning: Mock Data
          </h2>
          <div className="space-y-4">
            {assignedOrders.length === 0 ? (
              <div className="text-center text-gray-500 py-10">No orders assigned yet.</div>
            ) : (
              assignedOrders.map((order) => (
                <div key={order.id} className="bg-white rounded-xl shadow-sm p-5 border-l-4 border-[#ff4d2d]">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800">{order.restaurant}</h3>
                      <p className="text-xs text-gray-500">Order #{order.id}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded font-semibold">
                      {order.status}
                    </span>
                  </div>

                  <div className="flex items-start gap-3 mb-3 text-sm text-gray-600">
                    <FaMapMarkerAlt className="mt-1 text-[#ff4d2d]" />
                    <p>{order.address}</p>
                  </div>

                  <div className="flex justify-between items-center border-t pt-3 mt-2">
                    <div className="text-sm font-bold">₹{order.amount}</div>
                    <div className="text-xs text-gray-400 flex items-center gap-1">
                      <FaClock /> {order.time}
                    </div>
                  </div>

                  <button className="w-full mt-4 bg-[#ff4d2d] text-white py-2 rounded-lg font-semibold hover:bg-[#e04328] transition">
                    Update Status
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryBoy;
