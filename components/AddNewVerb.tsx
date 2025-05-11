import { Modal, Pressable, SafeAreaView, StyleSheet, View } from "react-native";
import TileButton from "./TileButton";
import { useContext, useReducer, useState } from "react";
import { COLORS, LAYOUT } from "@/styles/theme";
import TextInput from "./TextInput";
import ConjugationTable from "./ConjugationTable";
import { initialVerbData, verbDataReducer } from "@/reducers/VerbDataReducer";
import { VerbContext } from "@/contexts/VerbContext";
import Typography from "./Typography";

type Props = {
  onAdd?: () => void;
};

export default function AddNewVerb(props: Props) {
  const [showModal, setShowModal] = useState(false);
  const [verbData, verbDataDispatch] = useReducer(
    verbDataReducer,
    initialVerbData()
  );

  const verbsContext = useContext(VerbContext);

  const allowCreate = verbData.infinitive.length > 0;

  const handleAddVerb = () => {
    verbsContext.createVerb(verbData).then(() => {
      props.onAdd && props.onAdd();
      setShowModal(false);
      verbDataDispatch({
        type: "RESET",
      });
    });
  };

  const onChangeVerbName = (text: string) =>
    verbDataDispatch({
      type: "SET_VERB_NAME",
      payload: text,
    });

  return (
    <View>
      <TileButton
        icon="add-circle-outline"
        label="Add New Verb"
        onPress={() => setShowModal(true)}
      />
      <Modal
        visible={showModal}
        transparent={false}
        presentationStyle="pageSheet"
        animationType="slide"
      >
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Pressable onPress={() => setShowModal(false)}>
              <Typography color="primary">Cancel</Typography>
            </Pressable>
            <Typography style={styles.modalHeaderTitle}>Add Verb</Typography>
            <Pressable onPress={handleAddVerb} disabled={!allowCreate}>
              <Typography color={allowCreate ? "primary" : "border"}>
                Create
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
            />
            <ConjugationTable verb={verbData} verbDispatch={verbDataDispatch} />
          </View>
        </SafeAreaView>
      </Modal>
    </View>
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
