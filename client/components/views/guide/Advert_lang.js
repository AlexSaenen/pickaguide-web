import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      noAdvert: "No such advert found",
      suppressComment: "Do you really wish to delete this comment ?",
      askVisit: "Ask a visit",
      availability: "Upcoming visits",
      availabilitySub: " won't be available on the dates below as these are visits with other visitors",
      needLog: "You need to be logged in to ask a visit and access comments",
      commentTitle: "Comments",
      by: "by ",
      in: " in ",
      pictureName: "Profile",
      picturesName: "Advert images"
   },
   fr:{
      noAdvert: "Annonce non trouvée",
      suppressComment: "Voulez-vous vraiment supprimer ce commentaire ?",
      askVisit: "Demander une visite",
      availability: "Prochaines visites",
      availabilitySub: " ne sera pas disponible sur les dates ci dessous",
      needLog: "Vous devez être connecté pour demander un visite ou poser un commentaire",
      commentTitle: "Commentaire",
      by: "Par ",
      in: " à ",
      pictureName: "Profil",
      picturesName: "Images de l'annonce"
   }
});
