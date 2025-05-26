import React, { useEffect, useState } from 'react';
import useForm2 from '../hooks/useForm2';

const Form2 = () => {
  const {
    values,
    handleChange,
    isDirty,
    setInitialValues,
  } = useForm2({
    name: '',
    email: '',
    subscribed: false,
  });

  const [userLoaded, setUserLoaded] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      const fakeUser = {
        name: 'omar',
        email: 'omar@example.com',
        subscribed: true,
      };

      setTimeout(() => {
        setInitialValues(fakeUser);
        setUserLoaded(true);
      }, 1000);
    };

    loadUser();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted:\n' + JSON.stringify(values, null, 2));
    setInitialValues(values); 
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h2>User Settings</h2>

      {!userLoaded ? (
        <p>Loading user...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Name:</label>
            <input
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '1rem' }}>
            <label>
              <input
                name="subscribed"
                type="checkbox"
                checked={values.subscribed || false}
                onChange={handleChange}
              />
              Subscribed to newsletter
            </label>
          </div>

          <button type="submit" disabled={!isDirty}>
            Save Changes
          </button>

          {!isDirty && <p style={{ color: 'gray' }}>No changes yet.</p>}
        </form>
      )}
    </div>
  );
};

export default Form2;
