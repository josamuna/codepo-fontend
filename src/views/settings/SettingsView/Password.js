// import React, { useState } from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import {
//   Box,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Divider,
//   TextField,
//   makeStyles
// } from '@material-ui/core';

// const useStyles = makeStyles(({
//   root: {}
// }));

// const Password = ({ className, ...rest }) => {
//   const classes = useStyles();
//   const [values, setValues] = useState({
//     password: '',
//     confirm: ''
//   });

//   const handleChange = (event) => {
//     setValues({
//       ...values,
//       [event.target.name]: event.target.value
//     });
//   };

//   return (
//     <form
//       className={clsx(classes.root, className)}
//       {...rest}
//     >
//       <Card>
//         <CardHeader
//           subheader="Update password"
//           title="Password"
//         />
//         <Divider />
//         <CardContent>
//           <TextField
//             fullWidth
//             label="Password"
//             margin="normal"
//             name="password"
//             onChange={handleChange}
//             type="password"
//             value={values.password}
//             variant="outlined"
//           />
//           <TextField
//             fullWidth
//             label="Confirm password"
//             margin="normal"
//             name="confirm"
//             onChange={handleChange}
//             type="password"
//             value={values.confirm}
//             variant="outlined"
//           />
//         </CardContent>
//         <Divider />
//         <Box
//           display="flex"
//           justifyContent="flex-end"
//           p={2}
//         >
//           <Button
//             color="primary"
//             variant="contained"
//           >
//             Update
//           </Button>
//         </Box>
//       </Card>
//     </form>
//   );
// };

// Password.propTypes = {
//   className: PropTypes.string
// };

// export default Password;
import React from 'react';
import { SketchPicker } from 'react-color';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Box,
  Button
} from '@material-ui/core';

class ColorPick extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      background: 'fff',
    };
  }

  render() {
    return (
      <Card>
        <CardHeader
          subheader="Manage Preferences"
          title="Settings"
        />
        <Divider />
        <CardContent>
          <SketchPicker color={this.setState.background} width="400px" />
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
          >
            Appy
          </Button>
        </Box>
      </Card>
    );
  }
}

export default ColorPick;
