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
