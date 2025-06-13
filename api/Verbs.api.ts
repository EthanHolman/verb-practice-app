import { API_BASE_URL } from "@/constants";
import { IVerb } from "@/data/IVerb";

export async function getVerbs(filter?: string): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/verb`);
    if (!response.ok)
      throw new Error(`Error fetching verbs from API: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function getVerb(verb: string): Promise<IVerb> {
  try {
    const response = await fetch(`${API_BASE_URL}/verb/${verb}`);
    if (!response.ok)
      throw new Error(
        `Error getting verb '${verb}' from API: ${response.status}`
      );
    return await response.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export async function putVerb(verb: IVerb): Promise<void> {
  try {
    const response = await fetch(`${API_BASE_URL}/verb/${verb.infinitive}`, {
      method: "PUT",
      body: JSON.stringify(verb),
    });
    if (!response.ok)
      throw new Error(
        `Error putting verb '${verb.infinitive}' to API: ${response.status}`
      );
  } catch (error) {
    console.error(error);
    throw error;
  }
}
