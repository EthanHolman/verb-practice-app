import { Alert, StyleSheet, View } from "react-native";
import { useContext, useEffect, useReducer, useState } from "react";
import { LAYOUT } from "@/styles/theme";
import TextInput from "./TextInput";
import ConjugationTable from "./ConjugationTable";
import { initialVerbData, verbDataReducer } from "@/reducers/VerbDataReducer";
import { VerbContext } from "@/contexts/VerbContext";
import { NEW_VERB_NAME } from "@/constants";
import TextButton from "./TextButton";
import Modal from "./Modal";

type Props = {
  verb?: string;
  onSave: () => void;
  onCancel: () => void;
};

export default function EditVerbModal(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [verbData, verbDataDispatch] = useReducer(
    verbDataReducer,
    initialVerbData()
  );

  const verbsContext = useContext(VerbContext);

  const allowCreate = verbData.infinitive.length > 0;
  const isNewVerb = props.verb === NEW_VERB_NAME;

  useEffect(() => {
    (async function () {
      if (props.verb) {
        let state = isNewVerb
          ? initialVerbData()
          : await verbsContext.getVerb(props.verb);

        verbDataDispatch({ type: "SET_VERB_DATA", payload: state });
        setShowModal(true);
      }
    })();
  }, [props.verb]);

  function handleAddVerb() {
    function callback() {
      setShowModal(false);
      verbDataDispatch({
        type: "RESET",
      });
      props.onSave();
    }

    if (isNewVerb) {
      verbsContext.createVerb(verbData).then(callback);
    } else {
      verbsContext.updateVerb(verbData).then(callback);
    }
  }

  function handleCancel() {
    props.onCancel();
    setShowModal(false);
  }

  function onChangeVerbName(text: string) {
    verbDataDispatch({
      type: "SET_VERB_NAME",
      payload: text,
    });
  }

  function handleDeleteVerb() {
    Alert.alert(`Delete the verb '${props.verb}'?`, "", [
      { text: "No" },
      {
        text: "Yes",
        onPress: async () => {
          await verbsContext.deleteVerb(props.verb!);
          props.onSave();
          setShowModal(false);
        },
        style: "destructive",
      },
    ]);
  }

  return (
    <Modal
      visible={showModal}
      title={`${isNewVerb ? "Add" : "Edit"} Verb`}
      headerLeft={<TextButton text="Cancel" onPress={handleCancel} />}
      headerRight={
        <TextButton
          text={isNewVerb ? "Create" : "Update"}
          onPress={handleAddVerb}
          disabled={!allowCreate}
        />
      }
    >
      <View style={styles.body}>
        <TextInput
          variant="outline"
          value={verbData.infinitive}
          onChangeText={onChangeVerbName}
          placeholder="Verb Name"
          style={{ marginBottom: LAYOUT.paddingSm }}
          editable={isNewVerb}
        />
        <ConjugationTable verb={verbData} verbDispatch={verbDataDispatch} />
        <TextButton
          color="danger"
          text="Delete Verb"
          onPress={handleDeleteVerb}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  body: {
    padding: LAYOUT.paddingSm,
  },
});
