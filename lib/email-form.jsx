const src_link = 'https://github.com/fxfactorial/silicondzor';

export default (email_account, link) =>
`
<!doctype html>
<body>
  <h1> 🇦🇲 Barev dzes! ${email_account} </h1>
  <p> This email verifies your account on silicondzor.com,
      now you can post post events.
  </p>
  <p>
    click <a href='${link}'> here </a> to verify your account
  </p>
  <p>
    Thanks for being part of the Armenian tech community,
    see the source code of this project <a href=${src_link}> here</a>
  </p>
</body>
</html>
`;
