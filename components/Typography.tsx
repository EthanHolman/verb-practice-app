import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { PropsWithChildren } from "react";
import { Text, TextProps } from "react-native";

type Props = PropsWithChildren<
  {
    size?: keyof typeof TYPOGRAPHY;
    color?: keyof typeof COLORS;
    bold?: boolean;
  } & TextProps
>;

export default function Typography({
  size = "md",
  color = "text",
  bold = false,
  children,
  style,
  ...props
}: Props) {
  return (
    <Text
      style={[
        {
          fontSize: TYPOGRAPHY[size],
          color: COLORS[color],
          fontWeight: bold ? "bold" : "normal",
        },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}
