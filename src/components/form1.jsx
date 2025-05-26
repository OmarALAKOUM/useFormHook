import React from 'react';
import useForm from '../hooks/useForm';

const Form1 = () => {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    agree: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
      <input
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Email"
      />
      <label>
        <input
          name="agree"
          type="checkbox"
          checked={values.agree}
          onChange={handleChange}
        />
        Agree to terms
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default Form1;
