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
import { useEffect, useState, useCallback } from 'react';
import {
  BasicFieldInfo,
  LayoutInfo,
  ValidationRules,
  FormField,
} from '@/types/field';
import { BasicFieldEditor, ValidationEditor, LayoutEditor } from './editors';
import { LivePreview } from './live-preview';
import { useToast } from '@/hooks/use-toast';

export const EditingPanel = () => {
  const { toast } = useToast();
  const {
    selectedField,
    selectedFieldId,
    setSelectedFieldId,
    updateField,
    getFieldErrors,
    isFieldValid,
  } = useFormStore();

  const [isSheetOpen, setSheetOpen] = useState(true);
  const [validations, setValidations] = useState<ValidationRules | null>(null);
  const [basic, setBasic] = useState<BasicFieldInfo | null>(null);
  const [layout, setLayout] = useState<LayoutInfo | null>(null);
  const [isDirty, setIsDirty] = useState(false);

  // Reset state when selected field changes
  useEffect(() => {
    if (selectedField) {
      setValidations(selectedField.validations ?? {});
      setBasic(selectedField.basic ?? {});
      setLayout(selectedField.layout ?? {});
      setIsDirty(false);
    }
  }, [selectedField]);

  if (!selectedFieldId || !selectedField) return null;

  const onClose = useCallback(() => {
    if (isDirty) {
      const confirmed = window.confirm(
        'You have unsaved changes. Are you sure you want to close?'
      );
      if (!confirmed) return;
    }
    setSheetOpen(false);
    setTimeout(() => setSelectedFieldId(null), 400); // For closing animation
  }, [isDirty, setSelectedFieldId]);

  const onSave = useCallback(() => {
    if (!selectedField) return;

    const errors = getFieldErrors(selectedField.key);
    if (errors.length > 0) {
      toast({
        title: 'Validation Error',
        description: 'Please fix the validation errors before saving.',
        variant: 'destructive',
      });
      return;
    }

    try {
      updateField({
        ...selectedField,
        basic: basic ?? selectedField.basic,
        validations: validations ?? selectedField.validations,
        layout: layout ?? selectedField.layout,
      });
      toast({
        title: 'Success',
        description: 'Field updated successfully.',
      });
      onClose();
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update field. Please try again.',
        variant: 'destructive',
      });
    }
  }, [
    selectedField,
    basic,
    validations,
    layout,
    updateField,
    onClose,
    getFieldErrors,
    toast,
  ]);

  const handleValidationChange = useCallback(
    (newValidations: ValidationRules) => {
      setValidations(newValidations);
      setIsDirty(true);
    },
    []
  );

  const handleBasicChange = useCallback((newBasic: BasicFieldInfo) => {
    setBasic(newBasic);
    setIsDirty(true);
  }, []);

  const handleLayoutChange = useCallback((newLayout: LayoutInfo) => {
    setLayout(newLayout);
    setIsDirty(true);
  }, []);

  return (
    <Sheet open={isSheetOpen} onOpenChange={onClose} modal>
      <SheetContent
        aria-describedby='field-editor'
        className='overflow-y-scroll space-y-6 min-w-[100%]'
      >
        <SheetHeader>
          <SheetTitle>Edit Field</SheetTitle>
        </SheetHeader>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
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
          <div className='col-span-2 flex flex-col space-y-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div className='p-4 border rounded-lg bg-card'>
                {validations && (
                  <ValidationEditor
                    validations={validations}
                    onChange={handleValidationChange}
                  />
                )}
              </div>
              <div className='p-4 border rounded-lg bg-card'>
                {layout && (
                  <LayoutEditor
                    layoutInfo={layout}
                    onChange={handleLayoutChange}
                  />
                )}
              </div>
            </div>

            <div className='p-4 border rounded-lg bg-card'>
              {basic && (
                <BasicFieldEditor
                  basicFieldInfo={basic}
                  onChange={handleBasicChange}
                />
              )}
            </div>
          </div>
        </div>

        <SheetFooter className='sticky bottom-0 bg-background border-t pt-4'>
          <SheetClose asChild>
            <div className='flex justify-end gap-2'>
              <Button variant='ghost' onClick={onClose} disabled={!isDirty}>
                Cancel
              </Button>
              <Button
                onClick={onSave}
                disabled={!isDirty || !isFieldValid(selectedField.key)}
              >
                Save Changes
              </Button>
            </div>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
