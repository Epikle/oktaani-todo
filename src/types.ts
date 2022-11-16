export type TCollection = {
  id: string;
  title: string;
  color: string;
  todos: TItem[];
};

export type TItem = {
  id: string;
  text: string;
  done: boolean;
};
