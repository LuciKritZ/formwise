import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Button } from './ui/button';
import { FIELDS } from '@/constants/fields';

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-100 p-4'>
      <h2 className='section-heading'>Form Elements</h2>

      <div className='flex flex-col mb-4'>
        {FIELDS.map((field) => (
          <DraggableField
            key={field.key}
            id={field.key}
            label={field.basic?.label ?? ''}
          />
        ))}
      </div>
    </aside>
  );
};

interface DraggableFieldType {
  id: string;
  label: string;
}

const DraggableField: React.FC<DraggableFieldType> = ({
  id,
  label,
}: DraggableFieldType) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id });

  const style: React.CSSProperties = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <Button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='draggable-form-field'
      variant='outline'
    >
      {label}
    </Button>
  );
};

export default Sidebar;
