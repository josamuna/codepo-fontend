import React from 'react';
import {
  Container,
  makeStyles,
} from '@material-ui/core';
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

const CommandeListView = () => {
  const classes = useStyles();

  return (
    <Page
      className={classes.root}
      title="Commande"
    >
      <Container maxWidth={false}>
        <Results />
      </Container>
    </Page>
  );
};

export default CommandeListView;
