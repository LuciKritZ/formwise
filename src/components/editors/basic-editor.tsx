import { BasicFieldInfo } from '@/types/field';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FC } from 'react';

interface BasicFieldEditorProps {
  basicFieldInfo: BasicFieldInfo;
  onChange: (newData: BasicFieldInfo) => void;
}

const BasicFieldEditor: FC<BasicFieldEditorProps> = ({
  basicFieldInfo,
  onChange,
}: BasicFieldEditorProps) => {
  const updateBasicKey = <K extends keyof BasicFieldInfo>(
    key: K,
    value: BasicFieldInfo[K]
  ) => {
    onChange({ ...basicFieldInfo, [key]: value });
  };

  return (
    <div className='space-y-4'>
      <h3 className='font-semibold text-lg underline'>Basic Info</h3>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Label</Label>
        <Input
          value={basicFieldInfo.label ?? ''}
          onChange={(e) => updateBasicKey('label', e.target.value)}
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Placeholder</Label>
        <Input
          value={basicFieldInfo.placeholder ?? ''}
          onChange={(e) => updateBasicKey('placeholder', e.target.value)}
          className='w-full px-3 py-2 border rounded'
        />
      </div>

      <div className='space-y-2'>
        <Label className='block text-sm font-medium'>Description</Label>
        <Input
          value={basicFieldInfo.description ?? ''}
          onChange={(e) => updateBasicKey('description', e.target.value)}
          className='w-full px-3 py-2 border rounded'
        />
      </div>
    </div>
  );
};

export default BasicFieldEditor;
