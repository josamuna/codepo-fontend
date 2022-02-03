import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';
import Modal from 'src/components/Modal/Modal';
import AddCommandModal from 'src/components/Modal/AddCommandModal';

const useStyles = makeStyles((theme) => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [openPopup, setOpenPopup] = useState(false);

  return (
    <fragment>
      <div
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Box display="flex">
          <Button
            className={classes.importButton}
            color="primary"
            variant="contained"
            onClick={() => setOpenPopup(true)}
          >
            Add Commande
          </Button>
        </Box>
      </div>
      <Modal
        title=""
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddCommandModal setOpenPopup={setOpenPopup} />
      </Modal>
    </fragment>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
// import React from 'react';
// import PropTypes from 'prop-types';
// import clsx from 'clsx';
// import {
//   Box,
//   Button,
//   makeStyles
// } from '@material-ui/core';
// import { Link } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   root: {},
//   importButton: {
//     marginRight: theme.spacing(1)
//   },
//   exportButton: {
//     marginRight: theme.spacing(1)
//   }
// }));

// const Toolbar = ({ className, ...rest }) => {
//   const classes = useStyles();

//   return (
//     <fragment>
//       <div
//         className={clsx(classes.root, className)}
//         {...rest}
//       >
//         <Box display="flex">
//           <Link to="/app/AddCommand">
//             <Button
//               className={classes.importButton}
//               color="primary"
//               variant="contained"
//             >
//               Add Commande
//             </Button>
//           </Link>
//         </Box>
//       </div>
//     </fragment>
//   );
// };

// Toolbar.propTypes = {
//   className: PropTypes.string
// };

// export default Toolbar;
