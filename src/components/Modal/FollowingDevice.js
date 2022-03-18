import React from 'react';
import {
  Box,
  Typography,
  // Divider,
  // IconButton,
  Button
} from '@material-ui/core';
import PropTypes from 'prop-types';
import notifyInformation from 'src/components/infoToastNotification';
// #0894D8

class FollowingDevice extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isTrack: props.isTrack,
    };
  }

  doFollowing = async () => {
    /* eslint-disable  react/destructuring-assignment */
    this.setState({ isTrack: this.props.isTrack });
    setTimeout(() => {
      notifyInformation('Updated tracking status successfully');
    }, 2000);
    this.props.function(this.props.id, this.props.userId, this.props.isTrack);
    this.props.setOpenPopup(false);
  }

  render() {
    /* eslint-disable no-nested-ternary */

    return (
      <Box style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        borderTop: '5px solid #0894D8',
        alignItems: 'center',
      }}
      >
        <Box padding="10px">
          {
            (this.props.isTrack === true)
              ? (
                <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Are you sure you want to follow this device ?
                </Typography>
              )
              : (
                <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'center' }}>
                  Are you sure you want to unfollow this device ?
                </Typography>
              )
          }
        </Box>
        <Box padding="10px">
          {
            (this.props.isTrack === true)
              ? (
                <Typography variant="h4" style={{ fontWeight: 'lighter', textAlign: 'center' }}>
                  This will activate a notification system that will
                  send out messages whenever the devices battery
                  level exceeds a certain threshold.
                </Typography>
              )
              : (
                <Typography variant="h4" style={{ fontWeight: 'lighter', textAlign: 'center' }}>
                  This means that you will no longer receive alerts
                  (notifications) from this device.
                </Typography>
              )
          }
        </Box>
        <Box padding="10px">
          <Button
            // className={classes.importButton}
            color="primary"
            variant="contained"
            onClick={() => {
              // notifyInformation('Salut les gars');
              this.doFollowing();
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

FollowingDevice.propTypes = {
  function: PropTypes.any,
  id: PropTypes.any,
  userId: PropTypes.any,
  setOpenPopup: PropTypes.any,
  isTrack: PropTypes.any
};

export default FollowingDevice;
