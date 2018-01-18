import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
   	errorTitle: "Some error occurred when updating your profile picture",
   	title: "Edit Profile Picture",
   	inputHolder: "New Picture",
   	inputLabel: "picture",
   	sizeWarning: "Please verify your file does not exceed 5mb"
   },
   fr:{
   	errorTitle: "Des erreurs sont apparus durant la mise à jour de votre photo de profil",
   	title: "Editez votre photo de profil",
   	inputHolder: "Nouvelle photo",
   	inputLabel: "photo",
   	sizeWarning: "Verifiez que votre fichier n'excède pas 5mb"
   }
});