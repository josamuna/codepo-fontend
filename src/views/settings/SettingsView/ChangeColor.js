import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import {
  Card,
  CardHeader,
  Divider,
  CardContent,
  Box,
  Typography,
  Button
} from '@material-ui/core';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import successNotification from 'src/components/successToastNotification';
import errorNotification from 'src/components/errorToastNotification';
import USER_CONNECTED from 'src/user-connected';
import axiosInstance from 'src/axios';
// import ColorLevel1 from './ColorLevel1';
// import Level2 from './Level2';
// import Level3 from './Level3';

class ChangeColor extends React.Component {
  constructor() {
    super();
    this.state = {
      displayPicker1: false,
      displayPicker2: false,
      displayPicker3: false,
      displayPicker4: false,
      color1: '#cc0000',
      color2: '#b63b00',
      color3: '#bb8b06',
      color4: '#568801',
    };

    this.handleClick1 = this.handleClick1.bind(this);
    this.handleClick2 = this.handleClick2.bind(this);
    this.handleClick3 = this.handleClick3.bind(this);
    this.handleClick4 = this.handleClick4.bind(this);

    this.handleClose1 = this.handleClose1.bind(this);
    this.handleClose2 = this.handleClose2.bind(this);
    this.handleClose3 = this.handleClose3.bind(this);
    this.handleClose4 = this.handleClose4.bind(this);

    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleChange3 = this.handleChange3.bind(this);
    this.handleChange4 = this.handleChange4.bind(this);
  }

  handleClick1 = () => {
    this.setState({ displayPicker1: true });
  };

  handleClose1 = () => {
    this.setState({ displayPicker1: false });
  };

  handleClick2 = () => {
    this.setState({ displayPicker2: true });
  };

  handleClose2 = () => {
    this.setState({ displayPicker2: false });
  };

  handleClick3 = () => {
    this.setState({ displayPicker3: true });
  };

  handleClose3 = () => {
    this.setState({ displayPicker3: false });
  };

  handleClick4 = () => {
    this.setState({ displayPicker4: true });
  };

  handleClose4 = () => {
    this.setState({ displayPicker4: false });
  };

  handleChange1 = (color) => {
    this.setState({ color1: color.hex });
  };

  handleChange2 = (color) => {
    this.setState({ color2: color.hex });
  };

  handleChange3 = (color) => {
    this.setState({ color3: color.hex });
  };

  handleChange4 = (color) => {
    this.setState({ color4: color.hex });
  };

  handleSubmit = () => {
    const
      {
        color1,
        color2,
        color3,
        color4
      } = this.state;
    axiosInstance.post('/user/color/save', {
      level_one: color1,
      level_two: color2,
      level_three: color3,
      level_four: color4,
      user_id: USER_CONNECTED.user.id
    }).then((response) => {
      if (response.data.status) {
        // infoNotification('User saved succefully');
        /* eslint-disable  react/destructuring-assignment */
        // this.props.setOpenPopup(false);
        successNotification('Colors configurations saved succefully');
      } else {
        // console.log(response);
        // console.log(response.data.message);
        errorNotification('Error occured when trying to save colors configurations. Retry later');
      }
    });
  };

  render() {
    const
      {
        color1,
        color2,
        color3,
        color4
      } = this.state;

    const
      {
        displayPicker1,
        displayPicker2,
        displayPicker3,
        displayPicker4
      } = this.state;

    const styles = reactCSS({
      default: {
        color1: {
          width: '390px',
          height: '14px',
          borderRadius: '2px',
          background: `${color1}`,
        },
        color2: {
          width: '390px',
          height: '14px',
          borderRadius: '2px',
          background: `${color2}`,
        },
        color3: {
          width: '390px',
          height: '14px',
          borderRadius: '2px',
          background: `${color3}`,
        },
        color4: {
          width: '390px',
          height: '14px',
          borderRadius: '2px',
          background: `${color4}`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          width: '400px',
          display: 'inline-box',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px'
        },
      },
    });

    return (
      <Card>
        <CardHeader
          title="settings"
        />
        <Divider />
        <CardContent display="flex">
          <Typography>
            Level 1 (0 - 24)
          </Typography>
          <Box>
            <div style={styles.swatch} onClick={this.handleClick1}>
              <div style={styles.color1} />
            </div>
            { displayPicker1
              ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose1} />
                  <SketchPicker color={color1} onChange={this.handleChange1} />
                </div>
              )
              : null}
          </Box>
        </CardContent>
        <CardContent>
          <Typography>
            Level 2 (25 - 49)
          </Typography>
          <Box>
            <div style={styles.swatch} onClick={this.handleClick2}>
              <div style={styles.color2} />
            </div>
            { displayPicker2
              ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose2} />
                  <SketchPicker color={color2} onChange={this.handleChange2} />
                </div>
              )
              : null}
          </Box>
        </CardContent>
        <CardContent>
          <Typography>
            Level 3 (50 - 74)
          </Typography>
          <Box>
            <div style={styles.swatch} onClick={this.handleClick3}>
              <div style={styles.color3} />
            </div>
            { displayPicker3
              ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose3} />
                  <SketchPicker color={color3} onChange={this.handleChange3} />
                </div>
              )
              : null}
          </Box>
        </CardContent>
        <CardContent>
          <Typography>Level 4 (75 - 100)</Typography>
          <Box>
            <div style={styles.swatch} onClick={this.handleClick4}>
              <div style={styles.color4} />
            </div>
            { displayPicker4
              ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose4} />
                  <SketchPicker color={color4} onChange={this.handleChange4} />
                </div>
              )
              : null}
          </Box>
        </CardContent>
        <Divider />
        <Box
          display="flex"
          justifyContent="flex-end"
          p={2}
        >
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleSubmit()}
          >
            Save
          </Button>
        </Box>
        <ToastContainer />
      </Card>
    );
  }
}

export default ChangeColor;
