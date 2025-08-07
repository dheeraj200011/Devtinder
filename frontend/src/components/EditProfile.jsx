import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/userSlice.js";
import axios from "axios";
import { editProfileUrl } from "../../utils/constants.js";

const EditProfile = ({ userData }) => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState(userData.firstName);
  const [lastName, setLastName] = useState(userData.lastName);
  const [skills, setSkills] = useState(userData.skills);
  const [age, setAge] = useState(userData.age);
  const [gender, setGender] = useState(userData.gender);
  const [description, setDescription] = useState(userData.description);
  const [photoUrl, setPhotoUrl] = useState(userData.photoUrl);
  const [showToast, setShowToast] = useState(false);

  const saveUser = async () => {
    try {
      const res = await axios.patch(
        editProfileUrl,
        {
          firstName: firstName,
          lastName: lastName,
          skills: skills,
          age: age,
          gender: gender,
          description: description,
          photoUrl: photoUrl,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.updatedUser));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (error) {
      console.log(error.message || "something went wrong");
    }
  };

  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-end">
          <div className="alert alert-info">
            <span>User Saved Successfully.</span>
          </div>
        </div>
      )}
      <div className="flex gap-5 flex-wrap">
        <div className="flex flex-col gap-5">
          <label className="label">Firstname</label>
          <input
            type="text"
            className="input"
            placeholder="Firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <label className="label">Age</label>
          <input
            type="number"
            className="input"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />

          <label className="label">Skills (comma-separated)</label>
          <input
            type="text"
            className="input"
            placeholder="e.g. React, Node, MongoDB"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
          />

          <label className="label">Photo Url</label>
          <input
            type="text"
            className="input"
            placeholder="Photo url"
            value={photoUrl}
            onChange={(e) => setPhotoUrl(e.target.value)}
          />

          <button onClick={saveUser} className="btn btn-primary mt-4">
            Edit Profile
          </button>
        </div>

        <div className="flex flex-col gap-5">
          <label className="label">Lastname</label>
          <input
            type="text"
            className="input"
            placeholder="Lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <label className="label">Gender</label>
          <input
            type="text"
            className="input"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />

          <label className="label">Description</label>
          <input
            type="text"
            className="input"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </div>
    </>
  );
};

export default EditProfile;
