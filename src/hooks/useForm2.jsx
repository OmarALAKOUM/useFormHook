import { useState, useMemo, useCallback } from "react";

const useForm2 = (fieldConfig, schema) => {
  const initial = fieldConfig.reduce((acc, field) => {
    acc[field.field] = field.type === "checkbox" ? false : "";
    return acc;
  }, {});

  const [values, setValues] = useState(initial);
  const [initialValues, setInitialValuesState] = useState(initial);
  const [errors, setErrors] = useState({});

  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues((prev) => {
      const updated = { ...prev, [name]: newValue };

      const result = schema.safeParse(updated);
      if (!result.success) {
        const formatted = result.error.format();
        setErrors(
          Object.fromEntries(
            Object.entries(formatted).map(([k, v]) => [k, v._errors?.[0]])
          )
        );
      } else {
        setErrors({});
      }

      return updated;
    });
  }, [schema]);

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
  }, [values, handleChange, fieldConfig]);

  const isDirty = useMemo(() => {
    return Object.keys(values).some(
      (key) =>
        JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])
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

  const setInitialValues = (newValues) => {
    setInitialValuesState({ ...newValues });
    setValues({ ...newValues });
    setErrors({});
  };

  return {
    values,
    inputProps,
    errors,
    isDirty,
    updatedValues,
    handleChange,
    setInitialValues,
  };
};

export default useForm2;
