
import { useState, useMemo } from 'react';

const useForm2 = (initial) => {
  const [values, setValues] = useState(initial);
  const [initialValues, setInitialValuesState] = useState(initial);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const setInitialValues = (newValues) => {
  const clone = JSON.parse(JSON.stringify(newValues)); 
  setInitialValuesState(clone);
  setValues(clone);
};
const isDirty = useMemo(() => {
  return JSON.stringify(values) !== JSON.stringify(initialValues);
}, [values, initialValues]);



  return {
    values,
    handleChange,
    isDirty,
    setInitialValues,
  };
};

export default useForm2;



