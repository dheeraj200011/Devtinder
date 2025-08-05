import React from "react";

const FeedCard = ({ feedData }) => {
  return (
    <div>
      <div className="card bg-base-100 w-96 shadow-sm mt-6">
        <figure>
          <img src={feedData.photoUrl} alt="user" />
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
            <button className="btn btn-reject">Reject</button>
            <button className="btn btn-primary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedCard;
