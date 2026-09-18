import { useEffect, useState } from "react";

const CODEFORCES_HANDLE = "aysh_mzmdr";
// Last known rating/rank, used only if the live Codeforces API call fails
// (network error, CORS, API downtime) so the stat never breaks.
const FALLBACK_RATING = 1006;
const FALLBACK_RANK = "newbie";

/**
 * Fetches a Codeforces handle's current rating and rank (e.g. "newbie",
 * "pupil", "expert") live from the public Codeforces API. `rank` comes
 * back as title-cased text, or null if the account has no rank yet
 * (Codeforces omits the field entirely until a rated contest is played).
 * `rating` stays null until the request settles (success or failure).
 */
export function useCodeforcesRating() {
  const [rating, setRating] = useState(null);
  const [rank, setRank] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetch(`https://codeforces.com/api/user.info?handles=${CODEFORCES_HANDLE}`)
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const user = data?.result?.[0];
        setRating(typeof user?.rating === "number" ? user.rating : FALLBACK_RATING);
        setRank(typeof user?.rank === "string" ? titleCase(user.rank) : null);
      })
      .catch(() => {
        if (cancelled) return;
        setRating(FALLBACK_RATING);
        setRank(titleCase(FALLBACK_RANK));
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { rating, rank };
}

function titleCase(text) {
  return text.replace(/\b\w/g, (char) => char.toUpperCase());
}
