import axios from "axios";
import { getFeeds } from "../../utils/constants.js";
import { useDispatch, useSelector } from "react-redux";
import { addFeeds } from "../redux/feedSlice.js";
import { useEffect } from "react";
import FeedCard from "./FeedCard.jsx";

const Feeds = () => {
  const dispatch = useDispatch();
  const getFeedData = async () => {
    const res = await axios.get(getFeeds, { withCredentials: true });
    dispatch(addFeeds(res.data));
    console.log(res.data);
  };

  useEffect(() => {
    getFeedData();
  }, []);

  const allFeeds = useSelector((state) => state.feed);

  return (
    <div className="grid grid-cols-4 gap-2">
      {allFeeds?.map((user) => (
        <div key={user._id}>
          <FeedCard feedData={user} />
        </div>
      ))}
    </div>
  );
};

export default Feeds;
