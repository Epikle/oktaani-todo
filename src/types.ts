export type TCollection = {
  title: string;
  color: string;
  todos: TItem[];
};

export type TItem = {
  text: string;
  done: boolean;
};
