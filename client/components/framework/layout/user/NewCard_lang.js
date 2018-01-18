import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      title: "New Card",
      month: "Expiration Month",
      year: "Expiration Year",
      number: "Number",
      cvc: "CVC",
      create: "Create Card"

   },
   fr: {
      title: "Nouvelle carte",
      month: "Mois d'expiration",
      year: "Année d'expiration",
      number: "Numero de la carte",
      cvc: "Code CVC",
      create: "Créer la carte"
   }
});
