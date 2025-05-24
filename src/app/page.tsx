'use client';

import PreviewPanel from '@/components/preview-panel';
import { fields } from '@/components/sidebar';
import { FormField } from '@/types/form';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import dynamic from 'next/dynamic';
import { useState } from 'react';

const Sidebar = dynamic(() => import('@/components/sidebar'), { ssr: false });
const FormBuilder = dynamic(() => import('@/components/form-builder'), {
  ssr: false,
});

export default function Home() {
  const [formFields, setFormFields] = useState<FormField[]>([]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // Check if active is one of Sidebar fields by matching id in fields array
    const draggedField = fields.find((f) => f.id === active.id);

    // If dragging from Sidebar and dropped on FormBuilder container
    if (draggedField && over.id === 'form-builder') {
      setFormFields((fields) => [
        ...fields,
        {
          ...draggedField,
          // Make key unique by appending timestamp or random string
          key: `${draggedField.key}-${Date.now()}`,
        },
      ]);
      return;
    }

    const oldIndex = formFields.findIndex((f) => f.key === active.id);
    const newIndex = formFields.findIndex((f) => f.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      setFormFields((fields) => {
        const newFields = [...fields];
        const [moved] = newFields.splice(oldIndex, 1);
        newFields.splice(newIndex, 0, moved);
        return newFields;
      });
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className='flex h-screen w-screen'>
        <Sidebar formFields={formFields} setFormFields={setFormFields} />
        <FormBuilder formFields={formFields} setFormFields={setFormFields} />
        <PreviewPanel formFields={formFields} />
      </div>
    </DndContext>
  );
}
