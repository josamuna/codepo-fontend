import React from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  SvgIcon,
  Button,
  withStyles,
  Paper
} from '@material-ui/core';
import { Search as SearchIcon, Clock as ClockIcon } from 'react-feather';
import Modal from 'src/components/Modal/Modal';
import Error from 'src/assets/warning_cyit.svg';
import Empty from 'src/assets/empty_xct9.svg';
// import ConfirmationMessage from 'src/components/Modal/ConfirmationMessage';
// import { useToasts,  } from 'react-toast-notifications';
// import notifyInformation from 'src/components/infoToastNotification';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../../../axios';
import HistoryDetaille from './HistoryDetaille';

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

class DataResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      devices: [],
      allDevices: [],
      valueSearch: '',
      isLoading: false,
      isError: false,
      modalConfirm: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleLoadHistory();
  }

  getConfirmMessage(val, id) {
    this.setState({ modalConfirm: val, id });
  }

  doDeleteData = () => {
    // console.log('You can delete this record');
  }

  // showToast = (val) => {
  //   const { addToast } = useToasts();
  //   addToast(val, {
  //     appearance: 'success',
  //     autoDismiss: true,
  //   });
  // }

  async handleLoadHistory() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/device/history/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const devices = res.data;
        this.setState({ devices, isLoading: false, allDevices: devices });
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

  handleSearch(event) {
    if (event.target.value !== undefined && event.target.value.length > 0) {
      this.setState({ valueSearch: event.target.value });
      const { allDevices } = this.state;
      let { filtered } = [];
      filtered = allDevices.filter(
        (dev) => dev.caseid.toLowerCase().includes(event.target.value.toLowerCase())
        || dev.mode.toLowerCase().includes(event.target.value.toLowerCase())
        // || dev.last_name.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (filtered !== undefined && filtered.length > 0) {
        this.setState({ devices: filtered });
      } else {
        this.setState({ devices: [] });
      }
    } else {
      const { allDevices } = this.state;
      this.setState({ devices: allDevices, valueSearch: event.target.value });
    }
  }

  render() {
    const
      {
        devices,
        isLoading,
        isError,
        valueSearch,
        modalConfirm,
        id
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
      <fragment>
        <Box>
          <Box mt={2}>
            <Card>
              <Box
                style={{
                  padding: '30px',
                  backgroundColor: 'white'
                }}
              >
                <Box
                  display="flex"
                  justifyContent="flex-end"
                  style={{ height: '50px', paddingTop: '10px', paddingBottom: '20px' }}
                >
                  <Box maxWidth={250}>
                    <TextField
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SvgIcon
                              fontSize="small"
                              color="#D6D6D6"
                            >
                              <SearchIcon />
                            </SvgIcon>
                          </InputAdornment>
                        )
                      }}
                      value={valueSearch}
                      placeholder="Search device"
                      variant="standard"
                      onChange={this.handleSearch}
                    />
                  </Box>
                </Box>
                {
                  (devices === undefined || devices === null || devices.length < 1)
                  ? <div
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
                        <img src={Empty} alt="MyError" width="250" height="250" />
                        <Typography variant="h4">No data available</Typography>
                      </div>
                    </div>
                  : <TableContainer component={Paper}>
                      <Table style={{ minWidth: '700px' }} aria-label="customized table">
                        <TableHead>
                          <TableRow>
                            <StyledTableCell align="left">ID</StyledTableCell>
                            <StyledTableCell align="left">Mode</StyledTableCell>
                            <StyledTableCell align="left">Latitude</StyledTableCell>
                            <StyledTableCell align="left">Longitude</StyledTableCell>
                            <StyledTableCell align="left">Time</StyledTableCell>
                            <StyledTableCell align="left">SOC(%)</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {devices.map((dev) => (
                            (dev.measureds && dev.measureds.length)
                            ? (
                              <StyledTableRow key={dev.design}>
                                <StyledTableCell align="left">{dev.caseid}</StyledTableCell>
                                <StyledTableCell align="left">{dev.mode}</StyledTableCell>
                                <StyledTableCell align="left">{dev.measureds[0].latitude}</StyledTableCell>
                                <StyledTableCell align="left">{dev.measureds[0].longitude}</StyledTableCell>
                                <StyledTableCell align="left">{dev.measureds[0].time}</StyledTableCell>
                                <StyledTableCell align="left">{dev.measureds[0].soc}%</StyledTableCell>
                                <StyledTableCell align="left">
                                  <Button color="primary" onClick={() => this.getConfirmMessage(true, dev.id)}>
                                    <ClockIcon />
                                  </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                            )
                            : (
                              <p />
                            )
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                }
              </Box>
            </Card>
          </Box>
        </Box>
        <Modal
          title=""
          openPopup={modalConfirm}
          setOpenPopup={() => this.getConfirmMessage(!modalConfirm, id)}
        >
          <HistoryDetaille id={id} />
        </Modal>
        <ToastContainer />
      </fragment>
    );
  }
}

export default DataResult;
