import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      contact_us:"Contact Us",
      contactInfo:"Contact information",
      leaveMessage:"Leave us a message",
      contact:"Contact",
      name:"name",
      fname:"Full name",
      phone:"Phone",
      message:"Message",
      submit:"Send",
      email:"Email",
      success:"Successful",
      success_content:"You have successfully contacted us! Your contact id is '${store.contactId}'. One of our staff will answer you soon.",
      error:"Some error occurred when contacting us"
   },
   fr:{
      contact_us:"Contactez nous",
      contact:"Contact",
      contactInfo:"Information de contact",
      leaveMessage:"Laissez nous un message",
      name:"Nom",
      fname:"Nom complet",
      phone:"Téléphonne",
      message:"Message",
      submit:"Envoyer",
      email:"Email",
      success:"Réussi",
      success_content:"Nous avons reçu votre message! Votre identifian est le: '${store.contactId}'. Un membre du staff va vous répondre dans les plus brefs délais.",
      error:"Une erreur s'est produite"
   }
});
