export default {
  // Actions
  add_tech_event: '/add-tech-event',
  new_account: '/new-account',
  sign_in: '/sign-in',
  new_account_verify: '/verify-account/:identifier',
  // And now the UI
  ui_routes: [
    {to:'/', title:'news'},
    {to:'/submit', title:'submit'},
    {to:'/tech-calendar', title:'tech calendar'},
    {to:'/jobs-board', title:'jobs board'},
    {to:'/bug-bounty', title:'bug bounty'},
    {to:'/requared', title:'Resquared'}
  ]
};
