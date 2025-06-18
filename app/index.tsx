import Typography from "@/components/Typography";
import { COLORS, LAYOUT } from "@/styles/theme";
import { Link } from "expo-router";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.header}>Welcome to Verb Practice</Text>
        <Link href="/PracticeScreen" style={styles.link}>
          <Text>Practice Verbs</Text>
        </Link>
        <Link href="/VerbsScreen" style={styles.link}>
          <Text>View or Edit Verbs</Text>
        </Link>
      </View>
      <View style={styles.footerContainer}>
        <Link href="/SettingsScreen">
          <Typography>Settings</Typography>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
  footerContainer: {
    margin: LAYOUT.paddingMd,
    paddingTop: LAYOUT.paddingMd,
    paddingBottom: LAYOUT.paddingMd,
    borderTopWidth: 1,
    borderTopColor: COLORS.borderLight,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  header: {
    fontSize: 35,
    fontWeight: "500",
    marginBottom: 25,
    width: "85%",
  },
  link: {
    width: "85%",
    fontSize: 20,
    padding: 25,
    borderWidth: 1,
    borderColor: "thistle",
    borderRadius: 5,
    textAlign: "center",
    marginBottom: 10,
  },
});
