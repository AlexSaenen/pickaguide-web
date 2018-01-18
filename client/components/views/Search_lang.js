import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      title:"Search",
      submit:"Search",
      placeholder:"Search anything",
      error:"Something unusual happened",
      noResult:"No such results found :(",
      filter:"Select any filter to narrow down the results",
      filterTitle:"Filters",
      filterCity:"City",
      filterCountry:"Country",
      filterInterests:"Interests",
      longerTerms:"Need more than 2 letters to start search",
      show: "Show",
      hide: "Hide"
   },
   fr:{
      title:"Recherche",
      submit:"Chercher",
      placeholder:"Chercher quelque chose",
      error:"Quelque chose de bizarre s'est passé...",
      noResult:"Nous n'avons rien trouvé :(",
      filter:"Selectionnez des filtres pour reduire les resultats",
      filterTitle:"Filtres",
      filterCity:"Ville",
      filterCountry:"Pays",
      filterInterests:"Interets",
      longerTerms:"Il faut plus de 2 lettres pour commencer une recherche",
      show: "Afficher",
      hide: "Cacher"
   }
});
