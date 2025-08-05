import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const userData = useSelector((state) => state.user.user);
  return <div></div>;
};

export default Profile;
