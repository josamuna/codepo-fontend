import {
  Drawer,
  Grid,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

function DevicesDrow({ open, setOpen }) {
  const DataSider = [
    {
      id: '1',
      title: 'DashBord',
      link: '/dashbord',
    },
    {
      id: '2',
      title: 'Nouveau',
      link: '/nouveau',
    },
  ];

  return (
    <Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
      <Grid
        container
        style={{
          height: '100%',
          width: '200px',
          backgroundColor: '#4B5257',
        }}
      >
        <Grid item style={{ marginTop: '20%' }}>
          {DataSider.map((item) => {
            return (
              <List key={item.id}>
                <Link to={item.link} style={{ color: 'white' }}>
                  <ListItem>
                    <ListItemText primary={item.title} />
                  </ListItem>
                </Link>
              </List>
            );
          })}
        </Grid>
      </Grid>
    </Drawer>
  );
}

DevicesDrow.propTypes = {
  open: PropTypes.any,
  setOpen: PropTypes.any
};

export default DevicesDrow;
