import { db } from "../db";
import { PlayerEntry } from "../types";

/**
 * Fetches a player from the database.
 * @param userID discord user id
 * @returns PlayerEntry object
 */
export function getPlayer(userID: string): PlayerEntry {
  const player = db
    .prepare("SELECT * FROM players WHERE userID = ?")
    .get(userID);

  //create a new entry if the player doesn't exist
  if (!player) {
    db.prepare("INSERT INTO players (userID) VALUES (?)").run(userID);
    return {
      userID,
      wordlePlays: 0,
      wordleStreak: 0,
      wordleStreakLast: 0,
      connectionsPlays: 0,
      connectionsStreak: 0,
      connectionsStreakLast: 0,
      minisPlays: 0,
      minisStreak: 0,
      minisStreakLast: 0,
      minisTimeLast: 0,
    };
  }

  return player as PlayerEntry;
}
