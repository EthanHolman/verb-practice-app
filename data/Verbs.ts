import AsyncStorage from "@react-native-async-storage/async-storage";
import { IVerb } from "./IVerb";

function buildKey(val: string): string {
  return `verb_${val}`;
}

export async function initVerbs(): Promise<void> {
  try {
    const verbs = await AsyncStorage.getItem("verbs");
    if (!verbs) {
      await AsyncStorage.setItem("verbs", JSON.stringify([]));
    }
  } catch (error) {
    console.error("Error initializing verbs:", error);
    throw new Error("Error initializing verbs: " + error);
  }
}

export async function getVerbNames(): Promise<string[]> {
  try {
    return JSON.parse((await AsyncStorage.getItem("verbs")) ?? "[]");
  } catch (error) {
    console.error("Error fetching verbs:", error);
    throw new Error("Error fetching verbs: " + error);
  }
}

export async function getVerb(verbName: string): Promise<IVerb> {
  try {
    const found = await AsyncStorage.getItem(buildKey(verbName));
    if (!found) throw new Error("Verb not found");

    return JSON.parse(found);
  } catch (error) {
    console.error("Error fetching verb:", error);
    throw new Error("Error fetching verb: " + error);
  }
}

export async function getVerbs(verbNames: string[]): Promise<IVerb[]> {
  try {
    const toReturn: IVerb[] = [];
    const found = await AsyncStorage.multiGet(
      verbNames.map((name) => buildKey(name))
    );
    for (const item of found) if (item[1]) toReturn.push(JSON.parse(item[1]));

    return toReturn;
  } catch (error) {
    console.error("Error fetching verbs:", error);
    throw new Error("Error fetching verbs: " + error);
  }
}

export async function createVerb(verb: IVerb): Promise<void> {
  try {
    const existingVerbs = await getVerbNames();
    existingVerbs.push(verb.infinitive);
    await AsyncStorage.setItem("verbs", JSON.stringify(existingVerbs));
    await AsyncStorage.setItem(buildKey(verb.infinitive), JSON.stringify(verb));
  } catch (error) {
    console.error("Error saving verb:", error);
    throw new Error("Error saving verb: " + error);
  }
}

export async function updateVerb(verb: IVerb): Promise<void> {
  try {
    await AsyncStorage.setItem(buildKey(verb.infinitive), JSON.stringify(verb));
  } catch (error) {
    console.error("Error updating verb:", error);
    throw new Error("Error updating verb: " + error);
  }
}

export async function deleteVerb(verbName: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(buildKey(verbName));
    let existingVerbs = await getVerbNames();
    existingVerbs = existingVerbs.filter((x) => x !== verbName);
    await AsyncStorage.setItem("verbs", JSON.stringify(existingVerbs));
  } catch (error) {
    console.error("Error deleting verb:", error);
    throw new Error("Error deleting verb: " + error);
  }
}

export async function resetDatabase(): Promise<void> {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error("Error clearing asyncstorage DB:", error);
    throw new Error("Error clearing asyncstorage DB:" + error);
  }
}
