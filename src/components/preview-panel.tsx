import React from 'react';
import { useFormStore } from '@/hooks/use-form-store';

const PreviewPanel: React.FC = () => {
  const { formFields } = useFormStore();
  return (
    <aside className='w-1/3 bg-gray-50 p-4 border-l overflow-auto'>
      <h2 className='font-bold mb-4'>Live Preview</h2>

      {formFields.length === 0 ? (
        <p className='text-gray-400'>Add fields to see preview</p>
      ) : (
        <form className='space-y-4'>
          {formFields.map((field) => {
            switch (field.id) {
              case 'text':
                return (
                  <div key={field.key}>
                    <label className='block mb-1 font-medium'>
                      {field.label}
                    </label>
                    <input
                      type='text'
                      className='w-full px-3 py-2 border rounded'
                      placeholder={field.label}
                    />
                  </div>
                );
              case 'checkbox':
                return (
                  <div key={field.key} className='flex items-center space-x-2'>
                    <input type='checkbox' id={field.key} />
                    <label htmlFor={field.key}>{field.label}</label>
                  </div>
                );
              case 'select':
                return (
                  <div key={field.key}>
                    <label className='block mb-1 font-medium'>
                      {field.label}
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
