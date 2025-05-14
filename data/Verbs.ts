import AsyncStorage from "@react-native-async-storage/async-storage";
import { IVerb } from "./IVerb";

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
    const found = await AsyncStorage.getItem(`verb_${verbName}`);
    if (!found) throw new Error("Verb not found");

    return JSON.parse(found);
  } catch (error) {
    console.error("Error fetching verb:", error);
    throw new Error("Error fetching verb: " + error);
  }
}

export async function getAllVerbs(): Promise<IVerb[]> {
  try {
    const verbs = JSON.parse((await AsyncStorage.getItem("verbs")) ?? "[]").map(
      (x: string) => `verb_${x}`
    );

    const rawVerbData = await AsyncStorage.multiGet(verbs);
    console.log(rawVerbData);
    return [];
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
    await AsyncStorage.setItem(`verb_${verb.infinitive}`, JSON.stringify(verb));
  } catch (error) {
    console.error("Error saving verb:", error);
    throw new Error("Error saving verb: " + error);
  }
}

export async function updateVerb(verb: IVerb): Promise<void> {
  try {
    await AsyncStorage.setItem(`verb_${verb.infinitive}`, JSON.stringify(verb));
  } catch (error) {
    console.error("Error updating verb:", error);
    throw new Error("Error updating verb: " + error);
  }
}
