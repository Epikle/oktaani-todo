import { TodoItemPriority } from '../context/useTodoStore';

const priorityColors: Record<TodoItemPriority, string> = {
  low: 'hsl(0, 0%, 50%)',
  medium: 'hsl(104, 13%, 36%)',
  high: 'hsl(6, 92%, 36%)',
};

const usePriority = (priority: TodoItemPriority) => {
  const priorityColor = priorityColors[priority];
  const priorities = Object.keys(priorityColors);

  const nextPriority = () => {
    const currentPriorityIndex = priorities.indexOf(priority);
    const nextIndex = (currentPriorityIndex + 1) % priorities.length;

    return priorities[nextIndex] as TodoItemPriority;
  };

  return { priorityColor, nextPriority };
};

export default usePriority;
