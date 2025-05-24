import { FormField } from '@/types/field';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FormState = {
  formFields: FormField[];
  selectedFieldId: string | null;

  addField: (field: FormField) => void;
  clearForm: () => void;
  moveField: (from: number, to: number) => void;
  removeField: (id: string) => void;
  updateField: (updatedField: FormField) => void;
  setFormFields: (updatedFields: FormField[]) => void;
  setSelectedFieldId: (id: string | null) => void;
};

export const useFormStoreBase = create<FormState>()(
  persist(
    (set) => ({
      formFields: [],
      selectedFieldId: null,

      setSelectedFieldId: (id) => set({ selectedFieldId: id }),

      addField: (field) =>
        set((state) => ({
          formFields: [...state.formFields, field],
        })),

      moveField: (from, to) =>
        set((state) => {
          const updated = [...state.formFields];
          const [moved] = updated.splice(from, 1);
          updated.splice(to, 0, moved);
          return { formFields: updated };
        }),

      removeField: (id) =>
        set((state) => ({
          formFields: state.formFields.filter((f) => f.key !== id),
        })),

      setFormFields: (updatedFields: FormField[]) =>
        set(() => ({
          formFields: updatedFields,
        })),

      updateField: (updatedField) =>
        set((state) => ({
          formFields: state.formFields.map((f) =>
            f.id === updatedField.id ? updatedField : f
          ),
        })),

      clearForm: () => set({ formFields: [], selectedFieldId: null }),
    }),
    {
      name: 'form-store',
      partialize: (state) => ({
        formFields: state.formFields,
      })
    }
  )
);
