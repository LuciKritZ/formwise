import { FormField } from "@/types/field";

export const FIELDS: FormField[] = [
  {
    id: 'text', key: 'text-input', basic: {
      label: 'Text Input', description: '',
      placeholder: '',
    }
  },
  {
    id: 'checkbox', key: 'checkbox', basic: {
      label: 'Checkbox', description: '',
      placeholder: '',
    }
  },
  {
    id: 'select', key: 'select', basic: {
      label: 'Select', description: '',
      placeholder: '',
    }
  },
];

export const WIDTH_OPTIONS = ['half', 'full', 'third'] as const;
export const ALIGN_OPTIONS = ['left', 'center', 'right'] as const;
