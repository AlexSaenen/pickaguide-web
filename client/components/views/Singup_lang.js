import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      submit:"Signup",
      title:"Create an Account",
      signupMessage: "Create your account",
      signupFollowup: "And start using our services, do not forget to personnalize your profile as well",
      success:"Info",
      error:"Some error occurred when creating your account",
      passwd_error:"The passwords do not match",
      first_name:"First name",
      last_name:"Last name",
      password:"Password",
      passwordConfirm:"Confirm password",
      success_info:"You will receive a confirmation email on the adress you provide here"
   },
   fr: {
      submit:"Inscription",
      title:"Créer un compte",
      success:"Info",
      signupMessage: "Créez votre compte",
      signupFollowup: "Et commencez à utiliser nos services, n'oubliez pas de personnaliser votre profile",
      error:"Une erreur s'est produite pendant la création du compte",
      passwd_error:"Les mots de passe ne correspondent pas",
      first_name:"Prénom",
      last_name:"Nom",
      password:"Mot de passe",
      passwordConfirm:"Confirmer le mot de passe",
      success_info:"Vous allez très vite recevoir un courriel de confirmation a l'adresse indiqué"
   }
});
