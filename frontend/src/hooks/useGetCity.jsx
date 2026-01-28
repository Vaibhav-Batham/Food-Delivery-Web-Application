import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCity } from "../redux/userSlice";

function useGetCity() {
  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_GEOAPIKEY;

  useEffect(() => {
    if (!navigator.geolocation) {
      dispatch(setCity("Location not supported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;

          const res = await axios.get(
            `https://api.geoapify.com/v1/geocode/reverse`,
            {
              params: {
                lat: latitude,
                lon: longitude,
                format: "json",
                apiKey,
              },
            }
          );

          const location =
            res.data.results[0].city ||
            res.data.results[0].town ||
            res.data.results[0].village ||
            "Unknown";

          dispatch(setCity(location));
        } catch (error) {
          console.error("Geo API Error:", error);
          dispatch(setCity("Location error"));
        }
      },
      (error) => {
        console.error("Geolocation Error:", error);
        dispatch(setCity("Permission denied"));
      }
    );
  }, []);

}

export default useGetCity;
