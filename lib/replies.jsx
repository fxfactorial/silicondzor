export default {
  success: 'success',
  failure: 'failure',
  invalid_email_already_registered:`Email account already registered`,
  invalid_username_already_picked: `Username already picked`,
  invalid_email: `Email account doesn't appear to be valid`,
  invalid_credentials: `Username or password are incorrect`,
  invalid_session: `Be sure you're logged in in order to create events`,
  unknown_resource: `
<!doctype html>
<meta charset='utf-8'></meta>
<body>
  <h3> Sorry, I don't know what resource you're trying to access </h3>
  <p>
    Head back to <a href='http://silicondzor.com'>silicondzor.com</a>
  </p>
</body>
`,
  fail(reason) { return JSON.stringify({result:this.failure, reason}); },
  ok() { return JSON.stringify({result:this.success}); }
};
