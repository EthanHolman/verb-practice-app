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

export default function Button(props: Props) {
  return (
    <Pressable
      style={[
        {
          backgroundColor: COLORS[props.color ?? "primary"],
          borderRadius: 4,
          padding: 10,
        },
        props.style,
      ]}
      onPress={props.onPress}
    >
      <Text
        style={{
          color: "white",
          fontSize: TYPOGRAPHY[props.textSize ?? "md"],
          textAlign: "center",
        }}
      >
        {props.label}
      </Text>
    </Pressable>
  );
}
