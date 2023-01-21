import React, { useState } from "react";
import { post } from "../../utilities";

const DeleteWords = (props) => {
  return (
    <button
      type="submit"
      //className=""
      value="Submit"
      onClick={props.handleSubmit}
    >
      Delete
    </button>
  );
};

export default DeleteWords;
