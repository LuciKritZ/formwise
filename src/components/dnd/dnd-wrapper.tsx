'use client';

import { FormField } from '@/types/field';
import {
  DndContext,
  closestCenter,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

export const DndWrapper = ({
  children,
  items,
  onDragEnd,
}: {
  children: React.ReactNode;
  items: FormField[];
  onDragEnd: (event: DragEndEvent) => void;
}) => {
  const sensors = useSensors(useSensor(MouseSensor));

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <SortableContext
        items={items.map((i) => i.key)}
        strategy={verticalListSortingStrategy}
      >
        {children}
      </SortableContext>
    </DndContext>
  );
};
