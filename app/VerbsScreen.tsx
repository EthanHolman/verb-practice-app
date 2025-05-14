import EditVerbModal from "@/components/EditVerbModal";
import TileButton from "@/components/TileButton";
import Typography from "@/components/Typography";
import { NEW_VERB_NAME } from "@/constants";
import { VerbContext } from "@/contexts/VerbContext";
import { COLORS, LAYOUT } from "@/styles/theme";
import { useContext, useEffect, useState } from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";

export default function VerbsScreen() {
  const [verbs, setVerbs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [verbToEdit, setVerbToEdit] = useState<string | undefined>();

  const verbsContext = useContext(VerbContext);

  function refresh() {
    setLoading(true);
    verbsContext.getVerbNames().then((verbs) => {
      setVerbs(verbs);
      setLoading(false);
    });
  }

  function onVerbEditClose(doReload: boolean) {
    setVerbToEdit(undefined);
    if (doReload) {
      refresh();
    }
  }

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <TileButton
        icon="add-circle-outline"
        label="Add New Verb"
        onPress={() => setVerbToEdit(NEW_VERB_NAME)}
      />
      <FlatList
        data={verbs}
        refreshing={loading}
        onRefresh={refresh}
        renderItem={(item) => (
          <Pressable
            onPress={() => setVerbToEdit(item.item)}
            style={styles.listItem}
          >
            <Typography size="lg">{item.item}</Typography>
          </Pressable>
        )}
        ListEmptyComponent={
          <Typography>You don't have any verbs yet!</Typography>
        }
        ItemSeparatorComponent={(props) => (
          <View style={{ height: 1, backgroundColor: COLORS.borderLight }} />
        )}
        keyExtractor={(item) => item}
        style={styles.list}
      />
      <EditVerbModal
        verb={verbToEdit}
        onSave={() => onVerbEditClose(true)}
        onCancel={() => onVerbEditClose(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  listItem: {
    padding: LAYOUT.paddingSm,
  },
  list: {
    backgroundColor: COLORS.foreground,
  },
});
