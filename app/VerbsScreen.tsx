import EditVerbModal from "@/components/EditVerbModal";
import TileButton from "@/components/TileButton";
import VerbsList from "@/components/VerbsList";
import { NEW_VERB_NAME } from "@/constants";
import { VerbContext } from "@/contexts/VerbContext";
import { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";

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
      <VerbsList
        verbs={verbs}
        loading={loading}
        doRefresh={refresh}
        onPress={(verb) => setVerbToEdit(verb)}
      />
      <EditVerbModal
        verb={verbToEdit}
        onSave={() => onVerbEditClose(true)}
        onCancel={() => onVerbEditClose(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
