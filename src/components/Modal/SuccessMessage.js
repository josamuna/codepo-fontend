import React from 'react';
import {
  Box,
  Typography,
  Divider,
  IconButton
} from '@material-ui/core';
import PropTypes from 'prop-types';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import UpdateIcon from '@material-ui/icons/Update';
// #0894D8

class SuccessMessage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: props.type,
      color: props.color,
      message: props.message,
    };
  }

  render() {
    /* eslint-disable no-nested-ternary */
    const {
      type,
      color,
      message
    } = this.state;

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
        borderTop: `5px solid ${color}`
      }}
      >
        <Box>
          <Box padding="20px">
            <IconButton color="green">
              {
                (type === 'save')
                  ? <CheckCircleIcon style={{ color: `${color}` }} />
                  : (type === 'update')
                    ? <UpdateIcon style={{ color: `${color}` }} />
                    : <DeleteForeverIcon style={{ color: `${color}` }} />
              }
              {/* <CheckCircleIcon style={{ color: `${color}` }} /> */}
            </IconButton>
          </Box>
          <h2
            style={{
              textAlign: 'center',
              width: '100%',
              color: `${color}`,
              fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
            }}
            padding="10px"
          >
            {type}
          </h2>
          <Divider />
        </Box>
        <Box padding="10px">
          <Typography variant="h4" style={{ fontWeight: 'lighter' }}>
            {message}
          </Typography>
        </Box>
      </Box>
    );
  }
}

SuccessMessage.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  message: PropTypes.string,
};

export default SuccessMessage;
