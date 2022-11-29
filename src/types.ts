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
  'id' | 'shared' | 'todos' | 'created'
>;

export type TSelectedEntry = Omit<TSelected, 'edit' | 'selected'>;

export type TItemEntry = Omit<TItem, 'id' | 'done' | 'created'>;
