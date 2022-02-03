import React from 'react';
import {
    Button,
    CircularProgress,
    Tooltip,
    Typography
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Modal from 'src/components/Modal/Modal';
import ConfirmationMessage from 'src/components/Modal/ConfirmationMessage';
import RestoreFromTrashIcon from '@material-ui/icons/RestoreFromTrash';
import successMessage from 'src/components/successToastNotification';
import Delete from '@material-ui/icons/Delete';
import Error from 'src/assets/warning_cyit.svg';
import Empty from 'src/assets/empty_xct9.svg';
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

class UserTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      users: [],
      isLoading: false,
      isError: false,
      modalConfirm: false,
    };
  }

  async componentDidMount() {
    this.handleLoadUsers();
  }

  getConfirmMessage(val, id) {
    this.setState({ modalConfirm: val, id });
  }

  async handleLoadUsers() {
    try {
      this.setState({ isError: false, isLoading: true });
      axiosInstance.get('/user/deleted/show/all').then((item) => {
        this.setState({ isLoading: false, users: item.data });
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        this.setState({ isLoading: false, isError: true });
        window.location = '/Login';
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    }
  }

  async handleRestoreUser(val) {
    try {
      this.setState({ isError: false, isLoading: true });
      axiosInstance.get(`/user/restore/${val}`).then((item) => {
        this.setState({ isLoading: false });
        // console.log(item);
        this.handleLoadUsers();
        setTimeout(() => {
          successMessage('User restored succefully');
        }, 1000);
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        this.setState({ isLoading: false, isError: true });
        window.location = '/Login';
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    }
  }

  async handleDeleteUser(val) {
    try {
      this.setState({ isError: false, isLoading: true });
      axiosInstance.delete(`/user/force/delete/${val}`).then((item) => {
        this.setState({ isLoading: false });
        this.handleLoadUsers();
        // setTimeout(() => {
        //   errorMessage('Device deleted succefully');
        // }, 1000);
      }).catch((err) => console.log(''));
    } catch (error) {
      if (error.message.indexOf('401') !== -1) {
        window.location = '/Login';
      } else {
        this.setState({ isLoading: false, isError: true });
      }
    }
  }

  render() {
    const
      {
        users,
        isLoading,
        isError,
        modalConfirm,
        id,
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

    if(users === undefined || users === null || users.length < 1) {
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
            <img src={Empty} alt="MyError" width="250" height="250" />
            <Typography variant="h4">No data available</Typography>
          </div>
        </div>
      );
    }

    return (
      <fragment>
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="left">Numero</StyledTableCell>
                <StyledTableCell align="left">First name</StyledTableCell>
                <StyledTableCell align="left">Last name</StyledTableCell>
                <StyledTableCell align="left">Username</StyledTableCell>
                <StyledTableCell align="left">Email</StyledTableCell>
                <StyledTableCell align="left">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((row) => (
                <StyledTableRow key={row.design}>
                  <StyledTableCell align="left">{row.id}</StyledTableCell>
                  <StyledTableCell align="left">{row.first_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.last_name}</StyledTableCell>
                  <StyledTableCell align="left">{row.username}</StyledTableCell>
                  <StyledTableCell align="left">{row.email}</StyledTableCell>
                  <StyledTableCell align="left">
                  <Tooltip title="Restore">
                      <Button color="primary" onClick={() => this.handleRestoreUser(row.id)}>
                        <RestoreFromTrashIcon />
                      </Button>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <Button style={{ color: 'red' }} onClick={() => this.getConfirmMessage(!modalConfirm, row.id, USER_CONNECTED.user.id)}>
                        <Delete />
                      </Button>
                    </Tooltip>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal
          title=""
          openPopup={modalConfirm}
          setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
        >
          <ConfirmationMessage
            // doDelete={this.handleDeleteUser(id)}
            id={id}
            userId={USER_CONNECTED.user.id}
            function={() => this.handleDeleteUser(id, USER_CONNECTED.user.id)}
            setOpenPopup={() => this.getConfirmMessage(!modalConfirm)}
          />
        </Modal>
        <ToastContainer />
      </fragment>
    );
  }
}

export default UserTable;