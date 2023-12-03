import { getPlayer } from "./getPlayer";
import { updatePlayer } from "./updatePlayer";

/**
 * Add a connections play to the database.
 * @param userID discord user id
 * @param gameID connections game id
 */
export function addConnectionsPlay(userID: string, gameID: number): void {
  //fetch the player
  const player = getPlayer(userID);

  //update the player's stats
  // eslint-disable-next-line prefer-const
  let { connectionsPlays, connectionsStreak, connectionsStreakLast } = player;

  connectionsPlays++;

  //check if the player's streak has been broken
  if (gameID !== connectionsStreakLast + 1) {
    connectionsStreak = 1;
  } else {
    connectionsStreak++;
  }

  //update the player's stats
  updatePlayer(userID, {
    connectionsPlays,
    connectionsStreak,
    connectionsStreakLast: gameID,
  });
}
