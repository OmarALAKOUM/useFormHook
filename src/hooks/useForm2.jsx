import { useState, useMemo } from "react";

// const useForm2 = (initial) => {
//   const [values, setValues] = useState(initial);
//   const [initialValues, setInitialValuesState] = useState(initial);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setValues((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const updatedValues = useMemo(() => {
//     const changed = {};
//     for (const key in values) {
//       if (JSON.stringify(values[key]) !== JSON.stringify(initialValues[key])) {
//         changed[key] = values[key];
//       }
//     }
//     console.log("Changed fields only:", changed);
//     return changed;
//   }, [values, initialValues]);

//   const setInitialValues = (newValues) => {
//     const clone = JSON.parse(JSON.stringify(newValues));
//     console.log('initial values', newValues);
//     setInitialValuesState(clone);
//     setValues(clone);
//   };

//   const isDirty = useMemo(() => {
//     return JSON.stringify(values) !== JSON.stringify(initialValues);
//   }, [values, initialValues]);

//   return {
//     values,
//     handleChange,
//     isDirty,
//     setInitialValues,
//     updatedValues,
//   };
// };

// export default useForm2;
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

  return {
    values,
    handleChange,
    isDirty,
    updatedValues,
    setInitialValues,
  };
};
export default useForm2;