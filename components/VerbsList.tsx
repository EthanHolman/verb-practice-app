import { FlatList, Pressable, StyleSheet } from "react-native";
import Typography from "./Typography";
import Divider from "./Divider";
import { LAYOUT, COLORS } from "@/styles/theme";
import Checkbox from "expo-checkbox";
import { JSX } from "react";

type Props = {
  verbs: string[];
  loading: boolean;
  doRefresh: () => void;
  onPress?: (verb: string) => void;
  multiselect?: boolean;
  selectedVerbs?: string[];
  listEmptyComponent?: JSX.Element;
};

export default function VerbsList(props: Props) {
  function handlePress(item: string) {
    if (props.onPress) props.onPress(item);
  }

  return (
    <FlatList
      data={props.verbs}
      refreshing={props.loading}
      onRefresh={props.doRefresh}
      renderItem={(item) => (
        <Pressable
          onPress={() => handlePress(item.item)}
          style={styles.listItem}
        >
          {props.multiselect && (
            <Checkbox
              style={styles.checkbox}
              value={(props.selectedVerbs ?? []).includes(item.item)}
              onValueChange={() => handlePress(item.item)}
            />
          )}
          <Typography>{item.item}</Typography>
        </Pressable>
      )}
      ListEmptyComponent={
        props.listEmptyComponent ?? (
          <Typography>You don't have any verbs yet!</Typography>
        )
      }
      ItemSeparatorComponent={() => <Divider />}
      keyExtractor={(item) => item}
      style={styles.list}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: COLORS.foreground,
  },
  listItem: {
    padding: LAYOUT.paddingSm,
    flexDirection: "row",
  },
  checkbox: {
    marginRight: LAYOUT.paddingSm,
  },
});
