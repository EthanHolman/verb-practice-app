import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

type Props = PropsWithChildren<
  {
    size?: keyof typeof TYPOGRAPHY;
    color?: keyof typeof COLORS;
  } & TextProps
>;

export default function Typography({
  size = "md",
  color = "text",
  children,
  style,
  ...props
}: Props) {
  return (
    <Text
      style={[{ fontSize: TYPOGRAPHY[size], color: COLORS[color] }, style]}
      {...props}
    >
      {children}
    </Text>
  );
}
