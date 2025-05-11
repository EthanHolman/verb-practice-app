import AddNewVerb from "@/components/AddNewVerb";
import Typography from "@/components/Typography";
import { VerbContext } from "@/contexts/VerbContext";
import { COLORS, LAYOUT } from "@/styles/theme";
import { useContext, useEffect, useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

export default function VerbsScreen() {
  const [verbs, setVerbs] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const verbsContext = useContext(VerbContext);

  const refresh = () => {
    setLoading(true);
    verbsContext.getVerbNames().then((verbs) => {
      setVerbs(verbs);
      setLoading(false);
    });
  };

  useEffect(() => {
    refresh();
  }, []);

  return (
    <>
      <AddNewVerb onAdd={refresh} />
      <FlatList
        data={verbs}
        refreshing={loading}
        onRefresh={refresh}
        renderItem={(item) => (
          <Typography size="lg" style={styles.listItem}>
            {item.item}
          </Typography>
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
