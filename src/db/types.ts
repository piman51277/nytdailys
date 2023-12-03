export interface PlayerEntry {
  userID: string;

  wordlePlays: number;
  wordleStreak: number;
  wordleStreakLast: number;

  connectionsPlays: number;
  connectionsStreak: number;
  connectionsStreakLast: number;

  minisPlays: number;
  minisStreak: number;
  minisStreakLast: number;
  minisTimeLast: number;
}
