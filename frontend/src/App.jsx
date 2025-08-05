import { Outlet, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import axios from "axios";
import { getprofile } from "../utils/constants";
import { addUser } from "./redux/userSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user?.user);

  const fetchUser = async () => {
    if (user) return;
    try {
      const res = await axios.get(getprofile, { withCredentials: true });
      dispatch(addUser(res.data));
    } catch (error) {
      navigate("/login");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 m-8">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default App;
