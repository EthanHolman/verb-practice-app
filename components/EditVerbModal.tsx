import { Modal, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import { useContext, useEffect, useReducer, useState } from "react";
import { COLORS, LAYOUT } from "@/styles/theme";
import TextInput from "./TextInput";
import ConjugationTable from "./ConjugationTable";
import { initialVerbData, verbDataReducer } from "@/reducers/VerbDataReducer";
import { VerbContext } from "@/contexts/VerbContext";
import Typography from "./Typography";
import { NEW_VERB_NAME } from "@/constants";

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

  return (
    <Modal
      visible={showModal}
      transparent={false}
      presentationStyle="pageSheet"
      animationType="slide"
    >
      <SafeAreaView style={styles.modal}>
        <View style={styles.modalHeader}>
          <Pressable onPress={handleCancel}>
            <Typography color="primary">Cancel</Typography>
          </Pressable>
          <Typography style={styles.modalHeaderTitle}>
            {isNewVerb ? "Add" : "Edit"} Verb
          </Typography>
          <Pressable onPress={handleAddVerb} disabled={!allowCreate}>
            <Typography color={allowCreate ? "primary" : "border"}>
              {isNewVerb ? "Create" : "Update"}
            </Typography>
          </Pressable>
        </View>
        <View style={styles.modalContent}>
          <TextInput
            variant="outline"
            value={verbData.infinitive}
            onChangeText={onChangeVerbName}
            placeholder="Verb Name"
            style={{ marginBottom: LAYOUT.paddingSm }}
            editable={isNewVerb}
          />
          <ConjugationTable verb={verbData} verbDispatch={verbDataDispatch} />
        </View>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    backgroundColor: COLORS.foreground,
    flex: 1,
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    padding: LAYOUT.paddingSm,
  },
  modalHeaderTitle: {
    flexGrow: 1,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalContent: {
    padding: LAYOUT.paddingSm,
  },
});
