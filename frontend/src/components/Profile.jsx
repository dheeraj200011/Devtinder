import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const userData = useSelector((state) => state.user?.user);

  if (!userData) return;
  return (
    <div className="flex justify-center items-center flex-col">
      <h1 className="text-3xl font-bold">
        Welcome Back, {userData.firstName + " " + userData.lastName}
      </h1>

      <div className="flex items-center gap-20 mt-10">
        <div className="w-52 h-52 mt-6">
          <img className="rounded-full" src={userData.photoUrl} alt="" />
        </div>
        <div>
          <EditProfile userData={userData} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
