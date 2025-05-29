import TestRefreshInput from "./TestRefreshInput";

const DynamicField = ({ fieldDef, inputProps, error }) => {
  const { field, label, type, options } = fieldDef;
  const props = { ...inputProps[field], field };

  return (
    <div style={{ marginBottom: "1rem" }}>
      {type === "checkbox" ? (
        <label>
          <TestRefreshInput {...props} /> {label}
        </label>
      ) : type === "textarea" ? (
        <>
          <label htmlFor={field}>{label}</label>
          <TestRefreshInput as="textarea" {...props} rows={4} style={{ width: "100%" }} />
        </>
      ) : type === "select" ? (
        <>
          <label htmlFor={field}>{label}</label>
          <TestRefreshInput as="select" {...props} style={{ width: "100%" }}>
            <option value="">Select</option>
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </TestRefreshInput>
        </>
      ) : (
        <>
          <label htmlFor={field}>{label}</label>
          <TestRefreshInput {...props} style={{ width: "100%" }} />
        </>
      )}
      {error && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};

export default DynamicField;
