import { db } from "../db";
import { PlayerEntry } from "../types";

/**
 * Updates a player's stats in the database.
 * @param userID discord user id
 * @param update object containing the fields to update
 */
export function updatePlayer(
  userID: string,
  update: Partial<PlayerEntry>
): void {
  const player = db
    .prepare("SELECT * FROM players WHERE userID = ?")
    .get(userID);

  //if the player doesn't exist, create a new entry
  if (!player) {
    db.prepare("INSERT INTO players (userID) VALUES (?)").run(userID);
  }

  db.prepare(
    `
    UPDATE players
    SET
      wordlePlays = wordlePlays + ?,
      wordleStreak = wordleStreak + ?,
      wordleStreakLast = ?,
      connectionsPlays = connectionsPlays + ?,
      connectionsStreak = connectionsStreak + ?,
      connectionsStreakLast = ?,
      minisPlays = minisPlays + ?,
      minisStreak = minisStreak + ?,
      minisStreakLast = ?,
      minisTimeLast = ?
    WHERE userID = ?
  `
  ).run(
    update.wordlePlays ?? 0,
    update.wordleStreak ?? 0,
    update.wordleStreakLast ?? 0,
    update.connectionsPlays ?? 0,
    update.connectionsStreak ?? 0,
    update.connectionsStreakLast ?? 0,
    update.minisPlays ?? 0,
    update.minisStreak ?? 0,
    update.minisStreakLast ?? 0,
    update.minisTimeLast ?? 0,
    userID
  );
}
