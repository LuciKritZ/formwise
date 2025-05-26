import { ALIGN_OPTIONS, WIDTH_OPTIONS } from "@/constants/fields";

export interface FormField {
  id: string;
  key: string;
  type?: string;
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
