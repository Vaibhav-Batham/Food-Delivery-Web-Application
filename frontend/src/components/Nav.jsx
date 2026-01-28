import React, { useState, useEffect } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch, FaTimes } from "react-icons/fa";
import { FiShoppingCart } from "react-icons/fi";
import { useSelector } from "react-redux";

function Nav() {
  const { userData, city } = useSelector((state) => state.user);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [status, setStatus] = useState("fetching"); // fetching / detecting / done / failed
  const userInitial = userData?.fullName?.[0] || "";

  // Fetch city from browser location
  useEffect(() => {
    const fetchLocation = async () => {
      if (!navigator.geolocation) {
        setStatus("failed");
        return;
      }

      setStatus("fetching");
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          setStatus("detecting");
          const { latitude, longitude } = pos.coords;
          const apiKey = import.meta.env.VITE_GEOAPIKEY;

          try {
            const res = await fetch(
              `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${apiKey}`
            );
            const data = await res.json();
            const p = data?.features?.[0]?.properties;
            const cityName = p?.city || p?.town || p?.village || p?.suburb || p?.county || p?.state;
            if (cityName) setStatus("done");
            else setStatus("failed");
          } catch (err) {
            setStatus("failed");
          }
        },
        () => setStatus("failed")
      );
    };

    fetchLocation();
  }, []);

  const displayCity = () => {
    switch (status) {
      case "fetching":
        return "Fetching location...";
      case "detecting":
        return "Detecting...";
      case "done":
        return city || "Your Location";
      case "failed":
        return "Location unavailable";
      default:
        return "Location unavailable";
    }
  };

  return (
    <>
      <div className="w-full fixed top-0 z-[9999] bg-[#fff9f6] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-3">
          <h1 className="text-xl sm:text-2xl font-bold text-[#ff4d2d]">
            Tastico
          </h1>

          {/* Desktop Search */}
          <div className="hidden md:flex items-center bg-white h-[46px] rounded-lg shadow-lg px-4 gap-4 w-[45%]">
            <div className="flex items-center gap-2 border-r pr-3">
              <FaLocationDot className="text-[#ff4d2d]" />
              <span className="text-gray-600 text-sm">{displayCity()}</span>
            </div>
            <div className="flex items-center gap-2 flex-1">
              <FaSearch className="text-[#ff4d2d]" />
              <input className="w-full outline-none text-sm" placeholder="Search delicious food..." />
            </div>
          </div>

          <div className="flex items-center gap-4 relative">
            <FaSearch size={22} className="text-[#ff4d2d] md:hidden cursor-pointer" onClick={() => setShowSearch(true)} />
            <FiShoppingCart size={22} className="text-[#ff4d2d] cursor-pointer" />

            {/* User Avatar */}
            <div
              onClick={() => setShowProfile(!showProfile)}
              className="w-9 h-9 rounded-full bg-[#ff4d2d] text-white flex items-center justify-center font-semibold cursor-pointer"
            >
              {userInitial}
            </div>

            {/* Profile Popup */}
            {showProfile && (
              <div className="absolute right-0 top-12 w-44 bg-white shadow-lg rounded-lg p-3 z-50">
                <p className="text-sm font-semibold text-gray-700 mb-2">{userData?.fullName}</p>
                <button className="w-full text-left text-sm py-1 hover:text-[#ff4d2d]">My Orders</button>
                <button className="w-full text-left text-sm py-1 text-red-500">Logout</button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Search Popup */}
      {showSearch && (
        <div className="fixed inset-0 bg-black/40 z-[10000] flex items-start pt-20 px-4">
          <div className="bg-white w-full rounded-lg p-4 flex items-center gap-3">
            <FaSearch className="text-[#ff4d2d]" />
            <input autoFocus className="flex-1 outline-none" placeholder="Search delicious food..." />
            <FaTimes className="text-gray-600 cursor-pointer" onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </>
  );
}

export default Nav;
