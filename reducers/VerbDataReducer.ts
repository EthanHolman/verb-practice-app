import { IVerb } from "@/data/IVerb";

export type VerbDataAction =
  | {
      type: "SET_VERB_NAME";
      payload: string;
    }
  | {
      type: "ADD_TENSE";
      payload: string;
    }
  | {
      type: "UPDATE_CONJUGATION";
      payload: { tense: string; index: number; value: string };
    }
  | { type: "REMOVE_TENSE"; payload: string }
  | { type: "RENAME_TENSE"; payload: { oldTense: string; newTense: string } }
  | { type: "RESET" }
  | { type: "SET_VERB_DATA"; payload: IVerb };

export function verbDataReducer(state: IVerb, action: VerbDataAction): IVerb {
  switch (action.type) {
    case "SET_VERB_NAME":
      return { ...state, infinitive: action.payload };

    case "ADD_TENSE":
      return {
        ...state,
        conjugations: [
          ...state.conjugations,
          { tense: action.payload, values: ["", "", "", "", ""] },
        ],
      };

    case "UPDATE_CONJUGATION":
      const i = state.conjugations.findIndex(
        (c) => c.tense === action.payload.tense
      );
      if (i === -1) throw new Error("Tense not found");
      const conjValues = [...state.conjugations[i].values];
      conjValues[action.payload.index] = action.payload.value;
      state.conjugations[i].values = conjValues;
      return {
        ...state,
        conjugations: [...state.conjugations],
      };

    case "REMOVE_TENSE":
      return {
        ...state,
        conjugations: state.conjugations.filter(
          (c) => c.tense !== action.payload
        ),
      };

    case "RENAME_TENSE":
      return {
        ...state,
        conjugations: state.conjugations.map((c) => {
          if (c.tense === action.payload.oldTense) {
            return { ...c, tense: action.payload.newTense };
          }
          return c;
        }),
      };

    case "SET_VERB_DATA":
      return { ...action.payload };

    case "RESET":
      return initialVerbData();

    default:
      return state;
  }
}

export function initialVerbData(): IVerb {
  return {
    infinitive: "",
    conjugations: [],
  };
}
