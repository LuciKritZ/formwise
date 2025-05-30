import { ALIGN_OPTIONS, WIDTH_OPTIONS } from "@/constants/fields";

// Field Types
export type FieldType = 'text' | 'email' | 'textarea' | 'number' | 'checkbox' | 'select';

// Base Types
export type BaseValidationRule = {
  required?: boolean;
  customMessage?: string;
};

export type TextValidationRule = BaseValidationRule & {
  minLength?: number;
  maxLength?: number;
  pattern?: string;
};

export type NumberValidationRule = BaseValidationRule & {
  min?: number;
  max?: number;
  step?: number;
};

export type SelectValidationRule = BaseValidationRule & {
  minSelect?: number;
  maxSelect?: number;
};

// Validation Rules per Field Type
export type ValidationRules = {
  text?: TextValidationRule;
  email?: TextValidationRule;
  textarea?: TextValidationRule;
  number?: NumberValidationRule;
  checkbox?: BaseValidationRule;
  select?: SelectValidationRule;
};

// Field Metadata
export interface FieldMetadata {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDirty?: boolean;
  isTouched?: boolean;
  errors?: string[];
}

// Field Configuration
export interface FieldConfig {
  isDisabled?: boolean;
  isReadOnly?: boolean;
  isHidden?: boolean;
  tabIndex?: number;
  autoFocus?: boolean;
  autoComplete?: string;
}

// Base Field Info
export interface BasicFieldInfo {
  label: string;
  placeholder?: string;
  description?: string;
  helpText?: string;
  defaultValue?: string | number | boolean;
  config?: FieldConfig;
}

// Layout Information
export interface LayoutInfo {
  width?: typeof WIDTH_OPTIONS[number];
  align?: typeof ALIGN_OPTIONS[number];
  hidden?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

// Main Field Interface
export interface FormField {
  key: string;
  type: FieldType;
  validations?: ValidationRules;
  basic: BasicFieldInfo;
  layout?: LayoutInfo;
  metadata?: FieldMetadata;
}

// Field State
export interface FieldState {
  value: any;
  errors: string[];
  isDirty: boolean;
  isTouched: boolean;
  isValid: boolean;
}

// Field Props
export interface FieldProps {
  field: FormField;
  state: FieldState;
  onChange: (value: any) => void;
  onBlur: () => void;
  onFocus: () => void;
}

// Field Editor Props
export interface FieldEditorProps {
  field: FormField;
  onChange: (field: FormField) => void;
  onDelete?: () => void;
  onDuplicate?: () => void;
}

// Validation Error
export interface ValidationError {
  code: string;
  message: string;
  field: string;
  value?: any;
}

// Form State
export interface FormState {
  fields: FormField[];
  values: Record<string, any>;
  errors: Record<string, ValidationError[]>;
  isDirty: boolean;
  isValid: boolean;
  isSubmitting: boolean;
  selectedFieldId: string | null;
}

// Store State
export interface StoreState extends FormState {
  // Actions
  addField: (field: FormField) => void;
  removeField: (key: string) => void;
  updateField: (field: FormField) => void;
  moveField: (from: number, to: number) => void;
  setFields: (fields: FormField[]) => void;
  setSelectedFieldId: (id: string | null) => void;
  updateFieldValidations: (key: string, validations: any) => void;
  clearForm: () => void;
  setFieldErrors: (key: string, errors: ValidationError[]) => void;
  setFieldState: (key: string, state: Partial<FieldState>) => void;

  // Selectors
  getFieldByKey: (key: string) => FormField | undefined;
  getFieldErrors: (key: string) => ValidationError[];
  isFieldValid: (key: string) => boolean;
}
