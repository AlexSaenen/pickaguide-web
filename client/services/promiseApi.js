import request from 'superagent';
import { config } from '../config';

export default class PromiseApi {
  static get(url) {
    return new Promise((resolve, reject) => {
      request
        .get(`${config.apiUrl}${url}`)
        .end((err, res) => {
          if (err) {
            reject(err);
          }

          resolve(JSON.parse(res.text));
        });
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      request
        .post(`${config.apiUrl}${url}`, JSON.stringify(body))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            if (String(err).indexOf('Request has been terminated') !== -1) {
              reject('Server seems to be down, please try again later');
            }

            reject(err);
          }

          resolve(JSON.parse(res.text));
        });
    });
  }
}
