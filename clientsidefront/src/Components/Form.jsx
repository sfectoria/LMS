// import React, { useState } from 'react'
// import axios from "axios";
// import { Snackbar } from '@mui/base';
// import Alert from '@mui/material/Alert';

// export default function Form() {
//   const [open, setOpen] = React.useState(false);
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:3100/api/v1", form);
//       console.log(response);
//     } catch (error) {
//       console.log(error);
//     }

//   };
//   const handleClose = (event, reason) => {
//     if (reason === 'clickaway') {
//       return;
//     }

//     setOpen(false);
//   };
//   const handleClick = () => {
//     setOpen(true);
//   };

//     const [form, setForm] = useState({});


//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setForm({ ...form, [name]: value });
//       };
//   return (
//     <div className='wrapper'> 
    
//     <Form action=''>
//         <h1>Registration form</h1>
//         <div className='input-box'>

//         <Form.Control
//               required
//                 className="px-3 border border-info"
//                 type="text"
//                 name="FirstName"
//                 placeholder="FirstName"
//                 onChange={handleChange}
//               />
//         </div>

//         <div className='input-box'>
//         <Form.Control
//                 name="LastName"
//                 className="border border-info"
//                 placeholder="LastName"
//                 onChange={handleChange}
//               />
//         </div>


//         <div className='input-box'>
//         <Form.Control
//                 name="email"
//                 className="px-3 border border-info"
//                 placeholder="Email"
//                 onChange={handleChange}
//               />  
//         </div>
//         <button
//                 type="submit"
//                 name="button"
//                 class="btn btn-info"
//                 onSubmit={() => handleSubmit()}
//                 onClick={handleClick}
//               >
//                 validate my registration request
//                </button>
//                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
//                <Alert
//     onClose={handleClose}
//     severity="success"
//     variant="filled"
//     sx={{ width: '100%' }}
//   >
//     Thanks for submitting the form.
//   </Alert>
// </Snackbar>
//     </Form>
    
    
//     </div>
//   )
// }
