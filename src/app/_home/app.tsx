'use client';

import { DndWrapper } from '@/components/dnd/dnd-wrapper';
import { useDragAndDrop } from '@/components/dnd/use-drag-and-drop';
import { EditingPanel } from '@/components/editing-panel';
import PreviewPanel from '@/components/preview-panel';
import { useFormStore } from '@/hooks/use-form-store';
import dynamic from 'next/dynamic';
import React from 'react';

const Sidebar = dynamic(() => import('@/components/sidebar'), { ssr: false });
const FormBuilder = dynamic(() => import('@/components/form-builder'), {
  ssr: false,
});

const App = () => {
  const { formFields, selectedFieldId } = useFormStore();
  const { items, handleDragEnd } = useDragAndDrop(formFields);
  return (
    <DndWrapper items={items} onDragEnd={handleDragEnd}>
      <Sidebar />
      <div className='flex flex-row flex-1'>
        <FormBuilder />
        <PreviewPanel />
        {selectedFieldId && <EditingPanel />}
      </div>
    </DndWrapper>
  );
};

export default App;
