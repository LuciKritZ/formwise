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
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';

interface FormBuilderProps {
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const FormBuilder: FC<FormBuilderProps> = ({ formFields, setFormFields }) => {
  const { setNodeRef } = useDroppable({ id: 'form-builder' });

  const saveForm = () => {
    try {
      localStorage.setItem('formwise_fields', JSON.stringify(formFields));
      toast({
        title: 'Form saved locally!',
        variant: 'default',
      });
    } catch {
      toast({
        title: 'Error saving form locally.',
        variant: 'destructive',
      });
    }
  };

  const loadForm = () => {
    const saved = localStorage.getItem('formwise_fields');
    if (saved) {
      setFormFields(JSON.parse(saved));
      toast({
        title: 'Form loaded locally!',
        variant: 'default',
      });
    } else {
      toast({
        title: 'No saved form found.',
        variant: 'destructive',
      });
    }
  };

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
          <SortableItem
            key={field.key}
            id={field.key}
            label={field.label}
            onDelete={(id) =>
              setFormFields((prev) => prev.filter((f) => f.key !== id))
            }
          />
        ))}
      </SortableContext>

      <div className='flex gap-4 p-4'>
        <Button onClick={saveForm} variant='default'>
          Save
        </Button>
        <Button onClick={loadForm} variant='secondary'>
          Load
        </Button>
      </div>
    </div>
  );
};

export default FormBuilder;

interface SortableItemProps extends FormField {
  onDelete: (id: string) => void;
}

function SortableItem({ id, label, onDelete }: SortableItemProps) {
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
    display: 'flex',
  };

  return (
    <div ref={setNodeRef} style={style}>
      {/* Left: Drag handle only */}
      <div
        {...attributes}
        {...listeners}
        className='cursor-grab text-gray-500 hover:text-black'
        title='Drag to reorder'
      >
        ☰
      </div>

      <div className='flex-1 px-2'>{label}</div>

      <button
        onClick={() => onDelete(id)}
        className='text-red-500 hover:text-red-700'
        aria-label={`Delete ${label}`}
      >
        🗑️
      </button>
    </div>
  );
}
