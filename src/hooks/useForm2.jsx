import { useState, useMemo } from "react";

const useForm2 = (fieldConfig) => {
  const initial = fieldConfig.reduce((acc, field) => {
    acc[field.field] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [values, setValues] = useState(initial);
  const [initialValues, setInitialValuesState] = useState(initial);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setValues((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const setInitialValues = (newValues) => {
    setInitialValuesState({ ...newValues });
    setValues({ ...newValues });
  };

  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) => JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
    );
  }, [values, initialValues]);

  const updatedValues = useMemo(() => {
    const changed = {};
    for (const key in values) {
      if (JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])) {
        changed[key] = values[key];
      }
    }
    return changed;
  }, [values, initialValues]);

  const inputProps = useMemo(() => {
    const props = {};
    for (const { field, type } of fieldConfig) {
      props[field] = {
        name: field,
        type,
        value: type === "checkbox" ? undefined : values[field],
        checked: type === "checkbox" ? values[field] : undefined,
        onChange: handleChange,
      };
    }
    return props;
  }, [values, fieldConfig]);

  return {
    values,
    handleChange,
    inputProps,
    isDirty,
    updatedValues,
    setInitialValues,
  };
};

export default useForm2;
