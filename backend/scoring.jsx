import differenceInHours from 'date-fns/difference_in_hours';

// medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d
const calculate_score = (votes, item_hour_age, gravity=1.8) => {
  return (votes - 1) / Math.pow(item_hour_age + 2, gravity);
};

export const calculate_for_all = async (db) => {
  // If this becomes too big then can make another smaller table with
  // the minimum information
  const payload = await db.all('select * from post');
  const ranked = payload.map(elem => {
    const birth = new Date(elem.creation_time);
    const rank = calculate_score(elem.upvotes - elem.downvotes,
                                 differenceInHours(Date.now(), birth));
    return {...elem, rank};
  });
  return ranked;
};

export const sort_ranks = (a, b) => {
  if (a.rank < b.rank) return -1;
  else if (a.rank > b.rank) return 1;
  else return 0;
};
