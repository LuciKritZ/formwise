export interface FormField {
  id: string;
  key: string;
  required?: boolean;
  type?: string;
  validations?: ValidationRules;
  basic: BasicFieldInfo;
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
