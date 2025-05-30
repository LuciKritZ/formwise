import { FormField, FormState, ValidationError, FieldState, StoreState } from '@/types/field';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { devtools } from 'zustand/middleware';

// Action Types
type FormAction =
  | { type: 'ADD_FIELD'; payload: FormField }
  | { type: 'REMOVE_FIELD'; payload: string }
  | { type: 'UPDATE_FIELD'; payload: FormField }
  | { type: 'MOVE_FIELD'; payload: { from: number; to: number } }
  | { type: 'SET_FIELDS'; payload: FormField[] }
  | { type: 'SET_SELECTED_FIELD'; payload: string | null }
  | { type: 'UPDATE_FIELD_VALIDATIONS'; payload: { key: string; validations: any } }
  | { type: 'CLEAR_FORM' }
  | { type: 'SET_FIELD_ERRORS'; payload: { key: string; errors: ValidationError[] } }
  | { type: 'SET_FIELD_STATE'; payload: { key: string; state: Partial<FieldState> } };

// Selectors
const selectFieldByKey = (key: string) => (state: FormState) =>
  state.fields.find((f) => f.key === key);

const selectFieldErrors = (key: string) => (state: FormState) =>
  state.errors[key] || [];

const selectIsFieldValid = (key: string) => (state: FormState) =>
  !state.errors[key]?.length;

// Initial State
const initialState: FormState = {
  fields: [],
  values: {},
  errors: {},
  isDirty: false,
  isValid: true,
  isSubmitting: false,
  selectedFieldId: null,
};

// Store Creation
export const useFormStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,

        // Actions
        addField: (field) =>
          set((state) => ({
            ...state,
            fields: [...state.fields, field],
            isDirty: true,
          })),

        removeField: (key) =>
          set((state) => ({
            ...state,
            fields: state.fields.filter((f) => f.key !== key),
            values: { ...state.values, [key]: undefined },
            errors: { ...state.errors, [key]: [] },
            isDirty: true,
          })),

        updateField: (field) =>
          set((state) => ({
            ...state,
            fields: state.fields.map((f) =>
              f.key === field.key ? { ...f, ...field } : f
            ),
            isDirty: true,
          })),

        moveField: (from, to) =>
          set((state) => {
            const fields = [...state.fields];
            const [moved] = fields.splice(from, 1);
            fields.splice(to, 0, moved);
            return { ...state, fields, isDirty: true };
          }),

        setFields: (fields) =>
          set((state) => ({
            ...state,
            fields,
            isDirty: true,
          })),

        setSelectedFieldId: (id) =>
          set((state) => ({
            ...state,
            selectedFieldId: id,
          })),

        updateFieldValidations: (key, validations) =>
          set((state) => ({
            ...state,
            fields: state.fields.map((f) =>
              f.key === key ? { ...f, validations } : f
            ),
            isDirty: true,
          })),

        clearForm: () =>
          set(() => ({
            ...initialState,
          })),

        setFieldErrors: (key, errors) =>
          set((state) => ({
            ...state,
            errors: { ...state.errors, [key]: errors },
            isValid: !Object.values({ ...state.errors, [key]: errors }).some(
              (e) => e.length > 0
            ),
          })),

        setFieldState: (key, fieldState) =>
          set((state) => ({
            ...state,
            values: {
              ...state.values,
              [key]: fieldState.value ?? state.values[key],
            },
            isDirty: true,
          })),

        // Selectors
        getFieldByKey: (key) => get().fields.find((f) => f.key === key),
        getFieldErrors: (key) => get().errors[key] || [],
        isFieldValid: (key) => !get().errors[key]?.length,
      }),
      {
        name: 'form-store',
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({
          fields: state.fields,
          values: state.values,
        }),
      }
    )
  )
);
