import type { Languages, Texts } from '../types';

const languages: Record<Languages, Texts> = {
  'en-us': {
    header: {
      newCollection: 'Add a new collection',
      newTodo: 'Add a new todo to',
      setColorTitle: 'Set todo collection color',
    },
    controls: {
      settings: 'Settings',
      changeColorMode: 'Change color mode',
      language: 'Change language',
      removeDone: 'Remove done items',
      shareCol: 'Share collection',
      editCol: 'Edit collection title',
      removeCol: 'Remove collection',
      deleteConfirm: 'Are you sure?',
      shareConfirm: 'Share collection?',
      sort: 'Sort collections',
    },
    collection: {
      created: 'created',
      empty: 'No collections, start by creating one.',
      shareFail: 'Show local copy',
    },
    todo: {
      markDone: 'Mark [] as done',
    },
    common: {
      confirm: 'Confirm',
      cancel: 'Cancel',
      add: 'Add',
      editing: 'Editing',
    },
    errors: {
      localStorage: 'You need to allow localStorage usage to use this app.',
      apiGetCollection: 'Failed to fetch shared collection data.',
      default: 'Something went wrong.',
    },
  },
  fi: {
    header: {
      newCollection: 'Lisää uusi kokoelma',
      newTodo: 'Lisää uusi todo kokoelmaan',
      setColorTitle: 'Aseta kokoelman väri',
    },
    controls: {
      settings: 'Asetukset',
      changeColorMode: 'Vaihda väritila',
      language: 'Vaihda kieli',
      removeDone: 'Poista tehdyt',
      shareCol: 'Jaa kokoelma',
      editCol: 'Muokkaa kokoelman otsikkoa',
      removeCol: 'Poista kokoelma',
      deleteConfirm: 'Haluatko varmasti poistaa?',
      shareConfirm: 'Haluatko jakaa kokoelman?',
      sort: 'Järjestä kokoelmat',
    },
    collection: {
      created: 'luotu',
      empty: 'Ei kokoelmia, aloita luomalla uusi.',
      shareFail: 'Näytä paikallinen versio',
    },
    todo: {
      markDone: 'Merkkaa [] tehdyksi',
    },
    common: {
      confirm: 'Vahvista',
      cancel: 'Peruuta',
      add: 'Lisää',
      editing: 'Muokkaa',
    },
    errors: {
      localStorage:
        'Sovellus tarvitsee paikallisen tallennuksen päälle toimiakseen.',
      apiGetCollection: 'Jaetun listan haku epäonnistui.',
      default: 'Jotain meni pieleen.',
    },
  },
};

export default languages;
