import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllRequsetUrl,
  reviewConnectionRequest,
} from "../../utils/constants.js";
import { addRequest } from "../redux/requestSlice.js";

const RequsetRecieved = () => {
  const requests = useSelector((state) => state.request);
  const dispatch = useDispatch();
  const getRequests = async () => {
    try {
      const res = await axios.get(getAllRequsetUrl, { withCredentials: true });
      dispatch(addRequest(res.data.userRequests));
    } catch (error) {
      console.error(error.message || "somenthing went wrong");
    }
  };

  useEffect(() => {
    getRequests();
  }, []);

  const reviewRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/request/review/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      // Optionally re-fetch requests to update UI
      getRequests(); // <-- call your fetch function to refresh state
    } catch (error) {
      console.error(
        error?.response?.data?.message ||
          error.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="max-w-1/2 mx-auto flex flex-col items-center ">
      <h1 className="text-xl font-bold ">Requests</h1>
      {requests?.length > 0 ? (
        requests.map((request) => (
          <div key={request._id} className="p-4 border rounded mb-4 mt-6">
            <div className="flex items-center space-x-4">
              <img
                src={request.fromUserId.photoUrl}
                alt={`${request.fromUserId.firstName}'s profile`}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-lg">
                  {request.fromUserId.firstName} {request.fromUserId.lastName}
                </p>
                <p className="text-gray-600">
                  {request.fromUserId.description}
                </p>
              </div>
            </div>
            <div className="flex justify-center items-center gap-4 mt-8">
              <button
                onClick={() => reviewRequest("rejected", request._id)}
                className="btn btn-error"
              >
                Rejected
              </button>
              <button
                onClick={() => reviewRequest("accepted", request._id)}
                className="btn btn-primary"
              >
                Accepted
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No requests found.</p>
      )}
    </div>
  );
};

export default RequsetRecieved;
