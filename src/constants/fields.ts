import { FormField } from "@/types/field";

export const FIELDS: FormField[] = [
  {
    key: 'text-input', type: 'text', basic: {
      label: 'Text Input', description: '',
      placeholder: '',
    }
  },
  {
    key: 'checkbox', type: 'checkbox', basic: {
      label: 'Checkbox', description: '',
      placeholder: '',
    }
  },
  {
    key: 'select', type: 'select', basic: {
      label: 'Select', description: '',
      placeholder: '',
    }
  },
];

export const WIDTH_OPTIONS = ['half', 'full', 'third'] as const;
export const ALIGN_OPTIONS = ['left', 'center', 'right'] as const;
