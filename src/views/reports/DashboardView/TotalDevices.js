import React, { Component } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import BarChartIcon from '@material-ui/icons/BarChart';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import axiosInstance from '../../../axios';

class TotalDevices extends Component {
  constructor() {
    super();
    this.state = {
      color: '#AA27B0',
      totalDev: 0,
      isLoading: false,
      isError: false
    };
  }

  componentDidMount() {
    this.getTotalDevice();
  }

  async getTotalDevice() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/device/statistic/count')
        .then((response) => response);
      if (res.status === 200) {
        // console.log(res.data.data.activeDevices);
        const totalDev = res.data.data.totalDevice;
        this.setState({ totalDev, isLoading: false });
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    } catch (err) {
      if (err.message.indexOf('401') !== -1) {
        window.location = '/Login';
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('is_superuser');
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    }
  }

  render() {
    const { color } = this.state;
    const {
      totalDev,
      isLoading,
      isError
    } = this.state;

    return (
      <Card>
        <CardContent>
          <Grid
            container
            justify="space-between"
            spacing={3}
          >
            <Grid item>
              <Typography
                color="textSecondary"
                gutterBottom
                variant="h6"
              >
                Total Devices
              </Typography>
            </Grid>
          </Grid>
          <Box
            mt={1}
            display="flex"
            alignItems="center"
          >
            <Typography
              className={color}
              variant="body2"
              style={{ color: `${color}` }}
            >
              <BarChartIcon />
            </Typography>
            <Box flexGrow={1} />
            <Box
              color="#AA27B0"
              style={{
                backgroundColor: '#F3E5F5',
                padding: '5px',
                borderRadius: '20px',
                width: '70px',
                height: '30px',
                textAlign: 'center',
              }}
            >
              {
                (isLoading === true)
                  ? <CircularProgress size={20} variant="indeterminate" position="center" />
                  : [
                    (isError === true)
                      ? <ErrorOutlineIcon size={50} variant="indeterminate" position="center" />
                      : (
                        <Typography variant="h6">
                          {totalDev}
                        </Typography>
                      )
                  ]
              }
            </Box>
          </Box>
        </CardContent>
      </Card>
    );
  }
}

export default TotalDevices;
