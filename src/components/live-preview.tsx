import { BasicFieldInfo, LayoutInfo, ValidationRules } from '@/types/field';
import { cn } from '@/utils/cn';
import { Input } from '@/components/ui/input';

type Props = {
  basic: BasicFieldInfo;
  layout: LayoutInfo;
  validations: ValidationRules;
};

export const LiveFieldPreview = ({ basic, layout, validations }: Props) => {
  if (!basic) return null;

  const widthClass = {
    full: 'w-full',
    half: 'w-1/2',
    third: 'w-1/3',
  }[layout?.width ?? 'full'];

  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[layout?.align ?? 'left'];

  return (
    <div
      className={cn(
        'p-4 rounded-lg border bg-background space-y-2 transition-all',
        widthClass,
        alignClass
      )}
    >
      <label className='block text-sm font-medium'>{basic.label}</label>
      <Input
        placeholder={basic.placeholder ?? ''}
        required={validations?.required}
      />
    </div>
  );
};
