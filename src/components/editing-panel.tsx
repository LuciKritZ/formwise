'use client';

import {
  Sheet,
  SheetClose,
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
import { LivePreview } from './live-preview';

export const EditingPanel = () => {
  const { selectedField, selectedFieldId, setSelectedFieldId, updateField } =
    useFormStore();

  const [isSheetOpen, setSheetOpen] = useState(true);

  const [validations, setValidations] = useState<ValidationRules | null>(null);
  const [basic, setBasic] = useState<BasicFieldInfo | null>(null);
  const [layout, setLayout] = useState<LayoutInfo | null>(null);

  useEffect(() => {
    if (selectedField) {
      setValidations(selectedField.validations ?? {});
      setBasic(selectedField.basic ?? {});
      setLayout(selectedField.layout ?? {});
    }
  }, [selectedField]);

  if (!selectedFieldId) return null;

  const onClose = () => {
    setSheetOpen(false);
    setTimeout(() => setSelectedFieldId(null), 400); // For closing animation
  };

  const onSave = () => {
    if (!selectedField) return;

    updateField({
      ...selectedField,
      basic: basic ?? selectedField.basic,
      validations: validations ?? selectedField.validations,
      layout: layout ?? selectedField.layout,
    });

    onClose();
  };

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose} modal>
      <SheetContent aria-describedby='' className='space-y-6 min-w-[100%]'>
        <SheetHeader>
          <SheetTitle>Edit Field</SheetTitle>
        </SheetHeader>

        <div className='grid grid-cols-1 md:grid-cols-3'>
          {/* Live Preview Section */}
          {selectedField && basic && layout && validations && (
            <div className='min-w-[300px] max-w-sm p-4 bg-muted border rounded-xl shadow-sm h-fit sticky top-4'>
              <h4 className='text-lg font-medium mb-2 text-muted-foreground'>
                Real-time Preview
              </h4>
              <LivePreview
                field={{
                  ...selectedField,
                  basic,
                  layout,
                  validations,
                }}
              />
            </div>
          )}

          {/* Field Editors Section */}
          <div className='col-span-2 flex flex-col border border-border/50'>
            <div className='flex'>
              <div className='w-1/2 p-4'>
                {validations && (
                  <ValidationEditor
                    validations={validations}
                    onChange={setValidations}
                  />
                )}
              </div>
              <div className='w-1/2 p-4'>
                {layout && (
                  <LayoutEditor layoutInfo={layout} onChange={setLayout} />
                )}
              </div>
            </div>

            <div className='w-full p-4'>
              {basic && (
                <BasicFieldEditor basicFieldInfo={basic} onChange={setBasic} />
              )}
            </div>
          </div>
        </div>

        <SheetFooter className='sticky'>
          <SheetClose asChild>
            <div className='flex justify-end gap-2 mt-6'>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={onSave}>Save</Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
