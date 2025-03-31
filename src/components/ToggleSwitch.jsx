import React from "react";

const ToggleSwitch = ({ id, text, isChecked, onChange }) => {
  return (
    <div className="toggle-switch">
      <span>{text}</span>
      <input
        type="checkbox"
        id={id}
        name={id}
        checked={isChecked}
        onChange={onChange}
      />
      <label htmlFor={id}></label>
    </div>
  );
};

export default ToggleSwitch;
