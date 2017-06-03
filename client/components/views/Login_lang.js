import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      submit:"Login",
      title:"Login",
      email:"email",
      password:"password",
      success:"Success",
      content_success:"You have successfully logged in !",
      error:"Some error occurred when logging in"
   },
   fr: {
      submit:"Connection",
      title:"Connection",
      email:"courriel",
      password:"mot de passe",
      success:"Réussi",
      content_success:"Vous êtes maintenant connecté",
      error:"Une erreur s'est produite pendant la connection"
   }
});