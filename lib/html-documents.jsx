const createElement = require('react').createElement;
const render = require('react-dom/server').renderToString;

export function elem_to_string(elem, props) {
  return render(createElement(elem, props));
}

export function homepage(html, tech_events, e_count) {
  return `
<!doctype html>
<meta charset="utf-8"/>
<meta name="Armenian tech calendar"
      content="See all the tech events in Yerevan and all of Armenia in one place"/>
<head>
  <title>Armenian Community Tech news and Events</title>
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="icon" type="image/gif" href="animated_favicon1.gif" />
  <link rel="preload" href="bundle.js" as="script"/>
  <link href="homepage.css" rel="stylesheet" type="text/css"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
    window.__EVENT_COUNT_THIS_MONTH__ = ${e_count}
  </script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`;
}

export function about(html, tech_events, e_count) {
  return `
<!doctype html>
<meta charset="utf-8"/>
<meta name="About page for silicondzor"
      content="An elboration on silicondzor.com"/>
<head>
  <title>About silicondzor.com</title>
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="icon" type="image/gif" href="animated_favicon1.gif" />
  <link rel="preload" href="bundle.js" as="script"/>
  <link href="about.css" rel="stylesheet" type="text/css"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
    window.__EVENT_COUNT_THIS_MONTH__ = ${e_count}
  </script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`;
}

// Not a XSS because we already did XSS by time data comes into DB.
export function calendar(html, tech_events, e_count) {
  return `
<!doctype html>
<meta charset="utf-8"/>
<meta name="Armenian tech calendar"
      content="See all the tech events in Yerevan and all of Armenia in one place"/>
<head>
  <title>All the tech events in Armenia</title>
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="icon" type="image/gif" href="animated_favicon1.gif" />
  <link rel="preload" href="bundle.js" as="script"/>
  <link href="styles.css" rel="stylesheet" type="text/css"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
    window.__EVENT_COUNT_THIS_MONTH__ = ${e_count}
  </script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`;
}

export function login(html, tech_events, e_count) {
  return `
<!doctype html>
<meta charset="utf-8"/>
<meta name="silicondzor login screen"
      content="Login to silicondzor, post events, comment on news articles"/>
<head>
  <title>Login to silicondzor.com</title>
  <link rel="shortcut icon" href="favicon.ico" />
  <link rel="icon" type="image/gif" href="animated_favicon1.gif" />
  <link rel="preload" href="bundle.js" as="script"/>
  <link href="styles.css" rel="stylesheet" type="text/css"/>
  <link href="react-big-calendar.css" rel="stylesheet" type="text/css"/>
  <script>
    // This way we avoid needless HTTP requests
    window.__ALL_TECH_EVENTS__ = ${JSON.stringify(tech_events)}
    window.__EVENT_COUNT_THIS_MONTH__ = ${e_count}
  </script>
</head>
<body>
  <div id='container'>${html}</div>
  <script src='bundle.js'></script>
</body>
`;
}

export const bug_exchange = login;
