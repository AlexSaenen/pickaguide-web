import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
   	error: "Some error occurred when updating the visit",
   	title: " this visit",
   	comment: "Comment",
   	info: "This action cannot be undone"
   },
   fr:{
   	error: "Une erreur est survenue pendant l'envoie de la visite",
   	title: " cette visite",
   	comment: "Commentaire",
   	info: "Cette action est irréversible"
   }
});