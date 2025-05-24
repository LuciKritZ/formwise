import { useFormStoreBase } from '@/store/form';

export const useFormStore = () => {
  const formFields = useFormStoreBase((s) => s.formFields);
  const selectedFieldId = useFormStoreBase((s) => s.selectedFieldId);
  const addField = useFormStoreBase((s) => s.addField);
  const removeField = useFormStoreBase((s) => s.removeField);
  const updateField = useFormStoreBase((s) => s.updateField);
  const clearForm = useFormStoreBase((s) => s.clearForm);
  const setSelectedFieldId = useFormStoreBase((s) => s.setSelectedFieldId);
  const moveField = useFormStoreBase((s) => s.moveField);
  const setFormFields = useFormStoreBase((s) => s.setFormFields);
  const getSelectedField = useFormStoreBase((s) => s.getSelectedField);

  return {
    formFields,
    selectedFieldId,
    addField,
    removeField,
    updateField,
    clearForm,
    setSelectedFieldId,
    moveField,
    setFormFields,
    getSelectedField,
  };
};
