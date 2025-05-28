import { FormField } from '@/types/field';
import { useState } from 'react';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface Props {
  field: FormField;
}

// Placeholder options for demo purposes
const OPTIONS = ['Option 1', 'Option 2', 'Option 3'];

export const SelectPreview = ({ field }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange = (val: string) => {
    setValue(val);
    if (field.validations?.required && !val) {
      setError(field.validations.customMessage || 'Required');
    } else {
      setError(null);
    }
  };

  return (
    <div className='space-y-2'>
      <Label>{field.basic.label}</Label>
      <Select value={value} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder={field.basic.placeholder || 'Select...'} />
        </SelectTrigger>
        <SelectContent>
          {OPTIONS.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
};
