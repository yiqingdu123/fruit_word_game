import React from "react";

/**
 * Proptypes
 * @param {string} _id
 * @param {string} input_user
 * @param {string} content
 */

const SingleWord = (props) => {
  return (
    <div>
      <span>{props.input_user}</span>
      <p>{props.content}</p>
    </div>
  );
};

export default SingleWord;
