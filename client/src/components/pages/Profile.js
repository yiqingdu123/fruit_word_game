import React from "react";
import { Link } from "@reach/router";

const Profile = (props) => {
  let loginModal = null;
  if (!props.userId) {
    loginModal = (
      <div>
        <h2>Please Login First!</h2>
        <h1>
          <Link to="/">Back </Link>
        </h1>
      </div>
    );
  }
  let page = null;
  if (props.userId) {
    page = (
      <div>
        <h1>Profile</h1>
        <p>Here is the profile.</p>
        <h1>
          <Link to="/">Back </Link>
        </h1>
      </div>
    );
  }

  return (
    <div>
      {loginModal}
      {page}
    </div>
  );
};

export default Profile;
