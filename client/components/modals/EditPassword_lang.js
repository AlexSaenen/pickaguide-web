import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
   	error: "Some error occurred when updating your password",
   	successTitle: "Successful",
   	successDesc: "Your password has been updated",
   	title: "Update Password",
   	curPass: "Current password",
   	newPass: "New password",
   	conPass: "Confirm password"
   },
   fr:{
   	error: "Des erreurs sont apparus durant la mise à jour de votre mot de passe",
   	successTitle: "Succès",
   	successDesc: "Votre mot de passe a été mis à jour",
   	title: "Mot de passe mis à jour",
   	curPass: "Mot de passe actuel",
   	newPass: "Nouveau mot de passe",
   	conPass: "Confirmez mot de passe"
   }
});