'use client';

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { FormField } from '@/types/form';

export const fields: FormField[] = [
  { id: 'text', label: 'Text Input', key: 'text-input' },
  { id: 'checkbox', label: 'Checkbox', key: 'checkbox' },
  { id: 'select', label: 'Select', key: 'select' },
];

interface SidebarProps {
  formFields: FormField[];
  setFormFields: React.Dispatch<React.SetStateAction<FormField[]>>;
}

const Sidebar: React.FC<SidebarProps> = ({ formFields, setFormFields }) => {
  const saveForm = () => {
    localStorage.setItem('formwise_fields', JSON.stringify(formFields));
    alert('Form saved locally!');
  };

  const loadForm = () => {
    const saved = localStorage.getItem('formwise_fields');
    if (saved) {
      setFormFields(JSON.parse(saved));
      alert('Form loaded!');
    } else {
      alert('No saved form found.');
    }
  };

  return (
    <aside className='w-60 bg-gray-100 p-4'>
      <h2 className='font-bold mb-4'>Form Elements</h2>
      <ul>
        {fields.map((field) => (
          <DraggableField key={field.id} id={field.id} label={field.label} />
        ))}
      </ul>

      <button onClick={saveForm} className='btn btn-primary'>
        Save Form
      </button>

      <button onClick={loadForm} className='btn btn-primary'>
        Load Form
      </button>
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
    padding: '0.5rem 1rem',
    marginBottom: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'grab',
    userSelect: 'none',
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className='p-2 mb-2 bg-white rounded border cursor-grab'
    >
      {label}
    </li>
  );
};

export default Sidebar;
