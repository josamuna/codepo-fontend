import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Avatar,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import Profile from './Profile';
import USER_CONNECTED from '../../../../user-connected';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    height: 25,
    width: 25
  }
}));

const PopoverNotification = ({ className, ...rest }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    name: `${USER_CONNECTED.user.last_name} ${USER_CONNECTED.user.first_name}`
  };

  return (
    <Box>
      <IconButton>
        <Box
          className={clsx(classes.root, className)}
          {...rest}
          display="flex"
          onClick={(event) => {
            setAnchorEl(event.currentTarget);
          }}
        >
          <Avatar
            className={classes.avatar}
            src={user.avatar}
          />
          <Typography
            color="textPrimary"
            gutterBottom
            variant="h4"
          >
            {user.name}
          </Typography>
        </Box>
      </IconButton>
      <Popover
        style={{ marginTop: '3.5%' }}
        anchorEl={anchorEl}
        open={open}
        id={open ? 'simple-popover' : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: '20px',
          horizontal: '20px',
        }}
        transformOrigin={{
          vertical: '20px',
          horizontal: '20px',
        }}
      >
        <Profile />
      </Popover>
    </Box>
  );
};

PopoverNotification.propTypes = {
  className: PropTypes.string
};

export default PopoverNotification;
