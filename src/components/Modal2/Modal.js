import React from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogContent,
  Box,
  Button
} from '@material-ui/core';

export default function Popup(props) {
  const {
    children,
    openPopup,
    setOpenPopup
  } = props;

  return (
    <Dialog open={openPopup}>
      <DialogContent dividers>
        {children}
        <Box style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'flex-end'
        }}
        >
          <Button
            color="#ED1628"
            variant="contained"
            type="submit"
            borderRadius="10px"
            onClick={() => setOpenPopup(false)}
          >
            Close
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

Popup.propTypes = {
  openPopup: PropTypes.array.isRequired,
  children: PropTypes.array.isRequired,
  setOpenPopup: PropTypes.array.isRequired,
};
