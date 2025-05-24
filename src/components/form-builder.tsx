'use client';

import React, { FC } from 'react';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '@/types/form';
import { useDroppable } from '@dnd-kit/core';

interface FormBuilderProps {
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const FormBuilder: FC<FormBuilderProps> = ({ formFields }) => {
  const { setNodeRef } = useDroppable({ id: 'form-builder' });
  return (
    <div
      ref={setNodeRef}
      id='form-builder'
      className='flex-1 p-4 bg-white border-l border-r overflow-auto min-h-screen'
    >
      <h2 className='font-bold mb-4'>Form Builder</h2>
      <SortableContext
        items={formFields.map((f) => f.key)}
        strategy={verticalListSortingStrategy}
      >
        {formFields.length === 0 && (
          <p className='text-gray-400'>Drag form elements here</p>
        )}
        {formFields.map((field) => (
          <SortableItem key={field.key} id={field.key} label={field.label} />
        ))}
      </SortableContext>
    </div>
  );
};

export default FormBuilder;

interface SortableItemProps {
  id: string;
  label: string;
}

function SortableItem({ id, label }: SortableItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    padding: '0.5rem 1rem',
    marginBottom: '0.5rem',
    border: '1px solid #ddd',
    borderRadius: '0.25rem',
    backgroundColor: 'white',
    cursor: 'grab',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {label}
    </div>
  );
}
