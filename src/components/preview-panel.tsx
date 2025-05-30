import React, { useEffect, useRef } from 'react';
import { useFormStore } from '@/hooks/use-form-store';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';

const PreviewPanel: React.FC = () => {
  const { fields } = useFormStore();
  const isMounted = useRef<boolean>(false);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  if (!isMounted.current) {
    return null;
  }

  return (
    <aside className='w-1/3 bg-gray-50 p-4 overflow-auto'>
      <h2 className='section-heading'>Live Preview</h2>

      {fields.length === 0 ? (
        <p className='text-gray-400'>Add fields to see preview</p>
      ) : (
        <form className='space-y-4'>
          {fields.map((field) => {
            switch (field.type) {
              case 'text':
                return (
                  <div key={field.key}>
                    <label className='block mb-1 font-medium'>
                      {field.basic?.label}
                    </label>
                    <input
                      type='text'
                      className='w-full px-3 py-2 border rounded'
                      placeholder={field.basic?.placeholder}
                    />
                  </div>
                );
              case 'checkbox':
                return (
                  <div key={field.key} className='flex items-center space-x-2'>
                    <Checkbox id={field.key} />
                    <Label htmlFor={field.key}>{field.basic?.label}</Label>
                  </div>
                );
              case 'select':
                return (
                  <div key={field.key}>
                    <label className='block mb-1 font-medium'>
                      {field.basic?.label}
                    </label>
                    <select className='w-full px-3 py-2 border rounded'>
                      <option>Option 1</option>
                      <option>Option 2</option>
                      <option>Option 3</option>
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}
        </form>
      )}
    </aside>
  );
};

export default PreviewPanel;
