import React from 'react';
import { Box, Typography, CircularProgress } from '@material-ui/core';
import USER_CONNECTED from 'src/user-connected';
import axiosInstance from 'src/axios';
import CardNotification from './CardNotification';
import Empty from 'src/assets/empty_xct9.svg';

class NotificationObject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notifications: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.handleLoadNotification();
  }

  async removeReadNotification(notif) {
    /* eslint-disable  react/destructuring-assignment */
    const array = [...this.state.notifications];
    const index = array.indexOf(notif);
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ notifications: array });
    }
    try {
      // this.setState({ isLoading: true });
      axiosInstance.post(`/user/notification/read/${notif.id}`).catch((err) => console.log('error'));
    } catch (error) {
      // this.setState({ isLoading: false });
      if (error.message.indexOf('401') !== -1) {
        window.location = '/Login';
      }
    }
  }

  async handleLoadNotification() {
    try {
      this.setState({ isLoading: true });
      axiosInstance.get(`/user/notification/show/${USER_CONNECTED.user.id}`).then((item) => {
        this.setState({ notifications: item.data });
      }).catch((err) => console.log('error'));
    } catch (error) {
      this.setState({ isLoading: false });
      if (error.message.indexOf('401') !== -1) {
        window.location = '/Login';
      }
    }
    this.setState({ isLoading: false });
  }

  render() {
    const { notifications, isLoading } = this.state;

    if (isLoading) {
      console.log('is loading ...');
      return (
        <div
          style={{
            position: 'absolute',
            left: '60%',
            top: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <CircularProgress size={50} variant="indeterminate" position="center" />
        </div>
        // <div>Loading users ...</div>
      );
    }

    return (
      (notifications && notifications.length)
        ? <Box padding="7px">
            <Box
              width="350px"
              backgroundColor="white"
            >
              {
                (notifications.map((notif) => (
                  <CardNotification
                    caseid={notif.caseid}
                    notification={notif.notification}
                    notif={notif}
                    removeNotif={() => this.removeReadNotification(notif)}
                  />
                )))
              }
            </Box>
          </Box>
        : <Box
            width="200px"
            height="200px"
          >
          <div
            style={{
              position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)'
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <img src={Empty} alt="MyError" width="100" height="100" />
              <Typography variant="h4">Empty</Typography>
            </div>
          </div>
        </Box>
    );
  }
}

export default NotificationObject;
