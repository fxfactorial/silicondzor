'use strict';

module.exports = {event_count, events};

async function event_count(db_promises) {
  const {event_count} = await db_promises.get(`
select count(*) as event_count from
(select title from event
where (strftime('%m', datetime(end, 'unixepoch')) - 1) =
(strftime('%m', 'now') + 0) group by title);
`);
  return event_count;
}

async function events(db_promises) {
  const pulled =
	// This way we eliminate duplicates, unlikely that
	// descriptions for some events will naturally be redundant
	// but quite likely that people copy paste titles from one
	// event to another
	await db_promises.all(`
select title, all_day, start, end, url, creator, description from event
group by description
`);
  let transformed = pulled.map(item => {
    const start = new Date(item.start).getTime();
    const end = new Date(item.end).getTime();

    return {
      title:item.title,
      allDay: item.all_day ? true : false,
      start,
      end,
      desc: item.description,
      url:item.url,
      sourced_from:item.creator
    };
  });
  return transformed;
}
