import { IVerb } from "@/data/IVerb";
import { getRandomNumber } from "@/utils/getRandomNumber";

// TODO: this needs to be part of data loading
const persons = ["Me", "You", "He/She/It", "Them", "We"];

export type QuizItem = {
  infinitive: string;
  person: string;
  tense: string;
  conjugation: string;
};

export type QuizState = {
  items: QuizItem[];
  currentIndex: number;
  showAnswer: boolean;
};

export type QuizAction =
  | { type: "SET_VERB_ITEMS"; payload: IVerb[] }
  | { type: "TOGGLE_SHOW_ANSWER" }
  | { type: "NEXT_ITEM" };

export function quizReducer(state: QuizState, action: QuizAction) {
  switch (action.type) {
    case "SET_VERB_ITEMS":
      const items: QuizItem[] = [];
      for (const verb of action.payload ?? []) {
        for (const conjugations of verb.conjugations) {
          for (const [i, conj] of conjugations.values.entries()) {
            if (conj)
              items.push({
                infinitive: verb.infinitive,
                person: persons[i],
                tense: conjugations.tense,
                conjugation: conj,
              });
          }
        }
      }
      return {
        ...state,
        items,
        currentIndex: getRandomNumber(0, items.length - 1),
      };

    case "TOGGLE_SHOW_ANSWER":
      return {
        ...state,
        showAnswer: !state.showAnswer,
      };

    case "NEXT_ITEM":
      return {
        ...state,
        currentIndex: getRandomNumber(0, state.items.length - 1),
        showAnswer: false,
      };

    default:
      return state;
  }
}

export function initialQuizState(): QuizState {
  return {
    items: [],
    currentIndex: -1,
    showAnswer: false,
  };
}
