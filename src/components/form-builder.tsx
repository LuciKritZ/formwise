import React, { FC } from 'react';
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormField } from '@/types/field';
import { useDroppable } from '@dnd-kit/core';
import { Button } from './ui/button';
import { toast } from '@/hooks/use-toast';
import { useFormStore } from '@/hooks/use-form-store';
import { TrashIcon } from 'lucide-react';

const FormBuilder: FC = () => {
  const {
    fields,
    setFields,
    removeField,
    selectedFieldId,
    setSelectedFieldId,
  } = useFormStore();
  const { setNodeRef } = useDroppable({ id: 'form-builder' });

  const saveForm = () => {
    try {
      localStorage.setItem('formwise_fields', JSON.stringify(fields));
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
      setFields(JSON.parse(saved));
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
      id='form-builder'
      className='flex flex-1 p-4 bg-white border-l border-r overflow-auto h-screen flex-col'
    >
      <h2 className='section-heading'>Form Builder</h2>
      <div ref={setNodeRef} className='flex-1'>
        <SortableContext
          items={fields.map((f) => f.key)}
          strategy={verticalListSortingStrategy}
        >
          <div>
            {fields.length === 0 && (
              <p className='text-gray-400'>Drag form elements here</p>
            )}

            {fields.map((field) => (
              <SortableItem
                key={field.key}
                id={field.key}
                label={field.basic?.label}
                onDelete={(id) => removeField(id)}
                onSelect={(id) => setSelectedFieldId(id)}
                isSelected={selectedFieldId === field.key}
              />
            ))}
          </div>
        </SortableContext>
      </div>

      <div className='flex gap-4 p-4 max-h-[68px]'>
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

interface SortableItemProps extends Omit<FormField, 'basic' | 'type'> {
  id: string;
  label: string;
  onDelete: (id: string) => void;
  onSelect: (id: string) => void;
  isSelected: boolean;
}

function SortableItem({
  id,
  label,
  onDelete,
  onSelect,
  isSelected,
}: SortableItemProps) {
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
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      onClick={(e) => {
        e.stopPropagation();
        onSelect(id);
      }}
      className='draggable-form-field'
    >
      {/* Left: Drag handle only */}
      <div
        {...attributes}
        {...listeners}
        className='cursor-grab text-gray-500 hover:text-black'
        title='Drag to reorder'
      >
        ☰
      </div>

      <div className='flex-1 px-2 items-center'>{label}</div>

      <Button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(id);
        }}
        className='text-red-500 hover:text-red-700 p-2'
        aria-label={`Delete ${label}`}
        variant='outline'
      >
        <TrashIcon className='size-4' />
      </Button>
    </div>
  );
}
