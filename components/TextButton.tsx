import { Pressable } from "react-native";
import Typography from "./Typography";
import { COLORS } from "@/styles/theme";

type Props = {
  text: string;
  onPress: () => void;
  color?: keyof typeof COLORS;
  disabled?: boolean;
};

export default function TextButton(props: Props) {
  return (
    <Pressable onPress={props.onPress} disabled={props.disabled}>
      <Typography color={props.disabled ? "border" : props.color ?? "primary"}>
        {props.text}
      </Typography>
    </Pressable>
  );
}
