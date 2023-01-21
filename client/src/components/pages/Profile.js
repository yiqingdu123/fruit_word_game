import React from "react";
import { Link } from "@reach/router";

const Profile = (props) => {
  let loginModal = null;
  if (!props.userId) {
    loginModal = <div> Please Login First! </div>;
  }

  return (
    <div>
      <h1>Profile</h1>
      <p>Here is the profile.</p>
      <h1>
        <Link to="/">Back </Link>
      </h1>
    </div>
  );
};

export default Profile;
