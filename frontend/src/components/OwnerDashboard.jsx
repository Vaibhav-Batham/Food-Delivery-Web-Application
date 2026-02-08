import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import {
  FaBoxOpen,
  FaClipboardList,
  FaMoneyBillWave,
  FaUtensils,
} from "react-icons/fa";

function OwnerDashboard() {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const activeOrdersCount = orders.length;
  const totalRevenue = orders.reduce(
    (acc, order) => acc + order.totalAmount,
    0
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/order/owner-orders`, {
          withCredentials: true,
        });
        setOrders(res.data);
      } catch (error) {
        console.error("Failed to fetch owner orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userData) {
      fetchOrders();
    }
  }, [userData]);

  if (!userData) return <div className="text-center mt-20">Access Denied</div>;

  return (
    <div className="min-h-screen bg-[#f3f4f6] pt-20 pb-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Owner Dashboard
          </h1>

          {/*  ACTION BUTTONS */}
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/owner/shop")}
              className="bg-white border border-[#ff4d2d] text-[#ff4d2d] px-4 py-2 rounded-lg hover:bg-[#ff4d2d] hover:text-white transition"
            >
              Create / Edit Shop
            </button>

            <button
              onClick={() => navigate("/owner/menu")}
              className="bg-[#ff4d2d] text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#e04328] transition"
            >
              <FaUtensils /> Manage Menu
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-blue-100 text-blue-600 rounded-lg">
              <FaClipboardList size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">Active Orders</p>
              <h3 className="text-2xl font-bold">
                {activeOrdersCount}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-green-100 text-green-600 rounded-lg">
              <FaMoneyBillWave size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Total Revenue (Est.)
              </p>
              <h3 className="text-2xl font-bold">
                ₹{totalRevenue.toFixed(2)}
              </h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-3 bg-orange-100 text-orange-600 rounded-lg">
              <FaBoxOpen size={24} />
            </div>
            <div>
              <p className="text-gray-500 text-sm">
                Pending Delivery
              </p>
              <h3 className="text-2xl font-bold">
                {orders.filter(
                  (o) => o.status !== "Delivered"
                ).length}
              </h3>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Orders
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center text-gray-500">
              Loading...
            </div>
          ) : orders.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              No active orders found.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Status
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr key={order._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm font-mono">
                        #{order._id.slice(-6)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">
                        {order.user?.fullName || "Guest"}
                        <div className="text-xs text-gray-400">
                          {order.user?.mobile}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Cancelled"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-gray-800">
                        ₹{order.totalAmount}
                      </td>
                      <td className="px-6 py-4">
                        <button className="text-sm text-[#ff4d2d] hover:underline font-medium">
                          Manage
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default OwnerDashboard;
