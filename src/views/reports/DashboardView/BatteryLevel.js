import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  Typography,
  CircularProgress
} from '@material-ui/core';
import axiosInstance from 'src/axios';
import Error from 'src/assets/warning_cyit.svg';

class BatteryLevel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isError: false,
      chartData: {}
    };
  }

  componentDidMount() {
    this.handleLoadHistory();
  }

  async handleLoadHistory() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/device/history/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const devices = res.data;
        const labels = devices.map((dev) => (dev.caseid));
        const socs = devices.map((dev) => (dev.measureds[0].soc));
        const colors = socs.map((soc) => {
          let choice = '';
          if (soc < 25) {
            choice = localStorage.getItem('level_one') === null ? '#ff0000' : localStorage.getItem('level_one');
          } else if (soc >= 25 && soc < 50) {
            choice = localStorage.getItem('level_two') === null ? '#e44a00' : localStorage.getItem('level_two');
          } else if (soc >= 50 && soc < 75) {
            choice = localStorage.getItem('level_three') === null ? '#f8bd19' : localStorage.getItem('level_three');
          } else {
            choice = localStorage.getItem('level_four') === null ? '#6baa01' : localStorage.getItem('level_four');
          }
          return choice;
        });
        
        const chartData = {
          labels,
          datasets: [
            {
              data: socs,
              backgroundColor: colors
            }
          ]
        };
        // console.log(colors);
        this.setState({ chartData, isLoading: false, });
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
    const
      {
        chartData,
        isLoading,
        isError
      } = this.state;

    if (isLoading) {
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

    if (isError) {
      return (
        <div
          style={{
            position: 'absolute',
            alignItems: 'center',
            justifyContent: 'center',
            left: '60%',
            top: '60%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div
            style={{
              marginTop: '20%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src={Error} alt="MyError" width="250" height="250" />
            <Typography variant="h4">Sorry!!! Error occured.</Typography>
          </div>
        </div>
      );
    }

    return (
      <Card>
        <CardHeader
          title="Actual Device's Situation"
        />
        <Divider />
        <CardContent display="flex">
          <Grid
            display="flex"
            maxWidth={700}
            container
            spacing={1}
          >
            <Grid
              mt={3}
              item
              lg={11}
              md={12}
              xl={9}
              xs={12}
            >
              <Bar
                data={chartData}
                options={{
                  legend: {
                    display: false
                  },
                  tooltips: { enable: false }
                }}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
      </Card>
    );
  }
}

export default BatteryLevel;
