import { VerbContext } from "@/contexts/VerbContext";
import { useContext, useEffect, useReducer } from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import Typography from "./Typography";
import { COLORS, LAYOUT } from "@/styles/theme";
import { initialQuizState, quizReducer } from "@/reducers/QuizReducer";
import Button from "./Button";

type Props = {
  verbs: string[];
  onEndQuiz: () => void;
};

export default function Quiz(props: Props) {
  const [quiz, quizDispatch] = useReducer(quizReducer, initialQuizState());

  const currentItem =
    quiz.currentIndex !== -1 ? quiz.items[quiz.currentIndex] : undefined;

  const verbsContext = useContext(VerbContext);

  useEffect(() => {
    verbsContext.getVerbs(props.verbs).then((verbData) => {
      quizDispatch({ type: "SET_VERB_ITEMS", payload: verbData });
    });
  }, [props.verbs]);

  if (!currentItem) {
    return (
      <View style={styles.container}>
        <Typography size="lg">No items available for quiz.</Typography>
        <Typography size="md">
          The selected verbs may not have conjugations.
        </Typography>
        <Pressable onPress={props.onEndQuiz} style={styles.close}>
          <Typography color="secondary">End Quiz</Typography>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable onPress={props.onEndQuiz} style={styles.close}>
        <Typography color="secondary">End Quiz</Typography>
      </Pressable>
      <View style={styles.containerVerbInfo}>
        <Typography size="sm" color="borderLight">
          VERB
        </Typography>
        <Typography size="h2" bold style={styles.line}>
          {currentItem.infinitive}
        </Typography>
        <Typography size="sm" color="borderLight">
          PERSON
        </Typography>
        <Typography size="lg" style={styles.line}>
          {currentItem.person}
        </Typography>
        <Typography size="sm" color="borderLight">
          TENSE
        </Typography>
        <Typography size="lg">{currentItem.tense}</Typography>
      </View>
      <Pressable
        style={styles.hiddenConjugation}
        onPress={() => quizDispatch({ type: "TOGGLE_SHOW_ANSWER" })}
      >
        <Typography size="lg" style={{ textAlign: "center" }}>
          {quiz.showAnswer ? currentItem.conjugation : "(Tap to show)"}
        </Typography>
      </Pressable>
      <Button
        color="primary"
        onPress={() => quizDispatch({ type: "NEXT_ITEM" })}
        label="Next Conjugation"
        style={[styles.nextBtn, { opacity: quiz.showAnswer ? 1 : 0 }]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  close: {
    position: "absolute",
    top: Platform.OS === "android" ? LAYOUT.paddingMd + 15 : LAYOUT.paddingMd,
    left: LAYOUT.paddingMd,
    zIndex: 1,
  },
  container: {
    flex: 1,
    padding: LAYOUT.paddingMd,
    justifyContent: "center",
    alignItems: "center",
  },
  containerVerbInfo: {
    width: "60%",
    alignItems: "center",
    marginBottom: LAYOUT.paddingLg,
  },
  line: {
    marginBottom: LAYOUT.paddingMd,
  },
  containerActionArea: {
    marginTop: LAYOUT.paddingLg,
    height: 150,
    width: "60%",
  },
  hiddenConjugation: {
    padding: LAYOUT.paddingMd,
    borderStyle: "dashed",
    borderWidth: 2,
    borderColor: COLORS.border,
    borderRadius: 10,
    width: "60%",
  },
  nextBtn: {
    marginTop: LAYOUT.paddingLg,
  },
});
