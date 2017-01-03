import ContactUsActions from '../actions/ContactUs.js';
import PromiseApi from './PromiseApi.js';

export default class ContactUsApi {
    static getContactUs() {
        //console.log('Form signin:', form);
//        PromiseApi.post('/account/signup', form) // route a modifier plus tard POST
        PromiseApi.get('/contactus') // route a modifier plus tard GET
        .then((result) => {
            if (result.error) {
                ContactUsActions.requestContactUsError(result.error);
                return;
            }

            ContactUsActions.requestContactUsSuccess(result);
        })
        .catch((err) => {
            ContactUsActions.requestContactUsError(err);
        });
    }
}
