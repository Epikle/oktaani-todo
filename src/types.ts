export type Collection = {
  id: string;
  title: string;
  color: string;
  shared: boolean;
  todos: Item[];
  created: string;
};

export type Item = {
  id: string;
  text: string;
  done: boolean;
  created: string;
};

export type Selected = {
  id: string;
  title: string;
  color: string;
  shared: boolean;
  edit: boolean;
  selected: boolean;
};

export type NewCollectionEntry = Omit<Collection, 'shared' | 'todos' | 'created'>;

export type SelectedEntry = Omit<Selected, 'edit' | 'selected'>;

export type ItemEntry = Omit<Item, 'id' | 'done' | 'created'>;

export type Languages = 'en-us' | 'fi';

export type Texts = {
  header: {
    newCollection: string;
    newTodo: string;
    setColorTitle: string;
  };
  controls: {
    settings: string;
    changeColorMode: string;
    language: string;
    removeCol: string;
    editCol: string;
    shareCol: string;
    stopShareCol: string;
    removeDone: string;
    deleteConfirm: string;
    shareConfirm: string;
    sort: string;
    help: string;
  };
  collection: {
    created: string;
    empty: string;
    shareFail: string;
  };
  todo: {
    markDone: string;
  };
  common: {
    confirm: string;
    cancel: string;
    add: string;
    editing: string;
  };
  errors: {
    localStorage: string;
    apiGetCollection: string;
    default: string;
  };
};

export type Settings = {
  availableLanguages: Languages[];
  languageName: Languages;
  language: Texts;
  darkMode: boolean;
  sort: boolean;
};

export type SettingsLS = Omit<Settings, 'availableLanguages' | 'language' | 'sort'>;

export const ItemTypes = {
  COLLECTION: 'collection',
};
