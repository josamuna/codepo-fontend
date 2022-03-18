import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';
// import { Link } from 'react-router-dom';
import Person from '@material-ui/icons/Person';
import Modal from 'src/components/Modal/Modal';
import AddUserModal from 'src/components/Modal/AddUserModal';
import SuccessMessage from 'src/components/Modal/SuccessMessage';

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
  const [openPopup2, setOpenPopup2] = useState(false);

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
          {/* <Link to="/app/AddUser"> */}
          <Button
            className={classes.importButton}
            color="primary"
            variant="contained"
            onClick={() => setOpenPopup(true)}
          >
            <Person />
            Add user
          </Button>
          {/* </Link> */}
        </Box>
      </div>
      <Modal
        title=""
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <AddUserModal setOpenPopup={setOpenPopup} />
      </Modal>
      <Modal
        title=""
        openPopup={openPopup2}
        setOpenPopup={setOpenPopup2}
      >
        <SuccessMessage setOpenPopup={setOpenPopup2} />
      </Modal>
    </fragment>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
