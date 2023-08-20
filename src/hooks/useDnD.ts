import { RefObject } from 'react';
import type { Identifier, XYCoord } from 'dnd-core';
import { useDrag, useDrop } from 'react-dnd';

import useTodoStore from '../context/useTodoStore';

type DragItem = {
  index: number;
  id: string;
  type: string;
};

const useDnD = ({ ref, id, index }: { ref: RefObject<HTMLElement>; id: string; index: number }) => {
  const { changeOrder } = useTodoStore((state) => state.actions);

  const [{ handlerId }, drop] = useDrop<DragItem, void, { handlerId: Identifier | null }>({
    accept: 'collection',
    collect: (monitor) => ({
      handlerId: monitor.getHandlerId(),
    }),
    hover: (item: DragItem, monitor) => {
      if (!ref.current) return;
      const dragIdx = item.index;
      const hoverIdx = index;
      if (dragIdx === hoverIdx) return;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = (clientOffset as XYCoord).y - hoverBoundingRect.top;
      if (dragIdx < hoverIdx && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIdx > hoverIdx && hoverClientY > hoverMiddleY) {
        return;
      }
      changeOrder({ dragIdx, hoverIdx });
      // eslint-disable-next-line
      item.index = hoverIdx;
    },
  });

  const [{ opacity }, drag, preview] = useDrag({
    type: 'collection',
    item: () => ({ id, index }),
    collect: (monitor) => ({
      opacity: monitor.isDragging() ? 0.2 : 1,
    }),
  });

  return { handlerId, opacity, drop, drag, preview };
};

export default useDnD;
