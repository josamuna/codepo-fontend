import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';

const useStyles = makeStyles({
  root: {
    maxWidth: 345
  }
});

export default function ImgMediaCard(props) {
  const classes = useStyles();

  /* eslint-disable  react/destructuring-assignment */
  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          (
            <Avatar aria-label="recipe" style={{ backgroundColor: 'white' }}>
              <NotificationsActiveIcon style={{ color: 'red' }} />
            </Avatar>
          )
        }
        action={
          (
            <IconButton aria-label="settings" style={{ color: '#8F9091' }} onClick={() => props.removeNotif(props.notif)}>
              <h5>OK</h5>
            </IconButton>
          )
        }
        title={`Notification from ${props.caseid}`}
        subheader={props.notification}
      />
    </Card>
  );
}

ImgMediaCard.propTypes = {
  caseid: PropTypes.string,
  notification: PropTypes.string,
  removeNotif: PropTypes.func,
  notif: PropTypes.any,
};
