import { FormField } from '@/types/field';
import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface Props {
  field: FormField;
}

export const CheckboxPreview = ({ field }: Props) => {
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (val: boolean) => {
    setChecked(val);
    if (field.validations?.required && !val) {
      setError(field.validations.customMessage || 'Required');
    } else {
      setError(null);
    }
  };

  return (
    <div className='space-y-2'>
      <Label>{field.basic.label}</Label>
      <div className='flex items-center gap-2'>
        <Checkbox checked={checked} onCheckedChange={handleChange} />
        <span>{field.basic.description}</span>
      </div>
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
};
