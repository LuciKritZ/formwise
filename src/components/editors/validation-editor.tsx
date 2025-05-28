import { ValidationRules } from '@/types/field';
import React, { FC } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';

interface ValidationEditorProps {
  validations: ValidationRules;
  onChange: (newValidations: ValidationRules) => void;
}

const ValidationEditor: FC<ValidationEditorProps> = ({
  validations,
  onChange,
}: ValidationEditorProps) => {
  const updateRule = <K extends keyof ValidationRules>(
    key: K,
    value: ValidationRules[K]
  ) => {
    onChange({ ...validations, [key]: value });
  };

  return (
    <div className='space-y-4 max-w-md'>
      <h3 className='font-semibold text-lg underline'>Validation Rules</h3>
      <div className='items-center flex mx-auto gap-2'>
        <Checkbox
          id='checkbox-validation'
          onCheckedChange={(value) => {
            updateRule('required', !!value);
          }}
          checked={validations.required ?? false}
          title='Required?'
        />
        <Label htmlFor='checkbox-validation'>Required?</Label>
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Min Length</Label>
        <Input
          type='number'
          value={validations.minLength ?? ''}
          min={0}
          onChange={(e) =>
            updateRule(
              'minLength',
              e.target.value ? +e.target.value : undefined
            )
          }
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Max Length</Label>
        <Input
          type='number'
          value={validations.maxLength ?? ''}
          min={0}
          onChange={(e) =>
            updateRule(
              'maxLength',
              e.target.value ? +e.target.value : undefined
            )
          }
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Pattern (Regex)</Label>
        <Input
          type='text'
          value={validations.pattern ?? ''}
          onChange={(e) => updateRule('pattern', e.target.value || undefined)}
          className='w-full px-3 py-2 border rounded'
          placeholder='e.g. ^[A-Za-z]+$'
        />
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>
          Custom Error Message
        </Label>
        <Input
          type='text'
          value={validations.customMessage ?? ''}
          onChange={(e) =>
            updateRule('customMessage', e.target.value || undefined)
          }
          className='w-full px-3 py-2 border rounded'
          placeholder='Message shown on validation failure'
        />
      </div>
    </div>
  );
};

export default ValidationEditor;
