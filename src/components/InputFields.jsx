import React from "react";

const InputFields = ({ onChangeHandler }) => {
  return (
    <>
      <div className="ui grid">
        <label>Distance</label>
        <input onChange={onChangeHandler} name="distance" id="distance"></input>
      </div>

      <select onChange={onChangeHandler} name="gender" id="gender">
        <option value="female">Female</option>
        <option value="male">Male</option>
      </select>

      <label>Age</label>
      <input onChange={onChangeHandler} name="age" id="age"></input>
    </>
  );
};

export default InputFields;