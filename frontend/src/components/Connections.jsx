import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnection } from "../redux/connectionSlice.js";
import { getAllConnectionUrl } from "../../utils/constants.js";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((state) => state.connection);
  const dispatch = useDispatch();

  const getAllConnections = async () => {
    try {
      const res = await axios.get(getAllConnectionUrl, {
        withCredentials: true,
      });
      dispatch(addConnection(res.data));
    } catch (error) {
      console.error("Error fetching connections:", error.message || error);
    }
  };

  useEffect(() => {
    getAllConnections();
  }, []);

  return (
    <div className="max-w-xl mx-auto px-4">
      <h1 className="text-xl font-bold mb-4">Connections</h1>

      {connections?.length > 0 ? (
        connections.map((conn) => (
          <div key={conn._id} className="p-4 border rounded mb-2 shadow">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <img
                  className="w-24 h-24 rounded-2xl"
                  src={conn.photoUrl}
                  alt=""
                />
                <div>
                  <p className="text-xl font-bold ml-6">
                    {conn.firstName + " " + conn.lastName}
                  </p>
                </div>
              </div>
              <Link to={`/chat/${conn._id}`}>
                <button className="px-4 py-2 bg-green-500 rounded-3xl hover:bg-green-700 cursor-pointer">
                  Chat Now
                </button>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <p>No connections found.</p>
      )}
    </div>
  );
};

export default Connections;
