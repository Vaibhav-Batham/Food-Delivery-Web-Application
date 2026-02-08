import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const useGetMyShop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getMyShop = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/shop/my-shop`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // yahan jo backend se data aaye usko redux me daal
        dispatch(setUserData(res.data));
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    };

    getMyShop();
  }, [dispatch]);
};

export default useGetMyShop;
