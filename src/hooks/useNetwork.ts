import { useContext } from "react";
import { NetworkContext } from "../contexts/networkContext";

export const useNetwork = () => {
  return useContext(NetworkContext);
};
