import React from 'react';
import { IconButton, Box, Badge } from '@material-ui/core';
import NotificationIcon from '@material-ui/icons/Notifications';
import Popover from '@material-ui/core/Popover';
import NotificationObject from './NotificationObject';

const PopoverNotification = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  return (
    <Box>
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <Badge
          color="primary"
          variant="dot"
        >
          <NotificationIcon />
        </Badge>
      </IconButton>
      <Popover
        style={{ marginTop: '3.8%' }}
        anchorEl={anchorEl}
        open={open}
        id={open ? 'simple-popover' : undefined}
        onClose={() => {
          setAnchorEl(null);
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'bottom',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'bottom',
        }}
      >
        <NotificationObject />
      </Popover>
    </Box>
  );
};

export default PopoverNotification;
