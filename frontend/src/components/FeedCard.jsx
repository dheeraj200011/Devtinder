import axios from "axios";
const FeedCard = ({ feedData }) => {
  const handleConnectionRequest = async (status, id) => {
    try {
      const res = await axios.post(
        `http://localhost:3000/api/v1/request/send/${status}/${id}`,
        {},
        { withCredentials: true }
      );

      console.log("Connection Request Result:", res.data);
    } catch (error) {
      console.error("Connection request failed:", error);
    }
  };

  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-6">
        <figure>
          <img className="w-52 h-52" src={feedData.photoUrl} alt="user" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {feedData.firstName + " " + feedData.lastName}
          </h2>
          <p>
            A card component has a figure, a body part, and inside body there
            are title and actions parts
          </p>

          <div className="card-actions flex items-center justify-center mt-6">
            <button
              onClick={() => handleConnectionRequest("rejected", feedData._id)} // ✅ FIXED
              className="btn btn-reject"
            >
              Reject
            </button>
            <button
              onClick={() =>
                handleConnectionRequest("interested", feedData._id)
              }
              className="btn btn-primary"
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
