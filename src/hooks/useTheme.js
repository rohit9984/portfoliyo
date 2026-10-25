/**
 * Convenience hook for reading the shared theme context.
 * Kept separate so components import useTheme instead of the context object.
 */
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
