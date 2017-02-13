silicondzor 🇦🇲
-----------

This is the source code of [silicondzor](http://silicondzor.com)

If you use any of this code then you must release it along with your
code since this is licensed as GPL-3.0.

Եթե դուք օգտագործեք այս կոդի որևէ մաս, ապա դուք պետք է այն հրապարակեք
ձեր կոդի հետ միասին, քանի որ այն լիցենզավորված է որպես GPL-3.0.

Если вы используете этот код, то вы должны выпустить его на ряду с
вашим кодом так, как это заверено в лицензии GPL-3.0.

# Adding a Facebook group
To add a FB group, just checkout the `groups.json` file, add a
`Facebook` group name and its ID, then open a pull request with the
new group added.

# Purpose 

Use this codebase as a learning experience, to see how a professional 
project is done and how a codebase is organized. 

This project has examples of: 

0. Making a modern Web application using node as the backend.
1. Using webpack effectively for both development and production.
2. Using package.json effectively for all your project build needs.
3. Using HTTPS easily with `letsencrypt`.
4. Using React for server side rendering.
5. Using React for the front end with JSX.
6. Using sqlite as the backing relational database.
7. Using express as a server.
8. Calling the Facebook API.
9. Using Promises, wrapping callback APIs as Promises.
10. Sharing code between the frontend and backend.
11. Securely storing your users passwords with bcrypt.
12. Using `ES7` features of `async`, `await`.
13. Turning your app into a `systemd` service
14. Sending enduser HTML emails with nodemailer.
15. Creating a simple tweet bot service ad-hoc and on schedule.
16. Using React-router both on the client and server side.

# On a server

Once you deploy this project to a server, you often want to keep it up
and alive. For you you should use the standard Linux process manager
tool called `systemd`. This project include a `silicondzor.service`
file mostly setup for this project. You can adjust this file and place
it in `/etc/systemd/system`. `systemd` will watch your process and 
restart it when it dies, monitors it for you.

Now to start your app, do `systemctl start silicondzor.service`. To make
sure your app starts whenever your server starts, do: 
`systemctl enable silicondzor.service`. Other choices are `stop` and 
`restart`.

You'll probably want to see what's happening as well, your console.log 
output will go to `/var/log/syslog`. See it update in real time with: 
`tail -f /var/log/syslog`.

To see only the logs relevant to your service, do `journalctl -u
silicondzor`

For convenience there is a `deploy-restart` option for pushing a
project in a production flow, it assumes you have `silicondzor` as a
named connection in your `~/.ssh/config` and that `silicondzor` is a
directory in the home directory of the sshed in user.

# Setting up for development

1. First fork this project, you can do that by click `fork` in the top
2. Then clone the project locally with `git`. (Will be `git clone
   ...`)
3. Once project is cloned locally do `npm run setup-dependencies` in
   the root of the project. This assumes you're using
   `Debian`/`Ubuntu` and it installed `sqlite3`
4. Then do `npm install`, this downloads all the JavaScript needed for
   this project.
5. Now you can create a database, do that with `npm run create-db`.

To get the best experience, open 3 terminals and in the 1st one do
`npm run babel-watch`, then `npm run webpack-watch` in the 2nd, and in
the 3rd one `npm run server-watch`. This will automatically rebuild
everything whenever you have a change in the source code and restart
the server if something changed to the server side code.

Note: You might get trouble with `sqlite3` or `bcrypt` not properly
loading as a module, try doing: `npm install sqlite3
--build-from-source` and `npm install bcrypt --build-from-source`.

Remember, you can see all the commands in `package.json` in the
`scripts` field, these come up for `npm run <some_script_name>`.

```
  "scripts": {
    "babel-watch": "NODE_ENV='debug' babel lib/*.jsx --watch --out-dir .",
    "webpack-watch": "NODE_ENV='debug' webpack --progress -d --colors --watch",
    "server-watch": "NODE_ENV='debug' nodemon --harmony_async_await backend/server.js",
    "prod-build": "NODE_ENV='production' webpack --config webpack.prod.js --progress --colors -p && babel lib/*.jsx --out-dir .",
    "create-db": "cat backend/setup_database.sql | sqlite3 silicondzor.db"
  },
```
