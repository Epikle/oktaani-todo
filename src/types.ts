export type TCollection = {
  id: string;
  title: string;
  color: string;
  shared: boolean;
  todos: TItem[];
};

export type TItem = {
  id: string;
  text: string;
  done: boolean;
};

export type TSelected = {
  id: string;
  title: string;
  color: string;
  edit: boolean;
  selected: boolean;
};

export type TNewCollectionEntry = Omit<TCollection, 'id' | 'shared' | 'todos'>;

export type TSelectedEntry = Omit<TSelected, 'edit' | 'selected'>;
