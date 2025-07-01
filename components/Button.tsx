import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";

type Props = PropsWithChildren<
  {
    color?: keyof typeof COLORS;
    label: string;
    textSize?: keyof typeof TYPOGRAPHY;
  } & PressableProps
>;

export default function Button({
  color,
  label,
  textSize,
  style,
  ...props
}: Props) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: props.disabled
            ? COLORS["border"]
            : COLORS[color ?? "primary"],
          borderRadius: 4,
          padding: 10,
        },
        style,
      ]}
      {...props}
    >
      <Text
        style={{
          color: "white",
          fontSize: TYPOGRAPHY[textSize ?? "md"],
          textAlign: "center",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
