import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import axios from "axios";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();




  return (
    <div className="flex gap-5 flex-wrap">
      <div className="flex flex-col gap-5">
        <label className="label">Firstname</label>
        <input
          type="text"
          className="input"
          placeholder="Firstname"
          value={userInfo.firstName}
          onChange={(e) => handleDataChange("firstName", e.target.value)}
        />

        <label className="label">Age</label>
        <input
          type="number"
          className="input"
          placeholder="Age"
          value={userInfo.age}
          onChange={(e) => handleDataChange("age", e.target.value)}
        />

        <label className="label">Skills (comma-separated)</label>
        <input
          type="text"
          className="input"
          placeholder="e.g. React, Node, MongoDB"
          value={userInfo.skills}
          onChange={(e) => handleDataChange("skills", e.target.value)}
        />

        <button onClick={editUser} className="btn btn-primary mt-4">
          Edit Profile
        </button>
      </div>

      <div className="flex flex-col gap-5">
        <label className="label">Lastname</label>
        <input
          type="text"
          className="input"
          placeholder="Lastname"
          value={userInfo.lastName}
          onChange={(e) => handleDataChange("lastName", e.target.value)}
        />

        <label className="label">Gender</label>
        <input
          type="text"
          className="input"
          placeholder="Gender"
          value={userInfo.gender}
          onChange={(e) => handleDataChange("gender", e.target.value)}
        />

        <label className="label">Description</label>
        <input
          type="text"
          className="input"
          placeholder="Description"
          value={userInfo.description}
          onChange={(e) => handleDataChange("description", e.target.value)}
        />
      </div>
    </div>
  );
};

export default EditProfile;
