import TextInput from "@/components/TextInput";
import Typography from "@/components/Typography";
import { VerbContext } from "@/contexts/VerbContext";
import { useContext, useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { LAYOUT, TYPOGRAPHY } from "@/styles/theme";
import Button from "@/components/Button";
import VerbsList from "@/components/VerbsList";
import Quiz from "@/components/Quiz";
import { useNavigation } from "expo-router";

export default function VerbsScreen() {
  const [verbs, setVerbs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);
  const [mode, setMode] = useState<"setup" | "quiz">("setup");

  const verbsContext = useContext(VerbContext);
  const navigation = useNavigation();

  function refresh() {
    setLoading(true);
    verbsContext.getVerbNames().then((verbs) => {
      setVerbs(verbs);
      setLoading(false);
    });
  }

  function handleSelect(verb: string) {
    if (selectedVerbs.includes(verb)) {
      setSelectedVerbs(selectedVerbs.filter((v) => v !== verb));
    } else {
      setSelectedVerbs([...selectedVerbs, verb]);
    }
  }

  function handleStartQuiz() {
    setMode("quiz");
    navigation.setOptions({ headerShown: false });
  }

  function handleEndQuiz() {
    setMode("setup");
    navigation.setOptions({ headerShown: true });
  }

  useEffect(() => {
    refresh();
  }, []);

  if (mode === "quiz")
    return (
      <SafeAreaView style={styles.container}>
        <Quiz verbs={selectedVerbs} onEndQuiz={handleEndQuiz} />
      </SafeAreaView>
    );

  return (
    <View style={styles.container}>
      <Typography size="lg" style={styles.pageTitle}>
        Choose verbs to quiz ({selectedVerbs.length} selected):
      </Typography>
      <TextInput
        style={styles.filter}
        variant="outline"
        placeholder="Filter (not implemented)"
      />
      <VerbsList
        verbs={verbs}
        loading={loading}
        doRefresh={refresh}
        onPress={handleSelect}
        multiselect
        selectedVerbs={selectedVerbs}
        listEmptyComponent={
          <Typography>
            You don't have any verbs yet, create or import some!
          </Typography>
        }
      />
      <Button
        color="primary"
        style={styles.startQuiz}
        textSize="lg"
        label="Start Quiz"
        onPress={handleStartQuiz}
        disabled={selectedVerbs.length === 0}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pageTitle: {
    margin: LAYOUT.paddingSm,
    fontWeight: "600",
  },
  filter: { margin: LAYOUT.paddingSm, marginTop: 0 },
  startQuiz: {
    padding: LAYOUT.paddingMd,
    paddingBottom: 2 * LAYOUT.paddingMd,
    borderRadius: 0,
    fontSize: TYPOGRAPHY.sm,
  },
});
