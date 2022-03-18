import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
// import { ToastContainer } from 'react-toastify';
import notifyInformation from 'src/components/errorToastNotification';
// #0894D8

class ConfirmationMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      // id: props.id,
    };
  }

  // doSome() {
  //   notifyInformation('Deleted succefullyyyyy');
  // }

  doDelete = async () => {
    /* eslint-disable  react/destructuring-assignment */
    // console.log(this.props);
    this.props.function(this.props.id, this.props.userId);
    // notifyInformation('Salut les gars');
    this.props.setOpenPopup(false);
    setTimeout(() => {
      notifyInformation('Deleted succefully');
    }, 2000);
  }

  render() {
    /* eslint-disable no-nested-ternary */
    // const {
    //   doDelete,
    // } = this.state;
    // console.log(doDelete);

    return (
      <Box style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        borderTop: '5px solid #0894D8'
      }}
      >
        <Box>
          <Box>
            <div
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
              }}
            >
              <IconButton color="green" size="medium" style={{ marginBottom: '60%' }}>
                <HelpOutlineIcon style={{ color: '#0894D8' }} size="large" />
                {/* <CheckCircleIcon style={{ color: `${color}` }} /> */}
              </IconButton>
            </div>
          </Box>
          {/* <h2
            style={{
              textAlign: 'center',
              width: '100%',
              color: '#0894D8',
              fontFamily: '-appleSystem, BlinkMacSystemFont,
              Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
            padding="10px"
          >
            Confirm
          </h2> */}
          <Divider />
        </Box>
        <Box padding="10px">
          <Typography variant="h4" style={{ fontWeight: 'lighter', textAlign: 'center' }}>
            Are you sure you want to delete this data
          </Typography>
        </Box>
        <Box padding="10px">
          <Button
            // className={classes.importButton}
            color="primary"
            variant="contained"
            onClick={() => {
              // notifyInformation('Salut les gars');
              this.doDelete();
            }}
          >
            YES
          </Button>
          {/* <ToastContainer /> */}
        </Box>
      </Box>
    );
  }
}

ConfirmationMessage.propTypes = {
  function: PropTypes.any,
  id: PropTypes.any,
  userId: PropTypes.any,
  setOpenPopup: PropTypes.any
};

export default ConfirmationMessage;
