import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      submit:"Login",
      title:"Login",
      loginMessage: "Log in to enjoy more of our services",
      email:"email",
      password:"password",
      success:"Success",
      content_success:"You have successfully logged in !",
      error:"Some error occurred when logging in",
      create: "Or create an account"
   },
   fr: {
      submit:"Connection",
      title:"Connection",
      email:"courriel",
      loginMessage: "Connectez vous pour profiter plus de nos services",
      password:"mot de passe",
      success:"Réussi",
      content_success:"Vous êtes maintenant connecté",
      error:"Une erreur s'est produite pendant la connection",
      create: "Ou créer un compte"
   }
});
