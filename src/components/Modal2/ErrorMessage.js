import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';
import CancelIcon from '@material-ui/icons/Cancel';

class AddDeviceForm extends React.PureComponent {
  render() {
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
        borderTop: '5px solid #ED1628'
      }}
      >
        <Box>
          <Box paddingLeft="30px">
            <IconButton color="#ED1628">
              <CancelIcon />
            </IconButton>
          </Box>
          <h2
            style={{
              textAlign: 'center',
              width: '100%',
              color: '#ED1628',
              fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
            padding="10px"
          >
            Failed
          </h2>
          <Divider />
        </Box>
        <Box padding="10px">
          <Typography variant="h5" style={{ fontWeight: 'lighter' }}>
            Data saved successfully
          </Typography>
        </Box>
      </Box>
    );
  }
}

export default AddDeviceForm;
