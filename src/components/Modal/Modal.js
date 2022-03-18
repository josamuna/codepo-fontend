// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//   Dialog,
//   DialogContent,
//   Box,
//   Button
// } from '@material-ui/core';

// const Modal = ({ handleClose, show, children }) => {
//   const showHideClassName = show ? 'modal display-block' : 'modal display-none';

//   return (
//     <Dialog className={showHideClassName}>
//       <DialogContent dividers>
//         {children}
//         <Box style={{
//           width: '100%',
//           display: 'flex',
//           justifyContent: 'flex-end'
//         }}
//         >
//           <Button
//             color="primary"
//             variant="contained"
//             type="button"
//             borderRadius="10px"
//             onClick={handleClose}
//           >
//             Close
//           </Button>
//         </Box>
//       </DialogContent>
//     </Dialog>
//   );
// };

// Modal.propTypes = {
//   handleClose: PropTypes.array.isRequired,
//   show: PropTypes.array.isRequired,
//   children: PropTypes.array.isRequired,
// };

// export default Modal;
import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography
} from '@material-ui/core';

export default function Popup(props) {
  const {
    title,
    children,
    openPopup,
    setOpenPopup
  } = props;

  return (
    <Dialog open={openPopup}>
      <DialogTitle>
        <div style={{ display: 'flex' }}>
          <Typography variant="h6" component="div" style={{ flexGrow: 1 }}>
            {title}
          </Typography>
          <Button
            color="secondary"
            onClick={() => setOpenPopup(false)}
          >
            X
          </Button>
        </div>
      </DialogTitle>
      <DialogContent dividers>
        {children}
      </DialogContent>
    </Dialog>
  );
}

Popup.propTypes = {
  openPopup: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
  title: PropTypes.array.isRequired,
  setOpenPopup: PropTypes.array.isRequired
};
