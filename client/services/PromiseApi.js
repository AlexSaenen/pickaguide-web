import request from 'superagent';
import { config } from '../config';
import AuthStore from '../stores/Auth.js';

export default class PromiseApi {
  static auth() {
    const newInstance = Object.create(PromiseApi);
    const token = AuthStore.getState().token;

    if (token) { newInstance.token = token; }

    return newInstance;
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request.get(`${config.apiUrl}${url}`);

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      requestBuilder.end((err, res) => {
        if (err) {
          if (String(err).indexOf('Request has been terminated') !== -1) {
            reject('Server seems to be down, please try again later');
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request
        .post(`${config.apiUrl}${url}`, JSON.stringify(body))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      requestBuilder.end((err, res) => {
        if (err) {
          if (String(err).indexOf('Request has been terminated') !== -1) {
            reject('Server seems to be down, please try again later');
          } else {
            reject(err);
          }
        } else {
          resolve(JSON.parse(res.text));
        }
      });
    });
  }
}
