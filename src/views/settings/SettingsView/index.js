import React from 'react';
import {
  makeStyles,
  Container
} from '@material-ui/core';
import Page from 'src/components/Page';
import ChangeColor from './ChangeColor';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Settings"
    >
      <Container>
        <ChangeColor />
      </Container>
    </Page>
  );
};

export default SettingsView;
