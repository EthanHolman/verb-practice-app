import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { PropsWithChildren } from "react";
import { Pressable, PressableProps, Text } from "react-native";

type Props = PropsWithChildren<
  {
    color?: keyof typeof COLORS;
    label: string;
  } & PressableProps
>;

export default function Button(props: Props) {
  return (
    <Pressable
      style={{
        backgroundColor: props.color ?? COLORS.primary,
        borderRadius: 4,
        padding: 10,
      }}
      onPress={props.onPress}
    >
      <Text
        style={{ color: "white", fontSize: TYPOGRAPHY.md, textAlign: "center" }}
      >
        {props.label}
      </Text>
    </Pressable>
  );
}
