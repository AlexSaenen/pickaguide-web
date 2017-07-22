import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      title:"Search",
      submit:"Search",
      placeholder:"Search anything",
      error:"Something unusual happened",
      noResult:"No such results found :(",
      longerTerms:"Need more than 2 letters to start search",
   },
   fr:{
      title:"Recherche",
      submit:"Chercher",
      placeholder:"Chercher quelque chose",
      error:"Quelque chose de bizarre s'est passé...",
      noResult:"Nous n'avons rien trouvé :(",
      longerTerms:"Il faut plus que 2 lettres pour commencer une recherche",
   }
});
