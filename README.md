silicondzor 🇦🇲
----------------

This is the source code of [silicondzor](http://silicondzor.com)

If you use any of this code then you must release it along with your
code since this is licensed as GPL-3.0.

Եթե դուք օգտագործեք այս կոդի որևէ մաս, ապա դուք պետք է այն հրապարակեք
ձեր կոդի հետ միասին, քանի որ այն լիցենզավորված է որպես GPL-3.0.

Если вы используете этот код, то вы должны выпустить его на ряду с
вашим кодом так, как это заверено в лицензии GPL-3.0.

# setup #

To run in production then this assumes that you have the server keys 
and the database. To create the database, do: `npm run create-db`.

For `npm run create-db` to work, you need to have `sqlite3` installed
on your computer, you can install it with `aptitude` on `Ubuntu` and
`Debian`. After that you should do `npm install` to install all the
dependencies that you need for this project. Remember, you can see all
the commands in `package.json` in the `scripts` field. 

```
  "scripts": {
    "babel-watch": "NODE_ENV='debug' babel lib/*.jsx --watch --out-dir .",
    "webpack-watch": "NODE_ENV='debug' webpack --progress -d --colors --watch",
    "server-watch": "NODE_ENV='debug' nodemon --harmony_async_await backend/server.js",
    "prod-build": "NODE_ENV='production' webpack --config webpack.prod.js --progress --colors -p && babel lib/*.jsx --out-dir .",
    "create-db": "cat backend/setup_database.sql | sqlite3 silicondzor.db"
  },
```

To get the best experience, open 3 terminals and in the 1st one do
`npm run babel-watch`, then `npm run webpack-watch` in the 2nd, and in
the 3rd one `npm run server-watch`. This will automatically rebuild
everything whenever you have a change in the source code and restart
the server if something changed to the server side code.
