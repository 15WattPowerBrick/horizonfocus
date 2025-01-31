// /src/context/OrgContext.tsx
"use client";

import { createContext, useContext, useState } from "react";

type Organisation = {
  id: string;
  name: string;
  role: string;
};

type OrgContextType = {
  selectedOrg: Organisation | null;
  setSelectedOrg: (org: Organisation | null) => void;
};

const OrgContext = createContext<OrgContextType>({
  selectedOrg: null,
  setSelectedOrg: () => {},
});

export const OrgProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedOrg, setSelectedOrg] = useState<Organisation | null>(null);

  return (
    <OrgContext.Provider value={{ selectedOrg, setSelectedOrg }}>
      {children}
    </OrgContext.Provider>
  );
};

export const useOrg = () => useContext(OrgContext);
