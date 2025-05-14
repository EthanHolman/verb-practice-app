import {
  createVerb,
  getVerbNames,
  getAllVerbs,
  getVerb,
  updateVerb,
} from "@/data/Verbs";
import { IVerb } from "@/data/IVerb";
import { createContext } from "react";

type VerbProviderProps = {
  children: React.ReactNode;
};

type VerbContextType = {
  getVerbNames: () => Promise<string[]>;
  getAllVerbs: () => Promise<IVerb[]>;
  getVerb(verbName: string): Promise<IVerb>;
  createVerb: (verb: IVerb) => Promise<void>;
  updateVerb: (verb: IVerb) => Promise<void>;
};

export const VerbContext = createContext<VerbContextType>(
  {} as VerbContextType
);

export const VerbProvider = ({ children }: VerbProviderProps) => {
  return (
    <VerbContext.Provider
      value={{
        getVerbNames,
        getAllVerbs,
        createVerb,
        getVerb,
        updateVerb,
      }}
    >
      {children}
    </VerbContext.Provider>
  );
};
