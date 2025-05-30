import { useFormStore as useFormStoreBase } from '@/store/form';

export const useFormStore = () => {
  const store = useFormStoreBase();

  return {
    // State
    fields: store.fields,
    values: store.values,
    errors: store.errors,
    isDirty: store.isDirty,
    isValid: store.isValid,
    isSubmitting: store.isSubmitting,
    selectedFieldId: store.selectedFieldId,
    selectedField: store.selectedFieldId
      ? store.getFieldByKey(store.selectedFieldId)
      : null,

    // Actions
    addField: store.addField,
    removeField: store.removeField,
    updateField: store.updateField,
    moveField: store.moveField,
    setFields: store.setFields,
    setSelectedFieldId: store.setSelectedFieldId,
    updateFieldValidations: store.updateFieldValidations,
    clearForm: store.clearForm,
    setFieldErrors: store.setFieldErrors,
    setFieldState: store.setFieldState,

    // Selectors
    getFieldByKey: store.getFieldByKey,
    getFieldErrors: store.getFieldErrors,
    isFieldValid: store.isFieldValid,
  };
};
