import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      submit:"Signup",
      title:"Create an Account",
      success:"Info",
      error:"Some error occurred when creating your account",
      passwd_error:"The passwords do not match",
      first_name:"First name",
      last_name:"Last name",
      password:"Confirm password"
   },
   fr: {
      submit:"Inscription",
      title:"Créer un compte",
      success:"Info",
      error:"Une erreur s'est produite pendant la création du compte",
      passwd_error:"Les mots de passe ne correspondent pas",
      first_name:"Prénom",
      last_name:"Nom",
      password:"Confirmer le mot de passe"
   }
});