import { getPlayer } from "./getPlayer";
import { updatePlayer } from "./updatePlayer";

/**
 * Add a minis play to the database.
 * @param userID discord user id
 * @param gameID minis game id
 * @param time time of the minis game
 */
export function addMinisPlay(
  userID: string,
  gameID: number,
  time: number
): void {
  //fetch the player
  const player = getPlayer(userID);

  //update the player's stats
  // eslint-disable-next-line prefer-const
  let { minisPlays, minisStreak, minisStreakLast } = player;

  minisPlays++;

  //check if the player's streak has been broken
  if (gameID !== minisStreakLast + 1) {
    minisStreak = 1;
  } else {
    minisStreak++;
  }

  //update the player's stats
  updatePlayer(userID, {
    minisPlays,
    minisStreak,
    minisStreakLast: gameID,
    minisTimeLast: time,
  });
}
