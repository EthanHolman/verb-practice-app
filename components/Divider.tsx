import { COLORS } from "@/styles/theme";
import { View } from "react-native";

export default function Divider() {
  return <View style={{ height: 1, backgroundColor: COLORS.borderLight }} />;
}
