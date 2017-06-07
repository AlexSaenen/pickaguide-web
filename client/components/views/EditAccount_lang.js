import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      title:"Edit your Account",
      btnPasswd:"Change password",
      btnEmail:"Change email",
      msgConfirmEmail:"You need to confirm your email",
      btnDelete:"Delete Account",
      deleteConfirm:"Do you really wish to delete your account? All your information will be deleted"
   },
   fr:{
      title:"Editez votre compte",
      btnPasswd:"Changez votre mot de passe",
      btnEmail:"Changez votre courriel",
      msgConfirmEmail:"Entrez votre courriel à nouveau",
      btnDelete:"Supprimer le compte",
      deleteConfirm:"Êtes-vous sur de vouloir supprimer votre compte? Toutes vos informations seront définitivement supprimées"
   }
});