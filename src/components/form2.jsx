import useForm2 from '../hooks/useForm2';

const Form2 = () => {
  const { values, handleChange, isDirty, setInitialValues,updatedValues, } = useForm2({
    name: 'omar',
    email: 'omar@example.com',
    subscribed: true,
  });

  // const [userLoaded, setUserLoaded] = useState(false);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     const fakeUser = {
  //       name: 'omar',
  //       email: 'omar@example.com',
  //       subscribed: true,
  //     };

  //     setTimeout(() => {
  //       setInitialValues(fakeUser);
  //       setUserLoaded(true);
  //     }, 1000);
  //   };

  //   loadUser();
  // }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted:\n' + JSON.stringify(values, null, 2));
    alert ('Update Values' + JSON.stringify(updatedValues,null,2));
    setInitialValues(values); 
  };

  return (
    <div style={{ maxWidth: '400px' }}>
      <h2>User Settings</h2>
      {//!userLoaded ? (
       // <p>Loading user...</p>
     // ) : 
     (
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input
              name="name"
              value={values.name || ''}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>

          <div>
            <label>Email:</label>
            <input
              name="email"
              type="email"
              value={values.email || ''}
              onChange={handleChange}
              style={{ width: '100%' }}
            />
          </div>

          <div>
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

          <button
            type="submit"
            
            disabled={!isDirty}
          >
            Save Changes
          </button>

          {!isDirty && (
            <p style={{ color: 'gray', marginTop: '0.5rem' }}>
              No changes yet.
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default Form2;
