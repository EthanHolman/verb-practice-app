import Button from "@/components/Button";
import TextButton from "@/components/TextButton";
import Typography from "@/components/Typography";
import { VerbContext } from "@/contexts/VerbContext";
import { LAYOUT } from "@/styles/theme";
import { useContext } from "react";
import { Alert, StyleSheet, View } from "react-native";

export default function SettingsScreen() {
  const verbsContext = useContext(VerbContext);

  function deleteAllVerbs() {
    Alert.alert(
      "Delete all verbs?",
      "This will permanently delete all verbs in your app's database",
      [
        { text: "No" },
        {
          text: "Yes, Delete",
          onPress: async () => {
            await verbsContext.resetDatabase();
          },
          style: "destructive",
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      <Button
        label="Reset App Database"
        color="danger"
        onPress={deleteAllVerbs}
      />
      <Typography>
        This will erase all your saved verbs and quiz progress. Only do this if
        you want to start over!
      </Typography>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: LAYOUT.paddingMd,
  },
});
