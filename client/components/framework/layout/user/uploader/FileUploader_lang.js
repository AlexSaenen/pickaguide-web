import LocalizedStrings from 'react-localization';

export let strings = new LocalizedStrings({
   en:{
      buttonText: "Choose images",
      label: "Max file size : 5mb, accepted types : jpeg | jpg | png | gif",
      fileSizeError: " file size is too big",
      fileTypeError: " is not supported file extension"
   },
   fr:{
      buttonText: "Choisissez des images",
      label: "Maximum taille de fichier: 5mb, types acceptés: jpeg | jpg | png | gif",
      fileSizeError: " la taille du fichier est trop grosse",
      fileTypeError: " l'extension du fichier n'est pas supporté"
   }
});