import { ItemPriority, PriorityEnum } from '../utils/types';

const priorityColors: Record<ItemPriority, string> = {
  low: 'hsl(0, 0%, 50%)',
  medium: 'hsl(104, 13%, 36%)',
  high: 'hsl(6, 92%, 36%)',
};

const usePriority = (priority: ItemPriority) => {
  const priorityColor = priorityColors[priority];
  const priorities = PriorityEnum.options;

  const nextPriority = () => {
    const currentPriorityIndex = priorities.indexOf(priority);
    const nextIndex = (currentPriorityIndex + 1) % priorities.length;

    return priorities[nextIndex];
  };

  return { priorityColor, nextPriority };
};

export default usePriority;
