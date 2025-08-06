import { createContext, ReactNode, useMemo, useState } from "react";
import { authClient } from "../clients/auth";
import { segmentClient } from "../clients/segment";
import { dataAppStorage, UpdatedAt } from "../services/dataAppStorage";
import { CutPlan } from "../types/cutPlan";
import { Segment } from "../types/segment";

interface DataAppContextType {
  cutPlans: CutPlan[];
  updatedAt?: UpdatedAt;
  segments: Segment[];
  updateDataApp: (cutPlans: CutPlan[]) => Promise<void>;
  isLoading: boolean;
  isOldCutPlan: boolean;
}

export const DataAppContext = createContext<DataAppContextType>(
  {} as DataAppContextType
);

interface DataAppProviderProps {
  children: ReactNode;
}

export const DataAppProvider = ({ children }: DataAppProviderProps) => {
  const [cutPlans, setCutPlans] = useState<CutPlan[]>([]);
  const [updatedAt, setUpdatedAt] = useState<UpdatedAt>();
  const [segments, setSegments] = useState<Segment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOldCutPlan = useMemo(() => {
    return updatedAt?.timestamp
      ? new Date(updatedAt.timestamp).setHours(0, 0, 0, 0) <
          new Date().setHours(0, 0, 0, 0)
      : true;
  }, [updatedAt]);

  const syncDataApp = async () => {
    if (isLoading) return;

    setIsLoading(true);
    const cutPlanStorage = await dataAppStorage.getCutPlan();
    setCutPlans(cutPlanStorage);
    const segmentStorage = await dataAppStorage.getSegments();
    setSegments(segmentStorage);
    const dateUpdateAtStorage = await dataAppStorage.getDateUpdatedAt();
    setUpdatedAt({
      label: dateUpdateAtStorage?.label?.replaceAll('"', ""),
      timestamp: dateUpdateAtStorage?.timestamp,
    });
    setIsLoading(false);
  };

  const updateDataApp = async (cutPlans: CutPlan[]) => {
    if (isLoading) return;

    const { token } = await authClient.getToken();
    if (!token) return;

    setIsLoading(true);
    const ids = cutPlans.map((x) => x.id);
    const { data } = await segmentClient.getSegments(ids);
    const segmentsStoage = data ?? [];
    await dataAppStorage.saveDataAppStorage(cutPlans, segmentsStoage);
    setIsLoading(false);

    await syncDataApp();
  };

  const contextValue = {
    cutPlans,
    updatedAt,
    segments,
    updateDataApp,
    isLoading,
    isOldCutPlan,
  };

  return (
    <DataAppContext.Provider value={contextValue}>
      {children}
    </DataAppContext.Provider>
  );
};
