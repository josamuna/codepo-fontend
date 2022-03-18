import React, { useEffect, useState } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import successMessage from 'src/components/successToastNotification';
import errorMessage from 'src/components/errorToastNotification';
import Delete from '@material-ui/icons/Delete';
import Error from 'src/assets/warning_cyit.svg';
import axiosInstance from '../../../axios';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: '#0894D8'/* theme.palette.common.black */,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

// function createData(id, design, extId, identity) {
//   return {
//     id,
//     design,
//     extId,
//     identity,
//   };
// }

// const rows = [
//   createData(1, 'Device 1', 'DEV-RDC-GOMA', 'dsfjahdhsa-jdhfjkhds'),
//   createData(2, 'Device 2', 'DEV-RDC-BKV', 'dsfjahdhsa-jdhfjkhds'),
//   createData(3, 'Device 3', 'DEV-RDC-LUSH', 'dsfjahdhsa-jdhfjkhds'),
//   createData(4, 'Device 4', 'DEV-RDC-KIN', 'dsfjahdhsa-jdhfjkhds'),
//   createData(5, 'Device 5', 'DEV-RDC-BTM', 'dsfjahdhsa-jdhfjkhds'),
// ];

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function CustomizedTables() {
  const classes = useStyles();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setError] = useState(false);

  function handleLoadDevices() {
    try {
      setIsLoading(true);
      setError(false);
      axiosInstance.get('/device/deleted/show/all').then((item) => {
        setIsLoading(false);
        setData(item.data);
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        setError(true);
        window.location = '/Login';
      } else {
        setError(true);
        setIsLoading(false);
      }
    }
  }

  useEffect(() => {
    handleLoadDevices();
  }, []);

  function handleRestoreDevice(val) {
    try {
      setIsLoading(true);
      setError(false);
      axiosInstance.get(`/device/restore/${val}`).then((item) => {
        setIsLoading(false);
        // console.log(item);
        handleLoadDevices();
        setTimeout(() => {
          successMessage('Device restored succefully');
        }, 1000);
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        window.location = '/Login';
      } else {
        setError(true);
        setIsLoading(false);
      }
    }
  }

  function handleDeleteDevice(val) {
    try {
      setIsLoading(true);
      setError(false);
      axiosInstance.delete(`/device/force/delete/${val}`).then((item) => {
        setIsLoading(false);
        // console.log(item);
        handleLoadDevices();
        setTimeout(() => {
          errorMessage('Device deleted succefully');
        }, 1000);
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        window.location = '/Login';
      } else {
        setError(true);
        setIsLoading(false);
      }
    }
  }

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
          left: '60%',
          top: '50%',
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <img src={Error} alt="MyError" width="350" height="350" />
        </div>
        {/* <h2>Sorry!!! Error occured.</h2> */}
      </div>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="left">IDENTITY</StyledTableCell>
            <StyledTableCell align="left">MODE</StyledTableCell>
            <StyledTableCell align="left">SAMPLING_INTERVAL</StyledTableCell>
            <StyledTableCell align="left">SENDING_INTERVAL</StyledTableCell>
            <StyledTableCell align="left">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <StyledTableRow key={row.design}>
              <StyledTableCell align="left">{row.caseid}</StyledTableCell>
              <StyledTableCell align="left">{row.mode}</StyledTableCell>
              {/* <StyledTableCell component="th" scope="row">
                {row.design}
              </StyledTableCell> */}
              <StyledTableCell align="left">{row.interval_bat_s}</StyledTableCell>
              <StyledTableCell align="left">{row.interval_sending_h}</StyledTableCell>
              <StyledTableCell align="left">
                <Button color="primary" onClick={() => handleRestoreDevice(row.id)}>
                  <RestoreFromTrashIcon />
                </Button>
                <Button style={{ color: 'red' }} onClick={() => handleDeleteDevice(row.id)}>
                  <Delete />
                </Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
