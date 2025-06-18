import { StyleSheet, View } from "react-native";
import Modal from "./Modal";
import TextButton from "./TextButton";
import Typography from "./Typography";
import { useContext, useEffect, useState } from "react";
import { getVerb, getVerbs } from "@/api/Verbs.api";
import VerbsList from "./VerbsList";
import { VerbContext } from "@/contexts/VerbContext";

type Props = {
  show: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export default function ImportVerbModal(props: Props) {
  const [verbs, setVerbs] = useState<string[]>([]);
  const [verbsLoading, setVerbsLoading] = useState(false);
  const [selectedVerbs, setSelectedVerbs] = useState<string[]>([]);

  const verbsContext = useContext(VerbContext);

  async function handleImport() {
    for (const verb of selectedVerbs) {
      try {
        const result = await getVerb(verb);
        await verbsContext.createVerb(result);
      } catch (error) {
        console.error(error);
      }
    }
    props.onSave();
  }

  function handleVerbSelect(verb: string) {
    if (selectedVerbs.includes(verb)) {
      setSelectedVerbs(selectedVerbs.filter((v) => v !== verb));
    } else {
      setSelectedVerbs([...selectedVerbs, verb]);
    }
  }

  function loadVerbs() {
    setVerbsLoading(true);

    getVerbs()
      .then((response) => setVerbs(response))
      .catch((error) => console.error(error))
      .finally(() => setVerbsLoading(false));
  }

  useEffect(loadVerbs, []);

  return (
    <Modal
      visible={props.show}
      title="Import Verbs"
      headerLeft={<TextButton text="Cancel" onPress={props.onCancel} />}
      headerRight={
        <TextButton
          text="Import"
          disabled={selectedVerbs.length === 0}
          onPress={handleImport}
        />
      }
    >
      <View style={styles.body}>
        <VerbsList
          verbs={verbs}
          loading={verbsLoading}
          doRefresh={loadVerbs}
          onPress={handleVerbSelect}
          multiselect
          selectedVerbs={selectedVerbs}
          listEmptyComponent={
            <Typography>No verbs were found on the server</Typography>
          }
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  body: {
    flexGrow: 1,
  },
});
