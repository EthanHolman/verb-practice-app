import { COLORS, TYPOGRAPHY } from "@/styles/theme";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import TextInput from "./TextInput";
import { IVerb } from "@/data/IVerb";
import Button from "./Button";
import { VerbDataAction } from "@/reducers/VerbDataReducer";

function ColumnHeader(props: { text: string }) {
  return <Text style={[styles.cell, styles.columnHeader]}>{props.text}</Text>;
}

function EditColumnHeader(props: {
  text: string;
  onChange: (text: string) => void;
}) {
  return (
    <TextInput
      style={[styles.cell, styles.columnHeader]}
      value={props.text}
      onChangeText={props.onChange}
      placeholder="Tense..."
    />
  );
}

function Cell(props: { value: string }) {
  return <Text style={styles.cell}>{props.value}</Text>;
}

function EditCell(props: { value: string; onChange: (text: string) => void }) {
  return (
    <TextInput
      style={styles.cell}
      value={props.value}
      onChangeText={props.onChange}
      placeholder="Conjugation..."
    />
  );
}

type Props = {
  verb: IVerb;
  verbDispatch: React.ActionDispatch<[action: VerbDataAction]>;
};

export default function ConjugationTable(props: Props) {
  const [newTense, setNewTense] = useState("");

  const handleEdit = (tense: string, index: number, value: string) =>
    props.verbDispatch({
      type: "UPDATE_CONJUGATION",
      payload: { tense, index, value },
    });

  const addTense = () => {
    props.verbDispatch({
      type: "ADD_TENSE",
      payload: newTense,
    });
    setNewTense("");
  };

  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <ColumnHeader text="" />
        <Cell value="Me" />
        <Cell value="You" />
        <Cell value="He/She/It" />
        <Cell value="Them" />
        <Cell value="We" />
      </View>
      {props.verb.conjugations.map((conj) => (
        <View style={styles.column} key={conj.tense}>
          <ColumnHeader text={conj.tense} />
          {conj.values.map((value, i) => (
            <EditCell
              key={i}
              value={value}
              onChange={(text) => handleEdit(conj.tense, i, text)}
            />
          ))}
        </View>
      ))}
      <View style={styles.column}>
        <EditColumnHeader text={newTense} onChange={setNewTense} />
        <Button label="Add Tense" onPress={addTense} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  column: {
    width: "33%",
  },
  cell: {
    padding: 8,
    fontSize: TYPOGRAPHY.md,
    borderColor: COLORS.border,
    borderBottomWidth: 1,
  },
  columnHeader: {
    fontWeight: "500",
  },
});
