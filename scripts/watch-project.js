'use strict';

const spawn = require('child_process').spawn;

const watching = [
  {service: "babel-watch"},
  {service: "webpack-watch"},
  // {service: "sass-watch"},
  {service: "server-watch"}
];

watching.forEach(({service}) => {
  const child = spawn('npm', ['run', service]);
  child.stdout.on('data', d => console.log(d.toString()));
  child.stderr.on('data', d => console.log(d.toString()));
});
