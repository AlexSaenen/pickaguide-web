import request from 'superagent';

import { config } from 'client/config';
import AuthStore from 'stores/user/Auth.js';


export default class PromiseApi {

  static auth(token = null) {
    const newInstance = Object.create(PromiseApi);
    const credentials = AuthStore.getState().credentials;

    if (credentials) { newInstance.token = credentials.token; }
    if (token) { newInstance.token = token; }

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

  static upload(url, body) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request
        .post(`${config.apiUrl}${url}`, body)
        .set('Accept', 'application/json');

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      PromiseApi._handleResponse(requestBuilder, { resolve, reject });
    });
  }

  static download(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();

      const callback = () => {
        if (req.status === 200) {
          const blob = new Blob([req.response], { type: 'image/jpeg' });
          const reader = new FileReader();
          reader.onload = (dataLoad) => {
            resolve(dataLoad.target.result);
          };

          reader.readAsDataURL(blob);
        } else {
          reject('Download failed');
        }
      };

      req.addEventListener('load', callback);
      req.open('GET', `${config.apiUrl}${url}`, true);

      if (this.token) { req.setRequestHeader('Authorization', `Bearer ${this.token}`); }

      req.responseType = 'arraybuffer';
      req.send(null);
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

  static delete(url) {
    return new Promise((resolve, reject) => {
      const requestBuilder = request.delete(`${config.apiUrl}${url}`);

      if (this.token) { requestBuilder.set('Authorization', `Bearer ${this.token}`); }

      PromiseApi._handleResponse(requestBuilder, { resolve, reject });
    });
  }

}
