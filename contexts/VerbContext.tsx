import {
  createVerb,
  getVerbNames,
  getVerbs,
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
  getVerbs: (verbNames: string[]) => Promise<IVerb[]>;
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
        getVerbs,
        getVerb,
        createVerb,
        updateVerb,
      }}
    >
      {children}
    </VerbContext.Provider>
  );
};
