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
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import { Search as SearchIcon } from 'react-feather';
import Error from 'src/assets/warning_cyit.svg';
import Empty from 'src/assets/empty_xct9.svg';
// import { Link } from 'react-router-dom';
import AddCommandModal from 'src/components/Modal/AddCommandModal';
import Modal from 'src/components/Modal/Modal';
// import SuccessMessage from 'src/components/Modal/SuccessMessage';
// import Delete from '@material-ui/icons/Delete';
// import Update from '@material-ui/icons/Update';
// import axios from 'axios';
import ConfirmationMessage from 'src/components/Modal/ConfirmationMessage';
import { ToastContainer } from 'react-toastify';
// import { useSelector } from 'react-redux';
import axiosInstance from '../../axios';
// import successNotification from 'src/components/successToastNotification';

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
  myCmd = null;

  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      commandes: [],
      allCommandes: [],
      valueSearch: '',
      isLoading: false,
      isError: false,
      modalOpen: false,
      modalConfirm: false
      // modalSuccessOpen: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    /* eslint-disable react/destructuring-assignment */
    this.handleLoadCommand();
  }

  getModal(val, cmd, isUpdate) {
    // this.isUpdate = true;
    if (cmd === null) {
      this.myCmd = null;
    } else {
      this.myCmd = { ...cmd };
    }
    this.setState({ modalOpen: val, isUpdate });
  }

  getConfirmMessage(val, id) {
    this.setState({ modalConfirm: val, id });
  }

  // getSuccessMessage(val) {
  //   this.setState({ modalSuccessOpen: val });
  // }

  // navigateToForm(cmd) {
  // // this.isUpdate = true;
  // /* eslint-disable react/prop-types */
  // /* eslint-disable react/destructuring-assignment */
  // // event.preventDefault();
  //   this.props.history.push({
  //     pathname: '/app/GoToAddCommand',
  //     state: {
  //       id: cmd.id,
  //       command: cmd.command,
  //       description: cmd.description,
  //     }
  //   });
  // }

  async handleLoadCommand() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/command/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const commandes = res.data;
        this.setState({ commandes, isLoading: false, allCommandes: commandes });
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

  async handleDeleteCommand(id) {
    try {
      setTimeout(() => {
        this.setState({ isLoading: true });
      }, 1000);
      const res = await axiosInstance.delete(`/command/delete/${id}`)
        .then((response) => response);
      if (res.status) {
        // console.log(res.data.status);
        // console.log(res.data.message);
        this.setState({ isLoading: false });
        // this.getSuccessMessage(true);
        setTimeout(() => {
          this.handleLoadCommand();
        }, 1000);
        // this.handleLoadCommand();
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

  handleSearch(event) {
    if (event.target.value !== undefined && event.target.value.length > 0) {
      this.setState({ valueSearch: event.target.value });
      const { allCommandes } = this.state;
      let { filtered } = [];
      filtered = allCommandes.filter(
        (c) => c.id.toString().toLowerCase().includes(event.target.value.toLowerCase())
        || c.command.toLowerCase().includes(event.target.value.toLowerCase())
        || c.description.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (filtered !== undefined && filtered.length > 0) {
        this.setState({ commandes: filtered });
      } else {
        this.setState({ commandes: [] });
      }
    } else {
      const { allCommandes } = this.state;
      this.setState({ commandes: allCommandes, valueSearch: event.target.value });
    }
  }

  render() {
    // const SucessToastify=useSelector((st)=>st.toastofy)
    const
      {
        commandes,
        isLoading,
        isError,
        valueSearch,
        modalOpen,
        modalConfirm,
        isUpdate,
        id
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
              <Button
                color="primary"
                variant="contained"
                onClick={() => this.getModal(true, null, false)}
              >
                Add Commande
              </Button>
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
                      placeholder="Search command"
                      variant="standard"
                      onChange={this.handleSearch}
                    />
                  </Box>
                </Box>
                {
                  (commandes === undefined || commandes === null || commandes.length < 1)
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
                            <StyledTableCell align="left">Command</StyledTableCell>
                            <StyledTableCell align="left">Description</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {commandes.map((com) => (
                            <StyledTableRow key={com.design}>
                              <StyledTableCell align="left">{com.id}</StyledTableCell>
                              <StyledTableCell align="left">{com.command}</StyledTableCell>
                              <StyledTableCell align="left">{com.description}</StyledTableCell>
                              <StyledTableCell align="left">
                                <Button color="primary" onClick={() => this.getModal(true, com, true)}>
                                  <Edit />
                                </Button>
                                <Button style={{ color: 'red' }} onClick={() => this.getConfirmMessage(!modalConfirm, com.id)}>
                                  <Delete />
                                </Button>
                              </StyledTableCell>
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
          openPopup={modalOpen}
          setOpenPopup={() => this.getModal(!modalOpen, null, isUpdate)}
        >
          <AddCommandModal
            id={this.myCmd === null ? '' : this.myCmd.id}
            command={this.myCmd === null ? '' : this.myCmd.command}
            description={this.myCmd === null ? '' : this.myCmd.description}
            isUpdate={isUpdate}
            function={() => this.handleLoadCommand()}
            setOpenPopup={() => this.getModal(!modalOpen, null)}
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
            function={() => this.handleDeleteCommand(id)}
            setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
          />
        </Modal>
        <ToastContainer />
      </fragment>
    );
  }
}

export default DataResult;
