import { useContext } from "react";
import { DataAppContext } from "../contexts/dataAppContext";

export const useDataApp = () => {
  return useContext(DataAppContext);
};
