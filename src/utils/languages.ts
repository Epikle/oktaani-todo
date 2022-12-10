import { Languages, Texts } from '../types';

export const languages: Record<Languages, Texts> = {
  'en-us': {
    header: {
      newCollection: 'Add a new collection',
      newTodo: 'Add a new todo to',
      setColorTitle: 'Set todo collection color',
    },
    collection: {
      created: 'created',
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
    collection: {
      created: 'luotu',
    },
    common: {
      cancel: 'Cancel',
      add: 'Lisää',
    },
  },
};
