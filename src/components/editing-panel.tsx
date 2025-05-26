'use client';

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useFormStore } from '@/hooks/use-form-store';
import { useEffect, useState } from 'react';
import { BasicFieldInfo, FormField, ValidationRules } from '@/types/field';

import { Input } from './ui/input';
import { ValidationEditor } from './editors/validation-editor';
import { BasicFieldEditor } from './editors/basic-editor';

export const EditingPanel = () => {
  const { selectedField, setSelectedFieldId, selectedFieldId, updateField } =
    useFormStore();

  const [localValidations, setLocalValidations] =
    useState<ValidationRules | null>(selectedField?.validations ?? null);
  const [basicFieldInfo, setBasicFieldInfo] = useState<BasicFieldInfo | null>(
    selectedField?.basic ?? null
  );

  useEffect(() => {
    if (selectedField) {
      setLocalValidations(selectedField.validations || {});
      setBasicFieldInfo(selectedField.basic || {});
    }
  }, [selectedField]);

  if (!selectedFieldId) {
    return;
  }

  const onClose = () => {
    setSelectedFieldId(null);
  };

  const updateFieldValue = (key: string, value: string) => {
    setBasicFieldInfo((fieldProps) => {
      return fieldProps ? { ...fieldProps, [key]: value } : null;
    });
  };

  const onSave = () => {
    if (!selectedField) {
      return;
    }
    const newField = { ...selectedField };

    if (basicFieldInfo) {
      newField.basic = { ...basicFieldInfo };
    }

    if (localValidations) {
      newField.validations = localValidations;
    }

    if (selectedField) {
      updateField(newField);
    }
    onClose();
  };

  return (
    <Sheet open={!!selectedFieldId} onOpenChange={onClose}>
      <SheetContent className='p-4 space-y-4'>
        <SheetHeader>
          <SheetTitle>Edit Field</SheetTitle>
        </SheetHeader>

        {localValidations && (
          <ValidationEditor
            validations={localValidations}
            onChange={(newValidations) => setLocalValidations(newValidations)}
          />
        )}

        <Separator />

        {basicFieldInfo && (
          <BasicFieldEditor
            basicFieldInfo={basicFieldInfo}
            onChange={(newBasicInfo) => setBasicFieldInfo(newBasicInfo)}
          />
        )}

        <SheetFooter>
          <div className='flex justify-end gap-2 mt-4'>
            <Button variant='ghost' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onSave}>Save</Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
