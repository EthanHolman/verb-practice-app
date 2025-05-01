import { Link } from "expo-router";
import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={styles.header}>Welcome to Verb Practice</Text>
      <Link href="/PracticeScreen" style={styles.link}>
        <Text>Practice Verbs</Text>
      </Link>
      <Link href="/VerbsScreen" style={styles.link}>
        <Text>View or Edit Verbs</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
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
