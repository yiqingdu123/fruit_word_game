import React, { useState } from "react";
import { post } from "../../utilities";

const NewWordInput = (props) => {
  const [value, setValue] = useState("");

  // called whenever the user types in the new post input box
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // called when the user hits "Submit" for a new post
  const handleSubmit = (event) => {
    event.preventDefault();
    props.onSubmit && props.onSubmit(value);
    setValue("");
  };

  return (
    <div>
      <input
        type="text"
        placeholder={props.defaultText}
        value={value}
        onChange={handleChange}
        //className=""
      />
      <button
        type="submit"
        //className=""
        value="Submit"
        onClick={handleSubmit}
      >
        Submit
      </button>
    </div>
  );
};

const NewWord = (props) => {
  const addWord = (value) => {
    const body = { content: value };
    post("/api/word", body).then((word) => {
      props.addNewWord(word);
    });
  };

  return <NewWordInput defaultText="Input Word" onSubmit={addWord} />;
};

export { NewWord };
