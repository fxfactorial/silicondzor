export default {
  // Actions
  add_tech_event: '/add-tech-event',
  new_account_verify: '/verify-account/:identifier',
  upvote: '/upvote',
  comment: '/comment',
  submit_job: '/submit-job',
  get_events: '/get-events',
  get_jobs: '/get-jobs',
  get_bugs: '/get-bugs',
  get_news: '/get-news',
  get_comments: '/get-comments',
  post: {
    sign_in: '/sign-in',
    new_account: '/new-account',
    submit_post: '/submit-post'
  },
  // And now the UI
  ui_routes: [
    {to:'/', title:'news'},
    {to:'/submit', title:'submit'},
    {to:'/tech-calendar', title:'tech calendar'},
    {to:'/jobs-board', title:'jobs board'},
    {to:'/bug-bounty', title:'bug bounty'},
    {to:'/resquared', title:'Resquared'},
  ],
  profile:'/user'
};
