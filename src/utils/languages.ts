import type { Languages, Texts } from '../types';

export const languages: Record<Languages, Texts> = {
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
    },
    collection: {
      created: 'created',
    },
    todo: {
      markDone: 'Mark [] as done',
    },
    common: {
      cancel: 'Cancel',
      add: 'Add',
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
    },
    collection: {
      created: 'luotu',
    },
    todo: {
      markDone: 'Merkkaa [] tehdyksi',
    },
    common: {
      cancel: 'Peruuta',
      add: 'Lisää',
    },
  },
};
