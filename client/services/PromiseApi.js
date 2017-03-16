import request from 'superagent';

import { config } from 'client/config';
import AuthStore from 'stores/Auth.js';


export default class PromiseApi {

  static auth() {
    const newInstance = Object.create(PromiseApi);
    const credentials = AuthStore.getState().credentials;

    if (credentials) { newInstance.token = credentials.token; }

    return newInstance;
  }

  static _handleResponse(requestBuilder, callbacks) {
    requestBuilder.end((err, res) => {
      if (err) {
        if (String(err).indexOf('Request has been terminated') !== -1) {
          callbacks.reject('Server seems to be down, please try again later');
        } else {
          let errorMessage = err.statusText;

          try {
            errorMessage = JSON.parse(res.text).message;
          } catch (e) {
            errorMessage = 'An unexpected error occured';
          }

          callbacks.reject(errorMessage);
        }
      } else {
        const jsonBody = JSON.parse(res.text);
        if (jsonBody.code !== undefined && jsonBody.code !== 0) {
          callbacks.reject(`${jsonBody.message} (code ${jsonBody.code})`);
        } else {
          callbacks.resolve(jsonBody);
        }
      }
    });
  }

  static get(url) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request.get(`${config.apiUrl}${url}`);

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      PromiseApi._handleResponse(requestBuilder, { resolve, reject });
    });
  }

  static post(url, body) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request
        .post(`${config.apiUrl}${url}`, JSON.stringify(body))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      PromiseApi._handleResponse(requestBuilder, { resolve, reject });
    });
  }

  static put(url, body) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request
        .put(`${config.apiUrl}${url}`, JSON.stringify(body))
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json');

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      PromiseApi._handleResponse(requestBuilder, { resolve, reject });
    });
  }
}
