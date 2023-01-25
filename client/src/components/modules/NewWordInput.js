import React, { useState, useEffect, useRef } from "react";
import { post } from "../../utilities";

import "../pages/SinglePlayerGame.css";

const NewWordInput = (props) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = () => {
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  const handleEnter = (event) => {
    if (event.key === "Enter") {
      console.log("enter");
      handleSubmit();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        onKeyPress={handleEnter}
        className="input"
      />
      <button type="submit" className="submit" value="Submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

const NewWord = (props) => {
  const addWord = (value) => {
    if (value != "") {
      const body = { content: value };
      post("/api/word", body).then((word) => {
        props.addNewWord(word);
      });
    }
  };

  return <NewWordInput defaultText="Input Word" onSubmit={addWord} />;
};

export { NewWord };
