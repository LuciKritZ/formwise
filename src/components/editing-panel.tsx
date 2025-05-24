'use client';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFormStore } from '@/hooks/use-form-store';
import { useState } from 'react';
import { FormField } from '@/types/field';
import { Input } from './ui/input';

export const EditingPanel = () => {
  const { selectedField, setSelectedFieldId, selectedFieldId, updateField } =
    useFormStore();

  const [fieldProperties, setFieldProperties] = useState<FormField | null>(
    selectedField ? { ...selectedField } : null
  );

  if (!selectedFieldId) {
    return;
  }

  const onClose = () => {
    setSelectedFieldId(null);
  };

  const updateFieldValue = (key: string, value: string) => {
    setFieldProperties((fieldProps) => {
      return fieldProps ? { ...fieldProps, [key]: value } : null;
    });
  };

  const onSave = () => {
    if (!fieldProperties) {
      return;
    }
    updateField(fieldProperties);
    onClose();
  };

  return (
    <Drawer open={!!selectedFieldId} onOpenChange={onClose}>
      <DrawerContent className='p-4 space-y-4'>
        <DrawerHeader>
          <DrawerTitle>Edit Field</DrawerTitle>
        </DrawerHeader>

        <Separator />

        {/* Replace this with dynamic form inputs for the selected field */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium'>Label</label>
          <Input
            className='w-full px-3 py-2 border rounded'
            value={fieldProperties?.label || ''}
            onChange={(e) => updateFieldValue('label', e.target.value)}
          />
        </div>

        <div className='flex justify-end gap-2 mt-4'>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onSave}>Save</Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
