import { createVerb, getVerbNames, getVerbs } from "@/data/Verbs";
import { IVerb } from "@/data/IVerb";
import { createContext } from "react";

type VerbProviderProps = {
  children: React.ReactNode;
};

type VerbContextType = {
  getVerbNames: () => Promise<string[]>;
  getVerbs: () => Promise<IVerb[]>;
  createVerb: (verb: IVerb) => Promise<void>;
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
        createVerb,
      }}
    >
      {children}
    </VerbContext.Provider>
  );
};
