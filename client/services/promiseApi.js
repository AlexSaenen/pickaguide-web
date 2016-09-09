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
                } else {
                    resolve(JSON.parse(res.text));
                }
            });
        });
    }
}
