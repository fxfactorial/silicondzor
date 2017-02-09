'use strict';

const env = require('./env');
const request_prom = require("request-promise");

const endpoint = `https://translate.yandex.net/api/v1.5/tr.json`;
const yandexTranslatorApiKey = env.yandex.api_key;

let jsonRequest = async (url, params, cb) => {
  let handler = (err, res) => {
    if (err)
      return cb(err);
    let obj;
    try {
      obj = JSON.parse(res.body);
    } catch(e) {
      cb(e);
    }
    return cb(null, obj);
  };
  if (params.get === true)
    await request_prom.get(url, handler);
  else
    await request_prom.post(url, params, handler);
};

let translate = async (text, opts, cb) => {
  await jsonRequest(endpoint + `/translate`, {
    form: {
      text: text,
      key: yandexTranslatorApiKey,
      format: `text`,
      lang: opts.from ? opts.from + `-` + opts.to : opts.to
    }
  }, cb);
};

module.exports = async (textToTranslate) => {
  let title = [{lang: `en`}, {lang: `ru`}, {lang: `hy`}];
  await Promise.all(title.map(async (each) => {
    await translate(textToTranslate, {to: each.lang}, (err, res) => {
      each.translate = res.text[0];
    });
  }));
  return `${title[0].translate}/${title[1].translate}/${title[2].translate}`;
};
