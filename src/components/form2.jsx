import useForm2 from '../hooks/useForm2';
import {useState, useEffect} from 'react'

const fieldConfig = [
  { field: "name", label: "Name", type: "text" },
  { field: "email", label: "Email", type: "email" },
  { field: "subscribed", label: "Subscribed", type: "checkbox" },
];

const Form2 = () => {
  const {
    inputProps,
    isDirty,
    setInitialValues,
    updatedValues,
    values,
  } = useForm2(fieldConfig);

  useEffect(() => {
    const fakeUser = {
      name: "omar",
      email: "omar@example.com",
      subscribed: true,
    };

    setTimeout(() => {
      setInitialValues(fakeUser);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
     alert('Form submitted:\n' + JSON.stringify(values, null, 2));
    alert("Updated:\n" + JSON.stringify(updatedValues, null, 2));
    setInitialValues(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Settings</h2>
      {fieldConfig.map(({ field, label, type }) => (
        <div key={field}>
          <label>
            {type === "checkbox" ? (
              <>
                <input {...inputProps[field]} />
                {label}
              </>
            ) : (
              <>
                {label}:
                <input {...inputProps[field]} style={{ width: "100%" }} />
              </>
            )}
          </label>
        </div>
      ))}

      <button type="submit" disabled={!isDirty}>
        Save Changes
      </button>
    </form>
  );
};
export default Form2;