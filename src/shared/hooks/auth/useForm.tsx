import { useCallback, useState } from 'react';
import { Preferences } from '@capacitor/preferences';

import { SignupI, UseFormProps, ValidationErrors } from '../../types';

export const useForm = <T extends {}>({ initialValues, validate, onSubmit }: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<ValidationErrors<T>>({});
  const [touchedFields, setTouchedFields] = useState<Partial<Record<keyof T, boolean>>>({});
  const [isValid, setIsValid] = useState<Partial<Record<keyof T, boolean>>>({});

  // Uses useCallback to optimize and asynchronously save form data in Preferences.
  const handleChange = useCallback(
    async (e: CustomEvent) => {
      const { name, value, type, checked } = e.target as HTMLInputElement;
      const newValue = type === 'checkbox' ? checked : value;

      const updatedValues = { ...values, [name]: newValue };
      setValues(updatedValues);

      await Preferences.set({
        key: 'formData',
        value: JSON.stringify(updatedValues),
      });

       // Validate the specific field
       const fieldErrors = validate({ ...values, [name]: newValue });
       setErrors((prev) => ({ ...prev, [name]: fieldErrors[name as keyof T] }));
 
       const isFieldValid = !fieldErrors[name as keyof T];
       setIsValid((prev) => ({ ...prev, [name]: isFieldValid }));
     },
    [values, , validate]
  );

  const reset = useCallback(() => setValues({ ...initialValues }), [initialValues]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      Object.keys(initialValues).forEach((field) => markTouched(field as keyof T));
        return
    }

    onSubmit({ ...values });

    const savedData = await Preferences.get({ key: 'formData' });
    if (savedData) {
        await Preferences.remove({ key: 'formData' });
    }

    reset();
};


  const markTouched = (field: keyof T) => {
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
  };

  return { values, setValues, errors, handleChange, reset, handleSubmit, isValid, markTouched, touchedFields };
};
