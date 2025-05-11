import { Pressable, StyleSheet, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS, ICON_SIZES } from "@/styles/theme";

type Props = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  size?: keyof typeof ICON_SIZES;
  color?: keyof typeof COLORS;
};

export default function IconButton({
  icon,
  onPress,
  size = "md",
  color = "primary",
}: Props) {
  return (
    <Pressable style={styles.iconButton} onPress={onPress}>
      <Ionicons name={icon} size={ICON_SIZES[size]} color={color} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    justifyContent: "center",
    alignItems: "center",
  },
  iconButtonLabel: {
    color: "#fff",
    marginTop: 12,
  },
});
