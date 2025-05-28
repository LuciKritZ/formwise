import { FormField } from '@/types/field';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/utils/cn';
import { getWrapperClass } from '@/utils/live-preview';

interface Props {
  field: FormField;
}

const getWidthClass = (width?: string) => {
  switch (width) {
    case 'full':
      return 'w-full';
    case '1/2':
      return 'w-1/2';
    case '1/3':
      return 'w-1/3';
    case '1/4':
      return 'w-1/4';
    default:
      return 'w-full';
  }
};

const getAlignClass = (align?: string) => {
  switch (align) {
    case 'center':
      return 'text-center';
    case 'right':
      return 'text-right';
    default:
      return 'text-left';
  }
};

export const TextInputPreview = ({ field }: Props) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { validations } = field;

  const validate = (val: string) => {
    if (!validations) return null;

    if (validations.required && val.trim() === '') {
      return validations.customMessage || 'This field is required';
    }
    if (validations.minLength && val.length < validations.minLength) {
      return `Minimum length is ${validations.minLength}`;
    }
    if (validations.maxLength && val.length > validations.maxLength) {
      return `Maximum length is ${validations.maxLength}`;
    }
    if (validations.pattern) {
      const regex = new RegExp(validations.pattern);
      if (!regex.test(val)) return 'Invalid pattern';
    }
    return null;
  };

  useEffect(() => {
    // Re-run validations whenever the rules change
    setError(validate(value));
  }, [validations]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setValue(val);
    const err = validate(val);
    setError(err);
  };

  const wrapperClass = getWrapperClass({ ...field.layout }, 'space-y-2');

  return (
    <div className={wrapperClass}>
      <Label>{field.basic.label}</Label>
      <Input
        value={value}
        onChange={handleChange}
        placeholder={field.basic.placeholder}
        className={cn(error && 'border-red-500')}
      />
      {error && <p className='text-sm text-red-500'>{error}</p>}
    </div>
  );
};
