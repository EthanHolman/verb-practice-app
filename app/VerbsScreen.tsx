import EditVerbModal from "@/components/EditVerbModal";
import ImportVerbModal from "@/components/ImportVerbModal";
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
  const [showVerbImport, setShowVerbImport] = useState(false);

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
    setShowVerbImport(false);
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
        label="Add Your Own Verb"
        onPress={() => setVerbToEdit(NEW_VERB_NAME)}
      />
      <TileButton
        icon="cloud-circle"
        label="Import Verb"
        onPress={() => setShowVerbImport(true)}
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
      <ImportVerbModal
        show={showVerbImport}
        onSave={() => onVerbEditClose(true)}
        onCancel={() => onVerbEditClose(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({});
