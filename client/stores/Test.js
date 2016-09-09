import alt from '../alt';
import TestActions from '../actions/Test.js';
import TestApi from '../services/testApi.js';

class TestStore {
    constructor() {
        this.test = null;
        this.error = null;

        this.bindActions(TestActions);
    }

    onRequestTest() {
        TestApi.getTest();
    }

    onRequestTestSuccess(test) {
        this.error = null;
        this.test = test;
    }

    onRequestTestError(error) {
        this.error = error;
    }
}

export default alt.createStore(TestStore, 'TestStore');
