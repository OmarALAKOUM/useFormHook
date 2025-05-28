import useForm2 from '../hooks/useForm2';
import {useState, useEffect} from 'react'
// const Form2 = () => {
//   const { values, handleChange, isDirty, setInitialValues,updatedValues, } = useForm2({
//     name: 'omar',
//     email: 'omar@example.com',
//     subscribed: true,
//   });

//   // const [userLoaded, setUserLoaded] = useState(false);

//   // useEffect(() => {
//   //   const loadUser = async () => {
//   //     const fakeUser = {
//   //       name: 'omar',
//   //       email: 'omar@example.com',
//   //       subscribed: true,
//   //     };

//   //     setTimeout(() => {
//   //       setInitialValues(fakeUser);
//   //       setUserLoaded(true);
//   //     }, 1000);
//   //   };

//   //   loadUser();
//   // }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert('Form submitted:\n' + JSON.stringify(values, null, 2));
//     alert ('Update Values' + JSON.stringify(updatedValues,null,2));
//     setInitialValues(values); 
//   };

//   return (
//     <div style={{ maxWidth: '400px' }}>
//       <h2>User Settings</h2>
//       {//!userLoaded ? (
//        // <p>Loading user...</p>
//      // ) : 
//      (
//         <form onSubmit={handleSubmit}>
//           <div>
//             <label>Name:</label>
//             <input
//               name="name"
//               value={values.name || ''}
//               onChange={handleChange}
//               style={{ width: '100%' }}
//             />
//           </div>

//           <div>
//             <label>Email:</label>
//             <input
//               name="email"
//               type="email"
//               value={values.email || ''}
//               onChange={handleChange}
//               style={{ width: '100%' }}
//             />
//           </div>

//           <div>
//             <label>
//               <input
//                 name="subscribed"
//                 type="checkbox"
//                 checked={values.subscribed || false}
//                 onChange={handleChange}
//               />
//               Subscribed to newsletter
//             </label>
//           </div>

//           <button
//             type="submit"
            
//             disabled={!isDirty}
//           >
//             Save Changes
//           </button>

//           {!isDirty && (
//             <p style={{ color: 'gray', marginTop: '0.5rem' }}>
//               No changes yet.
//             </p>
//           )}
//         </form>
//       )}
//     </div>
//   );
// };

// export default Form2;
const fieldConfig = [
  { field: "name", label: "Name", type: "text" },
  { field: "email", label: "Email", type: "email" },
  { field: "subscribed", label: "Subscribed", type: "checkbox" },
];

const Form2 = () => {
  const {
    values,
    handleChange,
    isDirty,
    updatedValues,
    setInitialValues,
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
    alert("Submitted changes:\n" + JSON.stringify(updatedValues, null, 2));
    setInitialValues(values);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>User Settings</h2>
      {fieldConfig.map(({ field, label, type }) => (
        <div key={field} style={{ marginBottom: "1rem" }}>
          <label>
            {type === "checkbox" ? (
              <>
                <input
                  type="checkbox"
                  name={field}
                  checked={values[field]}
                  onChange={handleChange}
                />
                {label}
              </>
            ) : (
              <>
                {label}:
                <input
                  type={type}
                  name={field}
                  value={values[field]}
                  onChange={handleChange}
                  style={{ width: "100%" }}
                />
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