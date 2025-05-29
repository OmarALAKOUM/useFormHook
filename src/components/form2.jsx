import useForm2 from "../hooks/useForm2";
import { useEffect } from "react";
import TestRefreshInput from "./TestRefreshInput";
import DynamicField from "./DynamicFields";
import { z } from "zod";
const fieldConfig = [
  {
    field: "name",
    label: "Name",
    type: "text",
    validation: z.string().min(4, "Name is required"),
  },
  {
    field: "email",
    label: "Email",
    type: "email",
    validation: z.string().email("Invalid email address"),
  },
  {
    field: "subscribed",
    label: "Subscribed",
    type: "checkbox",
    validation: z.boolean(),
  },
  {
    field: "bio",
    label: "Biography",
    type: "textarea",
    validation: z.string().optional(),
  },
  {
    field: "role",
    label: "Role",
    type: "select",
    options: ["User", "Admin", "Moderator"],
    validation: z.enum(["User", "Admin", "Moderator"]),
  },
];
const generateZodSchema = (fields) => {
  return z.object(
    fields.reduce((acc, field) => {
      acc[field.field] = field.validation;
      return acc;
    }, {})
  );
};

const schema = generateZodSchema(fieldConfig);

const Form2 = () => {
  const {
    inputProps,
    isDirty,
    errors,
    setInitialValues,
    updatedValues,
    values,
  } = useForm2(fieldConfig, schema);

  useEffect(() => {
    const fakeUser = {
      name: "omar",
      email: "omar@example.com",
      subscribed: true,
      bio:"S",
      role:"Admin",
    };

    setTimeout(() => {
      setInitialValues(fakeUser);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     const result = schema.safeParse(values);
    if (!result.success) {
      alert("Form has validation errors.");
      return;
    }
    alert("Updated:\n" + JSON.stringify(updatedValues, null, 2));
    alert("Values:\n" + JSON.stringify(values, null, 2));
    setInitialValues(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Settings</h2>
      {fieldConfig.map((fieldDef) => (
        <DynamicField
          key={fieldDef.field}
          fieldDef={fieldDef}
          inputProps={inputProps}
          error={errors[fieldDef.field]}
        />
      ))}

      <button type="submit" disabled={!isDirty}>
        Save Changes
      </button>
    </form>
  );
};
export default Form2;
