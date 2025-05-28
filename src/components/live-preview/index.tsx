import { FormField } from '@/types/field';
import { TextInputPreview } from './text-input-preview';
import { CheckboxPreview } from './checkbox-preview';
import { SelectPreview } from './select-preview';

interface LivePreviewProps {
  field: FormField;
}

export const LivePreview = ({ field }: LivePreviewProps) => {
  const { type } = field;

  if (!type) return null;

  switch (type) {
    case 'text':
      return <TextInputPreview field={field} />;
    case 'checkbox':
      return <CheckboxPreview field={field} />;
    case 'select':
      return <SelectPreview field={field} />;
    default:
      return (
        <div className='text-sm text-muted-foreground'>
          Preview not available for this field type: <code>{type} </code>
        </div>
      );
  }
};
