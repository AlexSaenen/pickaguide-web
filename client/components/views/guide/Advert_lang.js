import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      noAdvert: "No such advert found",
      suppressComment: "Do you really wish to delete this comment ?",
      askVisit: "Ask a visit",
      needLog: "You need to be logged in to ask a visit and access comments",
      commentTitle: "Comments",
      by: "by ",
      in: " in "
   },
   fr:{
      noAdvert: "Annonce non trouvée",
      suppressComment: "Voulez-vous vraiment supprimer ce commentaire ?",
      askVisit: "Demander une visite",
      needLog: "Vous devez être connecté pour demander un visite ou poser un commentaire",
      commentTitle: "Commentaire",
      by: "Par ",
      in: " à "
   }
});