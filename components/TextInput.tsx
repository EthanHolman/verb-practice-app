import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { TextInput as RnTextInput, TextInputProps } from "react-native";

type Props = {
  variant?: "outline" | "blank";
} & TextInputProps;

export default function TextInput({
  variant = "blank",
  style,
  ...props
}: Props) {
  return (
    <RnTextInput
      style={[
        {
          borderWidth: variant === "outline" ? 1 : 0,
          borderColor: COLORS.border,
          padding: 10,
          borderRadius: 4,
          fontSize: TYPOGRAPHY.md,
        },
        style,
      ]}
      {...props}
    />
  );
}
