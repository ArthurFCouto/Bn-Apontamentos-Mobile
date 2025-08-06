import { useContext } from "react";
import { SyncContext } from "../contexts/syncContext";

export const useSync = () => {
  return useContext(SyncContext);
};
