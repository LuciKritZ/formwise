'use client';

import { useState, useEffect } from 'react';
import { DragEndEvent } from '@dnd-kit/core';
import { FIELDS } from '@/constants/fields';
import { useFormStore } from '@/hooks/use-form-store';
import { FormField } from '@/types/field';

export function useDragAndDrop<T extends FormField>(initialItems: T[]) {
  const [items, setItems] = useState<T[]>(initialItems);
  const { addField, moveField, fields } = useFormStore();

  // Sync items with fields changes
  useEffect(() => {
    setItems(fields as unknown as T[]);
  }, [fields]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    // Check if active is one of Sidebar fields by matching id in fields array
    const draggedField = FIELDS.find((f) => f.key === active.id);

    // If dragging from Sidebar and dropped on FormBuilder container
    if (draggedField && over.id === 'form-builder') {
      addField({
        ...draggedField,
        // Make key unique by appending timestamp or random string
        key: `${draggedField.key}-${Date.now()}`,
      });
      return;
    }

    const oldIndex = fields.findIndex((f: FormField) => f.key === active.id);
    const newIndex = fields.findIndex((f: FormField) => f.key === over.id);

    if (oldIndex !== -1 && newIndex !== -1 && oldIndex !== newIndex) {
      moveField(oldIndex, newIndex);
    }
  }

  return {
    items,
    setItems,
    handleDragEnd,
  };
}
