import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import Modal from 'src/components/Modal/Modal';
import AddDeviceForm from 'src/components/Modal/AddDeviceForm';
import USER_CONNECTED from '../../../user-connected';

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
        <Box
          display="flex"
          justifyContent="flex-end"
        >
          {
            (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
              ? (
                // <Link to="/app/AddDevices">
                <Button
                  className={classes.importButton}
                  color="primary"
                  variant="contained"
                  onClick={() => setOpenPopup(true)}
                >
                  Add Device
                </Button>
                // </Link>
              )
              : <Box />
          }
        </Box>
      </div>
      <Modal
        title=""
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddDeviceForm setOpenPopup={setOpenPopup} />
      </Modal>
    </fragment>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
