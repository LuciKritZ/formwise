import { ALIGN_OPTIONS, WIDTH_OPTIONS } from "@/constants/fields";

type FieldType = 'text' | 'email' | 'textarea' | 'number' | 'checkbox' | 'select';

export interface FormField {
  key: string;
  type: FieldType;
  validations?: ValidationRules;
  basic: BasicFieldInfo;
  layout?: LayoutInfo;
}

export interface LayoutInfo {
  width?: typeof WIDTH_OPTIONS[number];
  align?: typeof ALIGN_OPTIONS[number];
  hidden?: boolean;
}

export interface BasicFieldInfo {
  label: string;
  placeholder?: string;
  description?: string;
}

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  customMessage?: string;
}
