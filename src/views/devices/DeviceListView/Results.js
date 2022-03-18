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
  CircularProgress,
  SvgIcon,
  Button,
  withStyles,
  Paper,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Delete from '@material-ui/icons/Delete';
import Router from '@material-ui/icons/Router';
import NextWeekIcon from '@material-ui/icons/NextWeek';
import ShopIcon from '@material-ui/icons/Shop';
import Edit from '@material-ui/icons/Edit';
import Tooltip from '@material-ui/core/Tooltip';
import Modal from 'src/components/Modal/Modal';
import AddDeviceForm from 'src/components/Modal/AddDeviceForm';
import Error from 'src/assets/warning_cyit.svg';
import Empty from 'src/assets/empty_xct9.svg';
import CommandDevice from 'src/components/Modal/AddCmdDeviceModal';
import ConfirmationMessage from 'src/components/Modal/ConfirmationMessage';
import FollowingConfirm from 'src/components/Modal/FollowingDevice';
import { ToastContainer } from 'react-toastify';
import axiosInstance from '../../../axios';
import USER_CONNECTED from '../../../user-connected';

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
  myDevice = null;

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      devices: [],
      allDevices: [],
      deviceFollowed: [],
      isTrack: true,
      valueSearch: '',
      isLoading: false,
      isError: false,
      modalDevice: false,
      modalOpen: false,
      modalCmdOpen: false,
      // modalSuccessOpen: false,
      modalConfirm: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    this.handleLoadDevices();
    this.handleLoadFollowedDevices();
  }

  getModal(val, id, isTrack) {
    this.setState({ modalOpen: val, id, isTrack });
  }

  getModalDevice(val, dev, isUpdate) {
    if (dev === null) {
      this.myDevice = null;
    } else {
      this.myDevice = { ...dev };
    }
    this.setState({ modalDevice: val, isUpdate });
  }

  getConfirmMessage(val, id) {
    this.setState({ modalConfirm: val, id });
  }

  getModalCommand(val, device) {
    // this.isUpdate = true;
    if (device === null) {
      this.myDevice.id = '';
      this.myDevice.caseid = '';
      this.myDevice.mode = '';
      this.myDevice.interval_bat_s = '';
      this.myDevice.interval_sending_h = '';
    } else {
      this.myDevice = { ...device };
    }
    this.setState({ modalCmdOpen: val });
  }

  // getSuccessMessage(val) {
  //   this.setState({ modalSuccessOpen: val });
  // }

  async handleDeleteDevice(id, userId) {
    try {
      setTimeout(() => {
        this.setState({ isLoading: true });
      }, 1000);
      const res = await axiosInstance.post(`/device/delete/${id}`, {
        deleted_by: userId
      })
        .then((response) => response);
      if (res.status) {
        // console.log(res.data.status);
        // console.log(res.data.message);
        this.setState({ isLoading: false });
        // this.getSuccessMessage(true);
        setTimeout(() => {
          this.handleLoadDevices();
        }, 1000);
        // this.handleLoadDevices();
      } else {
        console.log('Error occured');
        this.setState({ isError: true });
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

  async handleFollowingDevice(deviceId, userId, isTrack) {
    try {
      setTimeout(() => {
        this.setState({ isLoading: true });
      }, 1000);
      const res = await axiosInstance.post('/device/follow', {
        isTrack,
        user_id: userId,
        device_id: deviceId
      })
        .then((response) => response);
      if (res.status) {
        // console.log(res.data.status);
        // console.log(res.data.message);
        this.setState({ isLoading: false });
        setTimeout(() => {
          this.handleLoadFollowedDevices();
          this.handleLoadDevices();
        }, 1000);
      } else {
        // console.log(res);
        console.log('Error occured');
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

  async handleLoadDevices() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/device/show/all')
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

  async handleLoadFollowedDevices() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.post('/device/follow/show', {
        user_id: USER_CONNECTED.user.id
      })
        .then((response) => response);
      if (res.status === 200) {
        // const devs = res.data;
        // const deviceFollowed = devs.map((dev) => (dev.device_id));
        // console.log(deviceFollowed);
        this.setState({ deviceFollowed: res.data });
        // this.setState({ devices, isLoading: false, allDevices: devices });
      } else {
        // this.setState({ isError: true, isLoading: false });
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
        // this.setState({ isError: true, isLoading: false });
      }
    }
  }

  handleSearch(event) {
    if (event.target.value !== undefined && event.target.value.length > 0) {
      this.setState({ valueSearch: event.target.value });
      const { allDevices } = this.state;
      let { filtered } = [];
      filtered = allDevices.filter(
        (d) => d.id.toString().toLowerCase().includes(event.target.value.toLowerCase())
        || d.caseid.toLowerCase().includes(event.target.value.toLowerCase())
        || d.mode.toLowerCase().includes(event.target.value.toLowerCase())
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
        isUpdate,
        modalOpen,
        valueSearch,
        modalCmdOpen,
        modalConfirm,
        modalDevice,
        id,
        deviceFollowed,
        isTrack
        // modalSuccessOpen
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
      <fragment>
        <Box>
          <Box
            display="flex"
          >
            <Box flexGrow={1} />
            <Box display="flex">
              {
                (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                  ? (
                    // <Link to="/app/AddDevices">
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => this.getModalDevice(true, null, false)}
                    >
                      Add Device
                    </Button>
                    // </Link>
                  )
                  : <Box />
              }
            </Box>
          </Box>
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
                    : <Box mt={2}>
                        <TableContainer component={Paper}>
                          <Table style={{ minWidth: '700px' }} aria-label="customized table">
                            <TableHead>
                              <TableRow>
                                <StyledTableCell align="left">ID</StyledTableCell>
                                <StyledTableCell align="left">MODE</StyledTableCell>
                                <StyledTableCell align="left">AUTONOMY(h)</StyledTableCell>
                                <StyledTableCell align="left">SAMPLING_INTERVAL</StyledTableCell>
                                <StyledTableCell align="left">SENDING_INTERVAL</StyledTableCell>
                                {
                                  (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                                    ? (
                                      <StyledTableCell>
                                        Action
                                      </StyledTableCell>
                                    )
                                    : <Box />
                                }
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {devices.map((dev) => (
                                <StyledTableRow key={dev.design}>
                                  <StyledTableCell align="left">{dev.caseid}</StyledTableCell>
                                  <StyledTableCell align="left">{dev.mode}</StyledTableCell>
                                  <StyledTableCell align="left">{dev.autonomy}</StyledTableCell>
                                  <StyledTableCell align="left">{dev.interval_bat_s}</StyledTableCell>
                                  <StyledTableCell align="left">{dev.interval_sending_h}</StyledTableCell>
        
                                  {
                                    (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                                      ? (
                                        <StyledTableCell>
                                          <Tooltip title="Edit device properties">
                                            <Button color="primary" onClick={() => this.getModalDevice(true, dev, true)}>
                                              <Edit />
                                            </Button>
                                          </Tooltip>
                                          <Tooltip title="Send command to device">
                                            <Button color="primary" onClick={() => this.getModalCommand(true, dev)}>
                                              <Router />
                                            </Button>
                                          </Tooltip>
                                          {
                                            (deviceFollowed.some(
                                              (item) => dev.id === item.device_id && item.isTrack === true
                                            ))
                                              ? (
                                                <Tooltip title="Unfollow">
                                                  <Button onClick={() => this.getModal(true, dev.id, false)}>
                                                    <ShopIcon />
                                                  </Button>
                                                </Tooltip>
                                              )
                                              : (
                                                <Tooltip title="Follow">
                                                  <Button color="primary" onClick={() => this.getModal(true, dev.id, true)}>
                                                    <NextWeekIcon />
                                                  </Button>
                                                </Tooltip>
                                              )
                                          }
                                          <Tooltip title="Delete">
                                            <Button style={{ color: 'red' }} onClick={() => this.getConfirmMessage(!modalConfirm, dev.id, USER_CONNECTED.user.id)}>
                                              <Delete />
                                            </Button>
                                          </Tooltip>
                                        </StyledTableCell>
                                      )
                                      : <Box />
                                  }
                                </StyledTableRow>
                              ))}
                            </TableBody>
                          </Table>
                        </TableContainer>
                    </Box>
                }
              </Box>
            </Card>
          </Box>
        </Box>
        <Modal
          title=""
          openPopup={modalDevice}
          setOpenPopup={() => this.getModalDevice(!modalDevice, null, isUpdate)}
        >
          <AddDeviceForm
            id={this.myDevice === null ? '' : this.myDevice.id}
            caseid={this.myDevice === null ? '' : this.myDevice.caseid}
            mode={this.myDevice === null ? '' : this.myDevice.mode}
            intervalBatS={this.myDevice === null ? '' : this.myDevice.interval_bat_s}
            intervalSendingH={this.myDevice === null ? '' : this.myDevice.interval_sending_h}
            isUpdate={isUpdate}
            function={() => this.handleLoadDevices()}
            setOpenPopup={() => this.getModalDevice(!modalDevice, null, isUpdate)}
          />
        </Modal>
        <Modal
          title=""
          openPopup={modalConfirm}
          setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
        >
          <ConfirmationMessage
            // doDelete={this.handleDeleteUser(id)}
            id={id}
            userId={USER_CONNECTED.user.id}
            function={() => this.handleDeleteDevice(id, USER_CONNECTED.user.id)}
            setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
          />
        </Modal>
        <Modal
          title=""
          openPopup={modalOpen}
          setOpenPopup={() => this.getModal(!modalOpen, null)}
        >
          <FollowingConfirm
            userId={USER_CONNECTED.user.id}
            id={id}
            isTrack={isTrack}
            function={() => this.handleFollowingDevice(id, USER_CONNECTED.user.id, isTrack)}
            setOpenPopup={() => this.getModal(!modalOpen, null)}
          />
        </Modal>
        <Modal
          title=""
          openPopup={modalCmdOpen}
          setOpenPopup={() => this.getModalCommand(!modalCmdOpen, null)}
        >
          <CommandDevice
            id={this.myDevice === null ? '' : this.myDevice.id}
            caseid={this.myDevice === null ? '' : this.myDevice.caseid}
            mode={this.myDevice === null ? '' : this.myDevice.mode}
            intervalBatS={this.myDevice === null ? '' : this.myDevice.interval_bat_s}
            intervalSendingH={this.myDevice === null ? '' : this.myDevice.interval_sending_H}
            function={() => this.handleLoadDevices()}
            setOpenPopup={() => this.getModalCommand(!modalCmdOpen, null)}
          />
        </Modal>
        <ToastContainer />
      </fragment>
    );
  }
}

export default DataResult;
