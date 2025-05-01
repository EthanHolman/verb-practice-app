import { Pressable, StyleSheet, Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, LAYOUT, TYPOGRAPHY } from "@/styles/theme";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
};

export default function TileButton({ icon, label, onPress }: Props) {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <Ionicons name={icon} size={32} color={COLORS.primary} />
      <Text style={styles.text}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: LAYOUT.paddingMd,
    alignItems: "center",
  },
  text: {
    flexGrow: 1,
    fontSize: TYPOGRAPHY.fontMd,
    color: COLORS.primary,
    paddingLeft: LAYOUT.paddingMd / 2,
  },
});
