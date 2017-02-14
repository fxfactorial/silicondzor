export default {
  // Actions
  add_tech_event: '/add-tech-event',
  new_account: '/new-account',
  sign_in: '/sign-in',
  new_account_verify: '/verify-account/:identifier',
  // And now the UI
  ui_routes: {
    about:         {resource: '/about',         link:'about'},
    tech_calendar: {resource: '/tech-calendar', link:'tech-calendar'},
    login:         {resource: '/login',         link:'login'},
    home:          {resource: '/',              link:'home'},
    bug-exchange:  {resource: '/bug-exchange',  link:'bug-exchange'}
  }
};
