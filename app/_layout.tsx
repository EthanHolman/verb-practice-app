import { Stack } from "expo-router";
import { SQLiteDatabase, SQLiteProvider } from "expo-sqlite";

export default function RootLayout() {
  return (
    <SQLiteProvider databaseName="app.db" onInit={migrateDbIfNeeded}>
      <Stack>
        <Stack.Screen
          name="index"
          options={{ headerShown: false, title: "Home" }}
        />
        <Stack.Screen
          name="PracticeScreen"
          options={{ title: "Practice Verbs" }}
        />
        <Stack.Screen
          name="VerbsScreen"
          options={{ title: "View + Edit Verbs" }}
        />
      </Stack>
    </SQLiteProvider>
  );
}
async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
      PRAGMA foreign_keys = TRUE;

      CREATE TABLE IF NOT EXISTS verb (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS tense (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS person (
        id INTEGER PRIMARY KEY NOT NULL,
        name TEXT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS conjugation (
        id INTEGER PRIMARY KEY NOT NULL,
        verb_id INTEGER NOT NULL REFERENCES verb(id),
        person_id INTEGER NOT NULL REFERENCES person(id),
        tense_id INTEGER NOT NULL REFERENCES tense(id),
        value TEXT NOT NULL
      );
    `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}
