import React, { useContext, useEffect, useState } from "react";
import DarkModeProvider, { DarkModeContext } from "../context/DarkModeProvider";
import useDarkMode from "../hooks/useDarkMode";

const ToggleSwitch = ({ purpose, text, defaultVal = true }) => {
  const { isDarkMode, toggleDarkMode} = useDarkMode()

  return (
    <div className="toggle-switch">
      {text}
      <input
        type="checkbox"
        id={purpose}
        name={purpose}
        checked={isDarkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor={purpose}></label>
    </div>
  );
};

export default ToggleSwitch;
