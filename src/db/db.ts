import sqlite3, { Database } from "better-sqlite3";
import { existsSync, mkdirSync } from "fs";

//creates a /data folder if it doesn't exist
if (!existsSync("./data")) {
  mkdirSync("./data");
}

//creates a new database file if it doesn't exist
export const db: Database = sqlite3("./data/db.sqlite");

//creates the table if it doesn't exist
db.exec(`
CREATE TABLE IF NOT EXISTS players (
  userID TEXT PRIMARY KEY,
  wordlePlays INTEGER DEFAULT 0,
  wordleStreak INTEGER DEFAULT 0,
  wordleStreakLast INTEGER DEFAULT 0,
  connectionsPlays INTEGER DEFAULT 0,
  connectionsStreak INTEGER DEFAULT 0,
  connectionsStreakLast INTEGER DEFAULT 0,
  minisPlays INTEGER DEFAULT 0,
  minisStreak INTEGER DEFAULT 0,
  minisStreakLast INTEGER DEFAULT 0,
  minisTimeLast INTEGER DEFAULT 0
)
`);
