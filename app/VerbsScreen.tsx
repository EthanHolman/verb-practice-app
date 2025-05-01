import AddNewVerb from "@/components/AddNewVerb";
import { useNavigation } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useState } from "react";
import { FlatList, Pressable, Text, TextInput, View } from "react-native";

export default function VerbsScreen() {
  const [myVal, setMyVal] = useState("");
  const [verbs, setVerbs] = useState<string[]>([]);
  const db = useSQLiteContext();

  const refresh = () =>
    db.getAllAsync("select * from test").then((allRows) => {
      console.log(allRows);
      setVerbs(allRows.map((x) => x["value"]));
    });

  useEffect(() => {
    refresh();
  }, []);

  const handlePress = async () => {
    db.execSync(`
      create table if not exists test (id integer primary key not null, value text not null);
      insert into test (value) values ('${myVal}');
      `);

    refresh();

    setMyVal("");
  };

  return (
    <View>
      <AddNewVerb />
      {verbs.length ? (
        <FlatList
          data={verbs}
          renderItem={(item) => <Text>{item.item}</Text>}
        />
      ) : (
        <Text>Your verbs will be here</Text>
      )}
      <TextInput
        value={myVal}
        onChangeText={setMyVal}
        style={{ borderWidth: 1, fontSize: 16 }}
      />
      <Pressable
        style={{ height: 50, width: 250, borderWidth: 1, borderColor: "green" }}
        onPress={handlePress}
      >
        <Text>Press Me</Text>
      </Pressable>
    </View>
  );
}
