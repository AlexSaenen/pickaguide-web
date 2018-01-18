import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
   	error: "Some error occurred when deleting your account",
   	successTitle: "Successful",
   	successDesc: "Your account has been deleted",
   	title: "Login to delete your account",
   	errorTitle: "Some error occurred when deleting your account",
   	errorDesc: "Does not seem like your email address",
   	email: "email",
   	password: "password"
   },
   fr:{
   	error: "Des erreurs sont apparus durant la suppression de votre compte",
   	successTitle: "Succès",
   	successDesc: "Votre compte a été supprimé",
   	title: "Connectez-vous pour supprimer ton compte",
   	errorTitle: "Des erreurs sont apparus durant la suppression de votre compte",
   	errorDesc: "Votre email semble mauvais",
   	email: "email",
   	password: "mot de passe"
   }
});