const src_link = 'https://github.com/fxfactorial/silicondzor';
const twitter = 'https://twitter.com/iteratehckrspac';

export default (email_account, link, html=true) =>
  html ?
  `
<!doctype html>
<body>
  <h1> 🇦🇲 Barev dzes! ${email_account} </h1>
  <p> This email lets you verify your account on silicondzor.com,
      click the link so that you can post new events. The link
      is only good for 24 hours.
  </p>
  <p>
    click <a href='${link}'> here </a> to verify your account
  </p>
  <p>
    Thanks for being part of the Armenian tech community. Follow our
    twitter account at <a href=${twitter}>@iteratehckrspac</a>, it 
    automatically tweets the morning of any tech event so you can stay 
    informed about the day's scheduled events.
  </p>
  <p> 
     See the source code of this project <a href=${src_link}>here</a>.
     Source code improvements are greatly appreciated via github pull requests.
  </p>
</body>
</html>
` : `
Barev dzes! ${email_account}
click on ${link} to verify your account,

Thanks for being part of the Armenian tech community,
see the source code of this project: ${src_link}
`;
