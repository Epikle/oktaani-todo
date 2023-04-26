const languages = {
  'en-us': {
    header: {
      newCollection: 'Add a new collection',
      newTodo: 'Add a new todo to',
      setColorTitle: 'Choose Collection Color',
      editNote: 'Edit note',
    },
    controls: {
      settings: 'Settings',
      changeColorMode: 'Change color mode',
      language: 'Change language',
      removeDone: 'Remove done items',
      shareCol: 'Share collection',
      stopShareCol: 'Shop sharing collection',
      editCol: 'Edit collection title',
      removeCol: 'Remove collection',
      deleteConfirm: 'Are you sure?',
      shareConfirm: 'Share collection?',
      sort: 'Sort collections',
      help: 'How to use?',
    },
    collection: {
      created: 'created',
      empty: 'No collections, start by creating one.',
      shareFail: 'Show local copy',
      shareTryAgain: 'Try again',
      selectType: 'Select Type',
      todo: 'Todo',
      note: 'Note',
      copyLink: 'Copy Share Link',
      showLog: 'Show Log',
    },
    todo: {
      markDone: 'Mark [] as done',
    },
    welcome: {
      header: 'Welcome to oktaaniTODO!',
      bodyText:
        'We are excited to introduce you to our powerful task management tool that will help you stay organized and productive. Our app has a number of great features that will make managing your tasks easier and more efficient than ever before.',
      howToUse: 'How to use?',
      generalSettings: 'General Settings',
      collectionControls: 'Collection Controls',
      titleHere: 'Set Collection or Item Title Here',
      saveColItem: 'Save Collection or Item',
    },
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      add: 'Add',
      editing: 'Editing',
      loading: 'Loading...',
      error: 'Error',
    },
    errors: {
      localStorage: 'You need to allow localStorage usage to use this app.',
      apiGetCollection: 'Fetching the shared collection failed. Please try again.',
      apiUpdateCollection: 'There was a failure in updating the shared collection. Please try again.',
      apiShareCollection: 'Failed to share the collection. Please try again.',
      default: 'Something went wrong.',
    },
  },
  fi: {
    header: {
      newCollection: 'Lisää uusi kokoelma',
      newTodo: 'Lisää uusi todo kokoelmaan',
      setColorTitle: 'Aseta kokoelman väri',
      editNote: 'Muokkaa muistiinpanoa',
    },
    controls: {
      settings: 'Asetukset',
      changeColorMode: 'Vaihda väritila',
      language: 'Vaihda kieli',
      removeDone: 'Poista tehdyt',
      shareCol: 'Jaa kokoelma',
      stopShareCol: 'Lopeta kokoelman jako',
      editCol: 'Muokkaa kokoelman otsikkoa',
      removeCol: 'Poista kokoelma',
      deleteConfirm: 'Haluatko varmasti poistaa?',
      shareConfirm: 'Haluatko jakaa kokoelman?',
      sort: 'Järjestä kokoelmat',
      help: 'Käyttöohjeet',
    },
    collection: {
      created: 'luotu',
      empty: 'Ei kokoelmia, aloita luomalla uusi.',
      shareFail: 'Näytä paikallinen versio',
      shareTryAgain: 'Kokeile uudelleen',
      selectType: 'Valitse tyyppi',
      todo: 'Tehtävälista',
      note: 'Muistiinpano',
      copyLink: 'Kopioi jakolinkki',
      showLog: 'Näytä muutosloki',
    },
    todo: {
      markDone: 'Merkkaa [] tehdyksi',
    },
    welcome: {
      header: 'Tervetuloa OktaaniTODO:on!',
      bodyText:
        'Olemme innoissamme esitellessämme sinulle voimakkaan tehtävienhallintatyökalumme, joka auttaa sinua pysymään järjestäytyneenä ja tuottavana. Sovelluksessamme on useita loistavia ominaisuuksia, jotka tekevät tehtävien hallinnasta helpompaa ja tehokkaampaa kuin koskaan aiemmin.',
      howToUse: 'Kuinka käytetään?',
      generalSettings: 'Yleiset asetukset',
      collectionControls: 'Kokoelman kontrollit',
      titleHere: 'Laita kokoelman tai tehtävän nimi tähän.',
      saveColItem: 'Tallenna kokoelma tai tehtävä.',
    },
    common: {
      confirm: 'Vahvista',
      cancel: 'Peruuta',
      add: 'Lisää',
      editing: 'Muokkaa',
      loading: 'Ladataan...',
      error: 'Virhe',
    },
    errors: {
      localStorage: 'Sovellus tarvitsee paikallisen tallennuksen päälle toimiakseen.',
      apiGetCollection: 'Noudettaessa jaettua kokoelmaa tapahtui virhe. Yritä uudelleen.',
      apiUpdateCollection: 'Jaettua kokoelmaa ei voitu päivittää. Yritä uudelleen.',
      apiShareCollection: 'Kokoelman jakaminen epäonnistui. Yritä uudelleen.',
      default: 'Jotain meni pieleen.',
    },
  },
};

export const allowedLanguages = ['en-us', 'fi'] as const;
export type Languages = (typeof allowedLanguages)[number];
export type Texts = (typeof languages)['en-us'];
export const typedLanguages: Record<Languages, Texts> = languages;
