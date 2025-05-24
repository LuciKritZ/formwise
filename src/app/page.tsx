'use client';

import { EditingPanel } from '@/components/editing-panel';
import PreviewPanel from '@/components/preview-panel';
import { Toaster } from '@/components/ui/toaster';
import { FIELDS } from '@/constants/fields';
import { useFormStore } from '@/hooks/use-form-store';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import dynamic from 'next/dynamic';

const Sidebar = dynamic(() => import('@/components/sidebar'), { ssr: false });
const FormBuilder = dynamic(() => import('@/components/form-builder'), {
  ssr: false,
});

export default function Home() {
  const { formFields, addField, moveField, selectedFieldId } = useFormStore();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // Check if active is one of Sidebar fields by matching id in fields array
    const draggedField = FIELDS.find((f) => f.id === active.id);

    // If dragging from Sidebar and dropped on FormBuilder container
    if (draggedField && over.id === 'form-builder') {
      addField({
        ...draggedField,
        // Make key unique by appending timestamp or random string
        key: `${draggedField.key}-${Date.now()}`,
      });
      return;
    }

    const oldIndex = formFields.findIndex((f) => f.key === active.id);
    const newIndex = formFields.findIndex((f) => f.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      moveField(oldIndex, newIndex);
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Toaster />
      <div className='flex h-screen w-screen bg-background text-gray-900 font-sans'>
        <Sidebar />
        <div className='flex flex-row flex-1'>
          <FormBuilder />
          <PreviewPanel />
          {selectedFieldId && <EditingPanel />}
        </div>
      </div>
    </DndContext>
  );
}
