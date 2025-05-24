'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FormField } from '@/types/form';
import { Card, CardHeader, CardContent } from './ui/card';
import { Button } from './ui/button';

export const fields: FormField[] = [
  { id: 'text', label: 'Text Input', key: 'text-input' },
  { id: 'checkbox', label: 'Checkbox', key: 'checkbox' },
  { id: 'select', label: 'Select', key: 'select' },
];

const Sidebar: React.FC = () => {
  return (
    <aside className='w-64 bg-gray-100 p-4 border-r'>
      <Card>
        <CardHeader className='font-bold text-lg'>Form Elements</CardHeader>

        <CardContent>
          <div className='flex flex-col gap-2 mb-4'>
            {fields.map((field) => (
              <DraggableField
                key={field.id}
                id={field.id}
                label={field.label}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
};

const DraggableField: React.FC<FormField> = ({ id, label }: FormField) => {
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
      className='justify-start'
      variant='outline'
    >
      {label}
    </Button>
  );
};

export default Sidebar;
