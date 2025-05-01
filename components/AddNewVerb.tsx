import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import TileButton from "./TileButton";
import { useState } from "react";

export default function AddNewVerb() {
  const [showModal, setShowModal] = useState(false);

  const handlePress = () => {
    setShowModal(true);
  };

  return (
    <>
      <TileButton
        icon="add-circle-outline"
        label="Add New Verb"
        onPress={handlePress}
      />
      <Modal>
        <View>
          <Text>Oh hey there i'm a modal</Text>
          <Pressable onPress={() => setShowModal(false)}>
            <Text>[CLOSE]</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {},
});
