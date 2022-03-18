import React from 'react';
import {
  Box,
  Container,
  makeStyles,
  Grid
} from '@material-ui/core';
import Page from 'src/components/Page';
// import DevicesResults from './DevicesResults';
import BatteryLevel from './BatteryLevel';
import TotalUsers from './TotalUsers';
import ActiveUsers from './ActiveUsers';
import TotalDevices from './TotalDevices';
import ActiveDevices from './ActiveDevices';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
    >
      <Container>
        <Container display="flex">
          <Grid
            container
            spacing={3}
          >
            <Grid
              spacing={4}
              item
              lg={3}
              sm={6}
              xl={3}
              xs={8}
            >
              <TotalDevices />
            </Grid>
            <Grid
              spacing={4}
              item
              lg={3}
              sm={6}
              xl={3}
              xs={8}
            >
              <ActiveDevices />
            </Grid>
            <Grid
              spacing={4}
              item
              lg={3}
              sm={6}
              xl={3}
              xs={8}
            >
              <TotalUsers />
            </Grid>
            <Grid
              spacing={4}
              item
              lg={3}
              sm={6}
              xl={3}
              xs={8}
            >
              <ActiveUsers />
            </Grid>
          </Grid>
        </Container>
        <Container
          mt={3}
          item
          lg={8}
          md={12}
          xl={9}
          xs={12}
          display="flex"
        >
          <Box mt={3}>
            <BatteryLevel />
          </Box>
        </Container>
        {/* <Container maxWidth={false}>
          <Box mt={3}>
            <DevicesResults />
          </Box>
        </Container> */}
      </Container>
    </Page>
  );
};

export default Dashboard;
