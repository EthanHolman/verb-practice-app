import { COLORS, LAYOUT } from "@/styles/theme";
import { PropsWithChildren } from "react";
import { StyleSheet, Modal as RnModal, SafeAreaView, View } from "react-native";
import Typography from "./Typography";

type Props = PropsWithChildren<{
  visible: boolean;
  title?: string;
  headerLeft?: React.ReactElement;
  headerRight?: React.ReactElement;
}>;

export default function Modal(props: Props) {
  const showHeader = props.title || props.headerLeft || props.headerRight;

  return (
    <RnModal
      visible={props.visible}
      transparent={false}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <SafeAreaView style={styles.modal}>
        {showHeader && (
          <View style={styles.modalHeader}>
            <View>{props.headerLeft && props.headerLeft}</View>
            <View style={styles.modalHeaderTitle}>
              {props.title && (
                <Typography style={styles.modalHeaderTitleTxt}>
                  {props.title}
                </Typography>
              )}
            </View>
            <View>{props.headerRight && props.headerRight}</View>
          </View>
        )}
        {props.children}
      </SafeAreaView>
    </RnModal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.background,
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: LAYOUT.paddingSm,
    backgroundColor: COLORS.foreground,
    borderBottomColor: COLORS.borderLight,
    borderBottomWidth: 1,
  },
  modalHeaderTitle: {
    flexGrow: 1,
  },
  modalHeaderTitleTxt: {
    fontWeight: "bold",
    textAlign: "center",
  },
});
