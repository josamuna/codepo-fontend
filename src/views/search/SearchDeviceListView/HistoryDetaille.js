import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';
import { Grid } from '@material-ui/core';
import axiosInstance from '../../../axios';

function HistoryDetaille(props) {
  // console.log(props);
  const [datax, setDatax] = useState([]);
  useEffect(() => {
    try {
      axiosInstance.get(`/device/history/show/${props.id}`).then((item) => {
        setTimeout(() => {
          setDatax(item.data);
          // console.log(item.data);
        }, 2000);
      }).catch((err) => {
        console.log('Error');
      });
    } catch (error) {
      console.log('Error');
    }
  }, []);
  const datas = datax.map((item) => {
    return {
      latitude: item.latitude,
      longitude: item.longitude,
      source: item.source,
      soc: item.soc,
      time: item.time,
    };
  });
  const column = [
    {
      title: 'Latitule', field: 'latitude'
    },
    {
      title: 'Longitude', field: 'longitude'
    },
    {
      title: 'Time', field: 'time'
    },
    {
      title: 'SOC', field: 'soc'
    },
  ];

  return (
    <Grid container>
      <Grid item xs={12}>
        <MaterialTable data={datas} columns={column} />
      </Grid>
    </Grid>
  );
}

HistoryDetaille.propTypes = {
  id: PropTypes.any,
  // history: PropTypes.object
};

export default HistoryDetaille;
