import React from 'react';
import {
  Container,
  makeStyles,
  // TextField,
  // InputAdornment,
  // SvgIcon
} from '@material-ui/core';
// import { Search as SearchIcon } from 'react-feather';
import Page from 'src/components/Page';
import Results from './Results';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const DeviceListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Devices"
    >
      <Container maxWidth={false}>
        <Results />
      </Container>
    </Page>
  );
};

export default DeviceListView;
