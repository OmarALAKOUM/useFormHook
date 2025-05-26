import { useState, useEffect, useRef } from 'react';

const useForm2 = (initialValues = {}) => {
  const [values, setValues] = useState(() => ({ ...initialValues }));
  const [isDirty, setIsDirty] = useState(false);
  const initialRef = useRef({ ...initialValues });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  // useEffect(() => {
  //   const dirty = Object.keys(values).some(
  //     (key) => values[key] !== initialRef.current[key]
  //   );
  //   setIsDirty(dirty);
  // }, [values]);
  useEffect(() => {
  const dirty = JSON.stringify(values) !== JSON.stringify(initialRef.current);
  setIsDirty(dirty);
}, [values]);

  const setInitialValues = (newInitials) => {
    const clone = { ...newInitials };
    initialRef.current = clone;
    setValues(clone);
    setIsDirty(false);
  };

  return {
    values,
    handleChange,
    setValues,
    isDirty,
    setInitialValues,
  };
};

export default useForm2;
