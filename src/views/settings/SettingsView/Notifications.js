import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(({
  root: {},
  item: {
    display: 'flex',
    flexDirection: 'column'
  }
}));

const Notifications = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <form
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardContent>
          <Grid
            className={classes.item}
            item
          >
            <FormControlLabel
              control={(
                <Checkbox defaultChecked />
              )}
              label="Email"
            />
            <FormControlLabel
              control={(
                <Checkbox defaultChecked />
              )}
              label="Push Notifications"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Text Messages"
            />
            <FormControlLabel
              control={(
                <Checkbox defaultChecked />
              )}
              label="Phone calls"
            />
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

Notifications.propTypes = {
  className: PropTypes.string
};

export default Notifications;
