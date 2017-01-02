import alt from '../alt';

import ContactUsActions from '../actions/ContactUs.js';
import ContactUsApi from '../services/ContactUs.js';

class UserStore {
  constructor() {
    this.message = '';
    this.code = 0;
    this.bindActions(ContactUsActions);
  }

  onRequestContactUs() {
    console.log('Try to contact API');
    ContactUsApi.getContactUs();
  }

  onRequestContactUsSuccess(profileInfo) {
    // this.error = null;
    console.log('SUC', profileInfo);
    // this.message = profileInfo.result;
    this.message = {
      nom: 'Sangoï',
      prenom: 'Lucas',
      DateDeNaissance: '10 janvier 1908',
      Sexe: 'Masculin',
      email: 'lucas.sangoi@epitech.eu',
      numTel: '0670628885',
      Ville: 'Canterbury',
      DescriptionPerso: 'Salut, je m\'appelle Lucas, je viens de Toulouse,'
      + 'je suis actuellement en 4ème année à EPITECH, une école d\'informatique.'
      + ' Ce site fait parti d\'un projet de fin d\'étude dans le cadre de mon école,'
      + ' j\'espère que vous apprécierez votre expérience sur notre site !',
      CentreDinteret: 'Football, informatique, sortir',
      photo: 'https://cdn.local.epitech.eu/userprofil/profilview/lucas.sangoi.jpg',
    };
    this.code = 200;
  }

  onRequestContactUsError(error) {
    console.log('ERR', error);
    // this.message = JSON.stringify(error.response.body) !== undefined ?
    // JSON.stringify(error.response.body.err) : JSON.stringify(error);
    // this.message = JSON.stringify(error);
    // this.message = "SUCCESS";
    this.message = {
      nom: 'Sangoï',
      prenom: 'Lucas',
      DateDeNaissance: '10 janvier 1908',
      Sexe: 'Masculin',
      email: 'lucas.sangoi@epitech.eu',
      numTel: '0670628885',
      Ville: 'Canterbury',
      DescriptionPerso: 'Salut, je m\'appelle Lucas, je viens de Toulouse,'
      + 'je suis actuellement en 4ème année à EPITECH, une école d\'informatique.'
      + ' Ce site fait parti d\'un projet de fin d\'étude dans le cadre de mon école,'
      + ' j\'espère que vous apprécierez votre expérience sur notre site !',
      CentreDinteret: 'Football, informatique, sortir',
      photo: 'https://cdn.local.epitech.eu/userprofil/profilview/lucas.sangoi.jpg',
    };
    this.code = 400;
  }
}

export default alt.createStore(UserStore, 'UserStore');
