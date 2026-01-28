import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";
import { serverUrl } from "../App";

const useGetCurrentUser = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    const getUser = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/user/current`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        dispatch(setUserData(res.data.user));
      } catch (err) {
        console.log(err);
        localStorage.removeItem("token");
      }
    };

    getUser();
  }, []);
};

export default useGetCurrentUser;
