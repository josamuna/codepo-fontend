import React, { Component } from 'react';
import {
  Button,
  CircularProgress,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import Error from 'src/assets/warning_cyit.svg';
import infoNotification from 'src/components/successToastNotification';
import axiosInstance from 'src/axios';

class AddDeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // id: props.id,
      caseid: props.caseid,
      commands: [],
      isLoading: false,
      isSending: false,
      isError: false,
      isCalibration: false,
      fields: {},
      errors: {},
      intervalSend: 0,
      intervalBat: 0,
      totalCapacity: 0,
      pourcentage: 0,
      isSetMode: true,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChangeBat = this.handleChangeBat.bind(this);
    // this.handleChangeSend = this.handleChangeSend.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["battery"]){
      formIsValid = false;
      errors["battery"] = "Cannot be empty";
    }

    if(typeof fields["battery"] !== "undefined"){
      if(!fields["battery"].match(/^[0-9\b]+$/)){
        formIsValid = false;
        errors["battery"] = "Only numbers";
      }        
    }

    //Name
    if(!fields["sending"]){
      formIsValid = false;
      errors["sending"] = "Cannot be empty";
    }

    if(typeof fields["sending"] !== "undefined"){
      if(!fields["sending"].match(/^[0-9\b]+$/)){
        formIsValid = false;
        errors["sending"] = "Only numbers";
      }        
    }

    if (this.state.isCalibration === true) {
      if(!fields["totalCapacity"]){
        formIsValid = false;
        errors["totalCapacity"] = "Cannot be empty";
      }
  
      if(typeof fields["totalCapacity"] !== "undefined"){
        if(!fields["totalCapacity"].match(/^[0-9\b]+$/)){
          formIsValid = false;
          errors["totalCapacity"] = "Only numbers";
        }
      }

      if(!fields["pourcentage"]){
        formIsValid = false;
        errors["pourcentage"] = "Cannot be empty";
      }
  
      if(typeof fields["pourcentage"] !== "undefined"){
        if(!fields["pourcentage"].match(/^[0-9\b]+$/)){
          formIsValid = false;
          errors["pourcentage"] = "Only numbers";
        }
      }
    }

    this.setState({errors: errors});
    return formIsValid;
  }

  async componentDidMount() {
    this.handleLoadCommands();
  }

  handleChangeBat = async (field, event) => {
    let fields = this.state.fields;
    let intervalBat = this.state.intervalBat;
    fields[field] = event.target.value;
    intervalBat = event.target.value;
    this.setState({ fields, intervalBat });
  }

  handleChangeSend = async (field ,event) => {
    // console.log(interval);
    let fields = this.state.fields;
    let intervalSend = this.state.intervalSend;
    fields[field] = event.target.value;
    intervalSend = event.target.value;
    this.setState({ fields, intervalSend });
  }

  handleChangeCapacity = async (field, event) => {
    let fields = this.state.fields;
    let totalCapacity = this.state.totalCapacity;
    fields[field] = event.target.value;
    totalCapacity = event.target.value;
    this.setState({ fields, totalCapacity });
  }

  handleChangePercentage = async (field ,event) => {
    // console.log(interval);
    let fields = this.state.fields;
    let pourcentage = this.state.pourcentage;
    fields[field] = event.target.value;
    pourcentage = event.target.value;
    this.setState({ fields, pourcentage });
  }

  handleChangeList = async (event) => {
    if (event.value.toLowerCase().includes("calibration")) {
      this.setState({ mode: event.value, isCalibration: true });
    } else {
      this.setState({ mode: event.value, isCalibration: false });
    }
    this.setState({ isSetMode: true });
  }

  async handleSubmit(event) {
    const formIsValid = this.handleValidation();
    try {
      if (formIsValid) {
        const {
          // id,
          caseid,
          mode,
          intervalBat,
          intervalSend,
          totalCapacity,
          pourcentage
        } = this.state;
        
        if(mode) {
          this.setState({ isSending: true });
          this.setState({ isSetMode: true });
          axiosInstance.post('/device/publish', {
            caseid,
            mode,
            intervalBat,
            intervalSend,
            total_capacity: totalCapacity,
            percentage: pourcentage
          }).then((response) => {
            if (response.data.status) {
              this.setState({ isSending: false });
              /* eslint-disable  react/destructuring-assignment */
              this.props.setOpenPopup(false);
              this.props.function();
              setTimeout(() => {
                infoNotification('Command send succefully');
              }, 1000);
            } else {
              this.setState({ isSending: false });
            }
          });
        } else {
          this.setState({ isSetMode: false });
        }
        // console.log(`${id} , ${caseid}, ${mode}, ${intervalBat} , ${intervalSend}`);
      }
    } catch(err) {
      this.setState({ isSending: false });
    }
    event.preventDefault();
  }

  async handleLoadCommands() {
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/command/show/all')
        .then((response) => response);
      if (res.status === 200) {
        const commands = res.data;
        this.setState({ commands, isLoading: false });
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

  render() {
    const { fields } = this.state;
    const { errors } = this.state;
    const {
      commands,
      isError,
      isLoading,
      isSending,
      isCalibration,
      isSetMode
    } = this.state;

    const options = commands.map((cmd) => ({ value: cmd.command, label: cmd.command }));
    // { value: 'chocolate', label: 'Chocolate' },
    // { value: 'strawberry', label: 'Strawberry' },
    // { value: 'vanilla', label: 'Vanilla' }
    // ];
    // console.log(options);

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
      <div style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <h3 style={{
          textAlign: 'center',
          width: '100%',
          color: '#111',
          fontWeight: 'lighter',
          fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif',
          marginBottom: '0.8em'
        }}
        >
          COMMAND DEVICE
        </h3>
        <form
          onSubmit={this.handleSubmit}
          noValidate
          style={{
            width: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
          }}
        >
          <div style={{
            marginRight: '1%',
            display: 'flex',
            flexDirection: 'column',
            marginBottom: '15px',
            width: '100%'
          }}
          >
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
            <label
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Command
            </label>
            {/* <NativeSelect
              id="select"
              type="text"
              className="extid"
              placeholder="Age"
              name="Age"
              noValidate
              onChange={this.handleChange}
              style={{
                marginBottom: '0.6em',
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf',
                heigth: '5px'
              }}
            >
              {commands.map((cmd) => (
                <option value={cmd.command}>{cmd.command}</option>
              ))}
            </NativeSelect> */}
            <Select name="value0" options={options} onChange={this.handleChangeList} />
            {
              (isSetMode === false)
              ?  (<p style={{ color: '#FD1A2C', fontSize: '12px' }}> Mode cannot be empty</p>)
              : (<p />)
            }
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
            <label
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.3em',
                marginTop: '0.4em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Sampling interval (seconds)
            </label>
            <input
              id="battery"
              type="text"
              className="value"
              placeholder="Enter the battery sampling interval(second)"
              name="battery"
              noValidate
              value={fields['battery']}
              onChange={this.handleChangeBat.bind(this, "battery")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['battery'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['battery']}</p>}
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
            <label
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.3em',
                marginTop: '0.4em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Sending interval (hour)
            </label>
            <input
              id="sending"
              type="text"
              className="value"
              placeholder="Enter the send interval(hour)"
              name="sending"
              noValidate
              value={fields['sending']}
              onChange={this.handleChangeSend.bind(this, "sending")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['sending'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['sending']}</p>}
            <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
            {
              (isCalibration === true)
                ? <div style={{
                    marginRight: '1%',
                    display: 'flex',
                    flexDirection: 'column',
                    marginBottom: '15px',
                    width: '100%'
                  }}
                  >
                    <label
                      htmlFor="Identity"
                      style={{
                        fontSize: '0.8em',
                        marginBottom: '0.3em',
                        marginTop: '0.4em',
                        color: '#222',
                        fontWeight: 'lighter'
                      }}
                    >
                      Total capacity
                    </label>
                    <input
                      id="totalCapacity"
                      type="text"
                      className="value"
                      placeholder="Enter the battery total capacity"
                      name="totalCapacity"
                      noValidate
                      value={fields['totalCapacity']}
                      onChange={this.handleChangeCapacity.bind(this, "totalCapacity")}
                      style={{
                        padding: '10px 10px',
                        borderRadius: '5px',
                        outline: 'none',
                        border: '1px solid #cfcfcf'
                      }}
                    />
                    {errors['totalCapacity'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['totalCapacity']}</p>}
                    <>{ /* eslint-disable-next-line jsx-a11y/label-has-associated-control */ }</>
                    <label
                      htmlFor="Identity"
                      style={{
                        fontSize: '0.8em',
                        marginBottom: '0.3em',
                        marginTop: '0.4em',
                        color: '#222',
                        fontWeight: 'lighter'
                      }}
                    >
                      Pourcentage (%)
                    </label>
                    <input
                      id="pourcentage"
                      type="text"
                      className="value"
                      placeholder="Enter the pourcentage (%)"
                      name="pourcentage"
                      noValidate
                      value={fields['pourcentage']}
                      onChange={this.handleChangePercentage.bind(this, "pourcentage")}
                      style={{
                        padding: '10px 10px',
                        borderRadius: '5px',
                        outline: 'none',
                        border: '1px solid #cfcfcf'
                      }}
                    />
                    {errors['pourcentage'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['pourcentage']}</p>}
                  </div>
                : <p />
            }
          </div>
          <div style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column' 
          }}
          >
            <Button
              color="primary"
              variant="contained"
              type="submit"
            >
              {
                (isSending === true)
                  ? <CircularProgress style={{ color: 'white', width: '10%', height: '10%' }} />
                  : 'EXECUTE'
              }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

AddDeviceForm.propTypes = {
  // id: PropTypes.any,
  caseid: PropTypes.any,
  setOpenPopup: PropTypes.any,
  function: PropTypes.func,
};

export default AddDeviceForm;
