export type TCollection = {
  id: string;
  title: string;
  color: string;
  shared: boolean;
  todos: TItem[];
  created: string;
};

export type TItem = {
  id: string;
  text: string;
  done: boolean;
  created: string;
};

export type TSelected = {
  id: string;
  title: string;
  color: string;
  edit: boolean;
  selected: boolean;
};

export type TNewCollectionEntry = Omit<
  TCollection,
  'shared' | 'todos' | 'created'
>;

export type TSelectedEntry = Omit<TSelected, 'edit' | 'selected'>;

export type TItemEntry = Omit<TItem, 'id' | 'done' | 'created'>;

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
    removeDone: string;
    deleteConfirm: string;
  };
  collection: {
    created: string;
    empty: string;
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
};

export type Settings = {
  availableLanguages: Languages[];
  languageName: Languages;
  language: Texts;
  darkMode: boolean;
};

export type SettingsLS = Omit<Settings, 'availableLanguages' | 'language'>;
