import { getPlayer } from "./getPlayer";
import { updatePlayer } from "./updatePlayer";

/**
 * Add a wordle play to the database.
 * @param userID discord user id
 * @param gameID wordle game id
 */
export function addWordlePlay(userID: string, gameID: number): void {
  //fetch the player
  const player = getPlayer(userID);

  //update the player's stats
  // eslint-disable-next-line prefer-const
  let { wordlePlays, wordleStreak, wordleStreakLast } = player;

  wordlePlays++;

  //check if the player's streak has been broken
  if (gameID !== wordleStreakLast + 1) {
    wordleStreak = 1;
  } else {
    wordleStreak++;
  }

  //update the player's stats
  updatePlayer(userID, {
    wordlePlays,
    wordleStreak,
    wordleStreakLast: gameID,
  });
}
