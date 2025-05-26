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
import { BasicFieldInfo, LayoutInfo, ValidationRules } from '@/types/field';
import { BasicFieldEditor, ValidationEditor, LayoutEditor } from './editors';

export const EditingPanel = () => {
  const { selectedField, setSelectedFieldId, selectedFieldId, updateField } =
    useFormStore();

  const [localValidations, setLocalValidations] =
    useState<ValidationRules | null>(selectedField?.validations ?? null);
  const [basicFieldInfo, setBasicFieldInfo] = useState<BasicFieldInfo | null>(
    selectedField?.basic ?? null
  );
  const [layoutInfo, setLayoutInfo] = useState<LayoutInfo | null>(
    selectedField?.layout ?? null
  );

  useEffect(() => {
    if (selectedField) {
      setLocalValidations(selectedField.validations ?? {});
      setBasicFieldInfo(selectedField.basic ?? {});
      setLayoutInfo(selectedField?.layout ?? {});
    }
  }, [selectedField]);

  if (!selectedFieldId) {
    return;
  }

  const onClose = () => {
    setSelectedFieldId(null);
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

    if (layoutInfo) {
      newField.layout = layoutInfo;
    }

    updateField(newField);
    onClose();
  };

  return (
    <Sheet open={!!selectedFieldId} onOpenChange={onClose}>
      <SheetContent aria-describedby='' className='p-4 space-y-4'>
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

        {layoutInfo && (
          <LayoutEditor
            layoutInfo={layoutInfo}
            onChange={(newLayoutInfo) => setLayoutInfo(newLayoutInfo)}
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
