import React from 'react';
import PropTypes from 'prop-types';
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
  Paper,
  Tooltip
} from '@material-ui/core';
import Edit from '@material-ui/icons/Edit';
import { Search as SearchIcon } from 'react-feather';
import Person from '@material-ui/icons/Person';
import Delete from '@material-ui/icons/Delete';
import AddUserModal from 'src/components/Modal/AddUserModal';
import Error from 'src/assets/warning_cyit.svg';
import Empty from 'src/assets/empty_xct9.svg';
import Modal from 'src/components/Modal/Modal';
// import SuccessMessage from 'src/components/Modal/SuccessMessage';
import ConfirmationMessage from 'src/components/Modal/ConfirmationMessage';
// import Update from '@material-ui/icons/Update';
// import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import errorNotification from 'src/components/successToastNotification';
import axiosInstance from '../../axios';
import USER_CONNECTED from 'src/user-connected';
// import WebSocketInstance from '../services/WebSocket';

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
  myUser = null;

  constructor(props) {
    super(props);
    // const { users } = this.props;
    this.state = {
      id: 0,
      users: props.users === undefined || props.users === null ? [] : props.users,
      allUsers: [],
      valueSearch: '',
      isLoading: false,
      isError: false,
      modalOpen: false,
      // modalSuccessOpen: false,
      modalConfirm: false
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleLoadUsers();
  }

  getModal(val, user, isUpdate) {
    if (user !== null) {
      this.myUser = { ...user };
    } else {
      this.myUser = null;
    }
    this.setState({ modalOpen: val, isUpdate });
  }

  getConfirmMessage(val, id) {
    this.setState({ modalConfirm: val, id });
  }

  async handleLoadUsers() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/user/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const users = res.data;
        // WebSocketInstance.newMqttMessage('salut');
        this.setState({ users, isLoading: false, allUsers: users });
      } else {
        // navigate('/Login', { replace: true });
        this.setState({ isError: true, isLoading: false });
      }
    } catch (err) {
      if (err.message.indexOf('401') !== -1) {
        window.location = '/Login';
      } else {
        this.setState({ isError: true, isLoading: false });
      }
      // this.setState({ isError: true, isLoading: false });
    }
  }

  async handleDeleteUser(id) {
    console.log('Executing delete function...');
    if (id !== undefined && id !== null) {
      try {
        setTimeout(() => {
          this.setState({ isLoading: true });
        }, 1000);
        const res = await axiosInstance.delete(`/user/delete/${id}`)
          .then((response) => response);
        if (res.status) {
          this.setState({ isLoading: false });
          // this.getSuccessMessage(true);
          // errorNotification('Deleted succeffuly');
          setTimeout(() => {
            this.handleLoadUsers();
          }, 1000);
        } else {
          console.log('Error occured');
          this.setState({ isError: true, isLoading: false });
        }
      } catch (err) {
        if (err.message.indexOf('401') !== -1) {
          window.location = '/Login';
        } else {
          console.log('Error');
          this.setState({ isError: true, isLoading: false });
        }
      }
    }
  }

  handleSearch(event) {
    if (event.target.value !== undefined && event.target.value.length > 0) {
      this.setState({ valueSearch: event.target.value });
      const { allUsers } = this.state;
      let { filtered } = [];
      filtered = allUsers.filter(
        (usr) => usr.username.toLowerCase().includes(event.target.value.toLowerCase())
        || usr.first_name.toLowerCase().includes(event.target.value.toLowerCase())
        || usr.last_name.toLowerCase().includes(event.target.value.toLowerCase())
        || usr.email.toLowerCase().includes(event.target.value.toLowerCase())
      );
      if (filtered !== undefined && filtered.length > 0) {
        this.setState({ users: filtered });
      } else {
        this.setState({ users: [] });
      }
    } else {
      const { allUsers } = this.state;
      this.setState({ users: allUsers, valueSearch: event.target.value });
    }
  }

  render() {
    const
      {
        users,
        isLoading,
        isError,
        valueSearch,
        modalOpen,
        isUpdate,
        // modalSuccessOpen,
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
                <Person />
                Add user
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
                      placeholder="Search user"
                      variant="standard"
                      onChange={this.handleSearch}
                    />
                  </Box>
                </Box>
                {
                  (users === undefined || users === null || users.length < 1)
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
                            <StyledTableCell align="left">Name</StyledTableCell>
                            <StyledTableCell align="left">Postname</StyledTableCell>
                            <StyledTableCell align="left">Username</StyledTableCell>
                            <StyledTableCell align="left">Email</StyledTableCell>
                            <StyledTableCell align="left">Role</StyledTableCell>
                            <StyledTableCell align="left">Action</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {users.map((user) => (
                            <StyledTableRow key={users.design}>
                              <StyledTableCell align="left">{user.id}</StyledTableCell>
                              <StyledTableCell align="left">{user.first_name}</StyledTableCell>
                              <StyledTableCell align="left">{user.last_name}</StyledTableCell>
                              <StyledTableCell align="left">{user.username}</StyledTableCell>
                              <StyledTableCell align="left">{user.email}</StyledTableCell>
                              <StyledTableCell>
                                {
                                  (user.is_superuser === true)
                                    ? <p>Super admin</p>
                                    : (user.is_staff === true)
                                        ? <p>Admin</p>
                                        : <p>Simple user</p>
                                }
                              </StyledTableCell>
                              <StyledTableCell align="left">
                                {
                                  (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                                    ? <Button color="primary" onClick={() => this.getModal(true, user, true)}>
                                        <Edit />
                                      </Button>
                                    : ( user.is_superuser === true)
                                        ? <Tooltip title="Can't update super administrator properties">
                                            <Button>
                                              <Edit />
                                            </Button>
                                          </Tooltip>
                                        : <Button color="primary" onClick={() => this.getModal(true, user, true)}>
                                            <Edit />
                                          </Button>
                                     
                                }
                                {
                                  (user.is_superuser !== true)
                                    ? <Button style={{ color: 'red' }} onClick={() => this.getConfirmMessage(!modalConfirm, user.id)}>
                                        <Delete />
                                      </Button>
                                    : <Tooltip title="Can't delete super administrator">
                                        <Button>
                                          <Delete />
                                        </Button>
                                      </Tooltip>
                                }
                                
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
          <AddUserModal
            id={this.myUser === null ? '' : this.myUser.id}
            firstName={this.myUser === null ? '' : this.myUser.first_name}
            lastName={this.myUser === null ? '' : this.myUser.last_name}
            email={this.myUser === null ? '' : this.myUser.email}
            username={this.myUser === null ? '' : this.myUser.username}
            isUpdate={isUpdate}
            function={() => this.handleLoadUsers()}
            setOpenPopup={() => this.getModal(!modalOpen, null)}
          />
        </Modal>
        {/* <Modal
          title=""
          openPopup={modalSuccessOpen}
          setOpenPopup={() => this.getSuccessMessage(!modalSuccessOpen)}
        >
          <SuccessMessage
            type="Delete"
            color="red"
            message="User deleted succefully"
          />
        </Modal> */}
        <Modal
          title=""
          openPopup={modalConfirm}
          setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
        >
          <ConfirmationMessage
            // doDelete={this.handleDeleteUser(id)}
            id={id}
            function={() => this.handleDeleteUser(id)}
            setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
          />
        </Modal>
        <ToastContainer />
      </fragment>
    );
  }
}

DataResult.propTypes = {
  users: PropTypes.arrayOf,
  // history: PropTypes.object
};

export default DataResult;
