import React from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  TextField,
  Typography,
  InputAdornment,
  SvgIcon
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Router from '@material-ui/icons/Router';
import Modal from 'src/components/Modal/Modal';
import Error from 'src/assets/warning_cyit.svg';
import CommandDevice from 'src/components/Modal/CommandDevice';
import AddDeviceForm from 'src/components/Modal/AddDeviceForm';
import SuccessMessage from 'src/components/Modal/SuccessMessage';
import axiosInstance from '../../../axios';
import USER_CONNECTED from '../../../user-connected';
// import DeviceCard from './DeviceCard';
// import AddDeviceForm from 'src/components/Modal/AddDeviceForm';
// import axios from 'axios';

class DataResult extends React.Component {
  myDevice = null;

  constructor(props) {
    super(props);
    this.state = {
      devices: [],
      allDevices: [],
      valueSearch: '',
      isLoading: false,
      isError: false,
      modalOpen: false,
      modalCmdOpen: false,
      modalSuccessOpen: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  async componentDidMount() {
    this.handleLoadDevices();
  }

  getModal(val, device) {
    // this.isUpdate = true;
    if (device === null) {
      this.myDevice.id = '';
      this.myDevice.designation = '';
      this.myDevice.external_id = '';
      this.myDevice.identity = '';
    } else {
      this.myDevice = { ...device };
    }
    this.setState({ modalOpen: val });
  }

  getModalCommand(val, device) {
    // this.isUpdate = true;
    if (device === null) {
      this.myDevice.id = '';
      this.myDevice.designation = '';
      this.myDevice.external_id = '';
      this.myDevice.identity = '';
    } else {
      this.myDevice = { ...device };
    }
    this.setState({ modalCmdOpen: val });
  }

  getSuccessMessage(val) {
    this.setState({ modalSuccessOpen: val });
  }

  async handleDeleteDevice(id) {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.delete(`/device/delete/${id}`)
        .then((response) => response);
      if (res.status) {
        // console.log(res.data.status);
        // console.log(res.data.message);
        // this.setState({ isLoading: false });
        this.getSuccessMessage(true);
        this.handleLoadDevices();
      } else {
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

  handleSearch(event) {
    if (event.target.value !== undefined && event.target.value.length > 0) {
      this.setState({ valueSearch: event.target.value });
      const { allDevices } = this.state;
      let { filtered } = [];
      filtered = allDevices.filter(
        (d) => d.id.toString().toLowerCase().includes(event.target.value.toLowerCase())
        || d.designation.toLowerCase().includes(event.target.value.toLowerCase())
        || d.external_id.toLowerCase().includes(event.target.value.toLowerCase())
        || d.identity.toLowerCase().includes(event.target.value.toLowerCase())
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
        modalOpen,
        valueSearch,
        modalCmdOpen,
        modalSuccessOpen
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
        <Box mt={2}>
          <Card>
            <PerfectScrollbar>
              <Box minWidth={1050}>
                {/* <Box mt={3}>
                  <Grid
                    container
                    spacing={3}
                  >
                    {devices.map((dev) => (
                      <Grid
                        item
                        key={dev.id}
                        lg={4}
                        md={6}
                        xs={12}
                      >
                        <DeviceCard
                          // className={classes.deviceCard}
                          device={dev}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </Box> */}
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        ID
                      </TableCell>
                      <TableCell>
                        DESIGNATION
                      </TableCell>
                      <TableCell>
                        EXTERNAL_ID
                      </TableCell>
                      <TableCell>
                        IDENTITY
                      </TableCell>
                      {
                        (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                          ? (
                            <TableCell>
                              Action
                            </TableCell>
                          )
                          : <Box />
                      }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {devices.map((dev) => (
                      <TableRow>
                        <TableCell>
                          {dev.id}
                        </TableCell>
                        <TableCell>
                          <Box
                            alignItems="center"
                            display="flex"
                          >
                            {dev.designation}
                          </Box>
                        </TableCell>
                        <TableCell>
                          {dev.external_id}
                        </TableCell>
                        <TableCell>
                          {dev.identity}
                        </TableCell>
                        {
                          (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                            ? (
                              <TableCell>
                                <Button color="primary" onClick={() => this.getModal(true, dev)}>
                                  <Edit />
                                </Button>
                                <Button color="primary" onClick={() => this.getModalCommand(true, dev)}>
                                  <Router />
                                </Button>
                                <Button style={{ color: 'red' }} onClick={() => this.handleDeleteDevice(dev.id)}>
                                  <Delete />
                                </Button>
                              </TableCell>
                            )
                            : <Box />
                        }
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </PerfectScrollbar>
          </Card>
        </Box>
        <Modal
          title=""
          openPopup={modalOpen}
          setOpenPopup={() => this.getModal(!modalOpen, null)}
        >
          <AddDeviceForm
            id={this.myDevice === null ? '' : this.myDevice.id}
            designation={this.myDevice === null ? '' : this.myDevice.designation}
            externalId={this.myDevice === null ? '' : this.myDevice.external_id}
            identity={this.myDevice === null ? '' : this.myDevice.identity}
            isUpdate
          />
        </Modal>
        <Modal
          title=""
          openPopup={modalSuccessOpen}
          setOpenPopup={() => this.getSuccessMessage(!modalSuccessOpen)}
        >
          <SuccessMessage
            type="Delete"
            color="red"
            message="Device deleted succefully"
          />
        </Modal>
        <Modal
          title=""
          openPopup={modalCmdOpen}
          setOpenPopup={() => this.getModalCommand(!modalCmdOpen, null)}
        >
          <CommandDevice
            id={this.myDevice === null ? '' : this.myDevice.id}
            designation={this.myDevice === null ? '' : this.myDevice.designation}
            externalId={this.myDevice === null ? '' : this.myDevice.external_id}
            identity={this.myDevice === null ? '' : this.myDevice.identity}
          />
        </Modal>
      </fragment>
    );
  }
}

export default DataResult;
