import TestActions from '../actions/Test.js';
import PromiseApi from './promiseApi.js';

export default class TestApi {
    static getTest() {
        PromiseApi.get('/tests/getTest')
        .then((result) => {
            if (result.error) {
                TestActions.requestTestError(result.error);
                return;
            }

            TestActions.requestTestSuccess(result.tests);
        })
        .catch((err) => {
            TestActions.requestTestError(err);
        });
    }
}
