import React, { useContext } from "react";
import { DarkModeContext } from "../context/DarkModeProvider";

const useDarkMode = () => useContext(DarkModeContext);

export default useDarkMode;
