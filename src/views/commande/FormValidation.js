// import React from 'react';
// import { Button } from '@material-ui/core';

// class Test extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fields: {},
//       errors: {}
//     };
//   }

//   handleValidation() {
//     /* eslint-disable  react/destructuring-assignment */
//     /* eslint-disable  prefer-destructuring */
//     const fields = this.state.fields;
//     const errors = {};
//     let formIsValid = true;

//     if (!fields.ident) {
//       formIsValid = false;
//       errors.ident = 'Cannot be empty';
//     }

//     if (typeof fields.ident !== 'undefined') {
//       if (!fields.ident.match(/^[a-zA-Z]+$/)) {
//         formIsValid = false;
//         errors.ident = 'Only letters';
//       }
//     }

//     if (!fields.email) {
//       formIsValid = false;
//       errors.email = 'Cannot be empty';
//     }

//     if (typeof fields.email !== 'undefined') {
//       const lastAtPos = fields.email.lastIndexOf('@');
//       const lastDotPos = fields.email.lastIndexOf('.');

//       if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields.email.indexOf('@@')
//  === -1 && lastDotPos > 2 && (fields.email.length - lastDotPos) > 2)) {
//         formIsValid = false;
//         errors.email = 'Email is not valid';
//       }
//     }

//     this.setState({ errors });
//     return formIsValid;
//   }

//   handleFormSubmit(e) {
//     e.preventDefault();
//     this.handleValidation();
//   }

//   handleChange(field, e) {
//     const fields = this.state.fields;
//     fields[field] = e.target.value;
//     this.setState({fields});
//   }

//   render() {
//     const { fields } = this.state;
//     const { errors } = this.state;
//     return (
//       <div style={{
//         width: '400px',
//         display: 'flex',
//         flexDirection: 'column',
//         padding: '20px 40px',
//         borderRadius: '10px',
//         backgroundColor: '#ffffff',
//         alignItems: 'center',
//         justifyContent: 'center'
//       }}
//       >
//         <h1 style={{
//           textAlign: 'center',
//           width: '100%',
//           color: '#111',
//           fontWeight: 'lighter',
//           fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI,
// Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
//         }}
//         >
//           DEVICE
//         </h1>
//         <form
//           onSubmit = {this.handleFormSubmit.bind(this)}
//           noValidate
//           style={{
//             width: '100%',
//             display: 'flex',
//             flexWrap: 'wrap',
//             fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI,
// Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
//           }}
//         >
//           <div style={{
//             marginRight: '1%',
//             display: 'flex',
//             flexDirection: 'column',
//             marginBottom: '15px',
//             width: '100%'
//           }}
//           >
//             <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
//             <label
//               htmlFor="id"
//               style={{
//                 fontSize: '0.8em',
//                 marginBottom: '0.25em',
//                 color: '#222',
//                 fontWeight: 'lighter'
//               }}
//             >
//               Case Identity
//             </label>
//             <input
//               ref="ident"
//               type="text"
//               className="identity"
//               placeholder="Case identity"
//               name="ident"
//               noValidate
//               value={fields['ident']}
//               onChange={this.handleChange.bind(this, "ident")}
//               style={{
//                 padding: '10px 10px',
//                 borderRadius: '5px',
//                 outline: 'none',
//                 border: '1px solid #cfcfcf'
//               }}
//             />
//             {errors['ident'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>
// {errors['ident']}</p>}
//           </div>
//           <div style={{
//             marginRight: '1%',
//             display: 'flex',
//             flexDirection: 'column',
//             marginBottom: '15px',
//             width: '100%'
//           }}
//           >
//             <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
//             <label
//               style={{
//                 fontSize: '0.8em',
//                 marginBottom: '0.25em',
//                 color: '#222',
//                 fontWeight: 'lighter'
//               }}
//               htmlFor="extid"
//             >
//               Mode
//             </label>
//             <input
//               ref="email"
//               type="text"
//               className="email"
//               placeholder="email"
//               name="email"
//               noValidate
//               value={fields['email']}
//               onChange={this.handleChange.bind(this, "email")}
//               style={{
//                 padding: '10px 10px',
//                 borderRadius: '5px',
//                 outline: 'none',
//                 border: '1px solid #cfcfcf'
//               }}
//             />
//             {errors['email'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>
// {errors['email']}</p>}
//           </div>
//           <div style={{
//             width: '100%',
//             display: 'flex',
//             flexDirection: 'column'
//           }}
//           >
//             <Button
//               color="primary"
//               variant="contained"
//               type="submit"
//             >
//               Add Device
//             </Button>
//           </div>
//         </form>
//       </div>
//     );
//   }
// };

// export default Test;
