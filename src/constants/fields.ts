import { BasicFieldInfo, FormField } from "@/types/field";

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