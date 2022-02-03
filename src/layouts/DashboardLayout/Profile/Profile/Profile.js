// import React from 'react';
// import {
//   Box,
//   Divider,
//   Button,
//   Card,
//   CardContent,
//   CardHeader,
//   Avatar
// } from '@material-ui/core';
// import USER_CONNECTED from '../../../../user-connected';
// // import history from '../../../../history';

// class NotificationObject extends React.Component {
//   // values = require('../../../../views/Login/Login');
//   // constructor(props) {
//   //   super(props);
//   //   console.log('Constructor');
//   // }

//   handleOnDeconnect = () => {
//     // const { history } = this.props;
//     console.log('User deconnected...');
//     // window.location.hash = no-back-button;
//     // history.replace('/Login');
//     // history.push('/Login');
//     window.location.replace('/Login');
//     // window.onbeforeunload = () => 'Your work will be lost.';
//     // window.addEventListener('popstate', () =>
//     //   history.pushState(null, null, 'no-back-button'));
//   }

//   render() {
//     return (
//       <Card>
//         <CardHeader
//           title="Profil"
//         />
//         <Divider />
//         <CardContent>
//           <Box padding="5px">
//             <Box
//               width="180px"
//               backgroundColor="white"
//             >
//               <Avatar
//                 source={{
//                   uri:
//                     'https://images.unsplash.com/photo-1559526323-cb2f2fe2591b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80'
//                 }}
//                 size="giant"
//                 style={{ width: 100, height: 100 }}
//               />
//               <h2>{USER_CONNECTED.user.username}</h2>
//               <p>{USER_CONNECTED.user.email}</p>
//               {
//                 (USER_CONNECTED.user.is_superuser === true)
//                   ? <p>Administrateur</p>
//                   : <p>Utilisateur</p>
//               }
//             </Box>
//           </Box>
//         </CardContent>
//         <Divider />
//         <Box
//           justifyContent="flex-end"
//           p={1}
//         >
//           <Button
//             color="primary"
//             onClick={() => this.handleOnDeconnect()}
//           >
//             Deconnexion
//           </Button>
//         </Box>
//       </Card>
//     );
//   }
// }

// export default NotificationObject;
import React from 'react';
import {
  Box,
  Divider,
  Button,
  Card,
  CardContent,
  CardHeader,
  Avatar
} from '@material-ui/core';
import USER_CONNECTED from '../../../../user-connected';

class NotificationObject extends React.Component {
  handleOnDeconnect = () => {
    console.log('User deconnected...');
    localStorage.removeItem('id');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
    localStorage.removeItem('first_name');
    localStorage.removeItem('last_name');
    localStorage.removeItem('is_superuser');
    window.location.replace('/Login');
  }

  render() {
    return (
      <Card>
        <CardHeader
          title="Profil"
        />
        <Divider />
        <CardContent>
          <Box padding="5px">
            <Box
              width="200px"
              backgroundColor="white"
            >
              <Avatar id="avatar" src="/static/images/avatars/avatar_6.png" style={{ width: '100px', height: '100px', marginLeft: '25%' }} />
              <Box>
                <h3 style={{ textAlign: 'center' }} size="giant">{USER_CONNECTED.user.username}</h3>
                <p style={{ textAlign: 'center' }} size="giant">{USER_CONNECTED.user.email}</p>
                <p style={{ textAlign: 'center' }} size="giant">
                  {
                    (JSON.parse(USER_CONNECTED.user.is_superuser) === true)
                      ? <p>Super administrator</p>
                      : (JSON.parse(USER_CONNECTED.user.is_staff) === true)
                          ? <p>Administrator</p>
                          : <p>User</p>
                  }
                </p>
              </Box>
            </Box>
          </Box>
        </CardContent>
        <Divider />
        {/* <div>
          <Box
            className="ni ni-user-run"
            style={{ textAlign: 'center' }}
            size="giant"
          >
            <Button className="ni ni-user-run" color="action">
              My monitor account
            </Button>
          </Box>
        </div> */}
        <div>
          <Box
            className="ni ni-user-run"
            style={{ textAlign: 'center' }}
            size="giant"
          >
            <Button className="ni ni-user-run" color="primary" onClick={() => this.handleOnDeconnect()}>
              Sign Out
            </Button>
          </Box>
        </div>
      </Card>
    );
  }
}

export default NotificationObject;
