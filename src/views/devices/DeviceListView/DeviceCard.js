import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography,
  makeStyles,
  IconButton
} from '@material-ui/core';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import Delete from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  },
  statsItem: {
    alignItems: 'center',
    display: 'flex'
  },
  statsIcon: {
    marginRight: theme.spacing(1)
  }
}));

const DeviceCard = ({ className, device, ...rest }) => {
  const classes = useStyles();

  return (
    <Card
      className={clsx(classes.root, className)}
      {...rest}
    >
      <CardContent>
        <Box
          display="flex"
          justifyContent="center"
          mb={4}
        >
          <Avatar
            alt="device"
            src="/static/images/thingstream_click.jpeg"
            variant="square"
          />
        </Box>
        <Typography
          align="center"
          color="textPrimary"
          gutterBottom
          variant="h4"
        >
          {device.designation}
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
          variant="body1"
        >
          {device.identity}
        </Typography>
      </CardContent>
      <Box flexGrow={1} />
      <Divider />
      <Box p={2}>
        <Grid
          container
          justify="space-between"
          spacing={2}
        >
          <Grid
            className={classes.statsItem}
            item
          >
            <AccessTimeIcon
              className={classes.statsIcon}
              color="action"
            />
            <Typography
              color="textSecondary"
              display="inline"
              variant="body2"
            >
              Updated 2hr ago
            </Typography>
          </Grid>
          <Grid
            className={classes.statsItem}
            item
          >
            <IconButton color="default">
              <Delete
                className={classes.statsIcon}
                color="error"
              />
            </IconButton>
            {/* <Typography
              color="error"
              display="inline"
              variant="body2"
            >
              {device.external_id}
              {''}
            </Typography> */}
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
};

DeviceCard.propTypes = {
  className: PropTypes.string,
  device: PropTypes.object.isRequired
};

export default DeviceCard;
