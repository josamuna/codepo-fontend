import React, { Component } from 'react';
import { Button, CircularProgress } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import infoNotification from 'src/components/successToastNotification';
import errorNotification from 'src/components/errorToastNotification';
import axiosInstance from '../../axios';
import USER_CONNECTED from '../../user-connected';
// import { identity } from 'lodash';

class AddDeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      caseid: props.caseid,
      mode: props.mode,
      intervalBatS: props.intervalBatS,
      intervalSendingH: props.intervalSendingH,
      isLoading: false,
      commands: [],
      fields: {
        caseid: props.caseid,
        mode: props.mode,
        battery: props.intervalBatS,
        sending: props.intervalSendingH
      },
      errors: {},
      isSetMode: true,
    };

    this.isUpdate = props.isUpdate;
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["caseid"]){
      formIsValid = false;
      errors["caseid"] = "Cannot be empty";
    }

    // if(typeof fields["caseid"] !== "undefined"){
    //   if(!fields["caseid"].match(/^[a-zA-Z]+$/)){
    //     formIsValid = false;
    //     errors["caseid"] = "Only letters";
    //   }        
    // }

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

    this.setState({errors: errors});
    return formIsValid;
  }

  async componentDidMount() {
    this.handleLoadCommands();
  }

  handleChangeList = async (event) => {
    this.setState({ mode: event.value });
    this.setState({ isSetMode: true });
  }

  handleChange = async (field, event) => {
    let fields = this.state.fields;
    let caseid = this.state.caseid;
    fields[field] = event.target.value;
    caseid = event.target.value;
    this.setState({ fields, caseid });
  }

  // handleChangeMode(event) {
  //   this.setState({ mode: event.target.value });
  // }

  handleChangeBat = async (field, event) => {
    let fields = this.state.fields;
    let intervalBatS = this.state.intervalBatS;
    fields[field] = event.target.value;
    intervalBatS = event.target.value;
    this.setState({ fields, intervalBatS });
  }

  handleChangeSend = async (field, event) => {
    let fields = this.state.fields;
    let intervalSendingH = this.state.intervalSendingH;
    fields[field] = event.target.value;
    intervalSendingH = event.target.value;
    this.setState({ fields, intervalSendingH });
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

  async handleSubmit(event) {
    const formIsValid = this.handleValidation();
    if (formIsValid) {
      const
        {
          id,
          caseid,
          mode,
          intervalBatS,
          intervalSendingH
        } = this.state;
      // console.log(`Description :  + ${description} + \nCmd :  + ${commande}`);
      if(mode) {
        this.setState({ isLoading: true, isSetMode: true });
        if (this.isUpdate === true) {
          axiosInstance.post(`/device/update/${id}`, {
            caseid,
            mode,
            interval_bat_s: intervalBatS,
            interval_sending_h: intervalSendingH,
            updated_by: USER_CONNECTED.user.id,
          }).then((response) => {
            if (response.data.status) {
              this.setState({ isLoading: false });
              /* eslint-disable  react/destructuring-assignment */
              this.props.setOpenPopup(false);
              this.props.function();
              setTimeout(() => {
                infoNotification('Device updated succefully');
              }, 1000);
            } else {
              this.setState({ isLoading: false });
              errorNotification('Error occured: Data are not valid');
            }
          });
        } else {
          axiosInstance.post('/device/save', {
            caseid,
            mode,
            interval_bat_s: intervalBatS,
            interval_sending_h: intervalSendingH,
            created_by: USER_CONNECTED.user.id,
          }).then((response) => {
            if (response.data.status) {
              this.setState({ isLoading: false });
              /* eslint-disable  react/destructuring-assignment */
              this.props.setOpenPopup(false);
              this.props.function();
              setTimeout(() => {
                infoNotification('Device saved succefully');
              }, 1000);
            } else {
              this.setState({ isLoading: false });
              errorNotification(response.data.message);
            }
          });
          this.setState({ isLoading: false });
        }
      } else {
        this.setState({ isSetMode: false });
      }
    }
    event.preventDefault();
  }

  render() {
    const {
      commands,
      fields,
      // mode,
      errors,
      isLoading,
      isSetMode
    } = this.state;

    const options = commands.map((cmd) => ({ value: cmd.command, label: cmd.command }));

    return (
      <div style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 40px',
        borderRadius: '10px',
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <h1 style={{
          textAlign: 'center',
          width: '100%',
          color: '#111',
          fontWeight: 'lighter',
          fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
        }}
        >
          DEVICE
        </h1>
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
              htmlFor="id"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Identity
            </label>
            <input
              id="caseid"
              type="text"
              className="identity"
              placeholder="Enter device identity"
              name="caseid"
              noValidate
              value={fields['caseid']}
              onChange={this.handleChange.bind(this, "caseid")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['caseid'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['caseid']}</p>}
          </div>
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
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
              htmlFor="extid"
            >
              Mode
            </label>
            <Select options={options} onChange={this.handleChangeList} />
            {
              (isSetMode === false)
              ?  (<p style={{ color: '#FD1A2C', fontSize: '12px' }}> Mode svp</p>)
              : (<p />)
            }
            {/* <input
              id="mode"
              type="text"
              className="mode"
              placeholder="Enter default battery mode"
              name="mode"
              noValidate
              value={mode}
              onChange={this.handleChangeMode}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            /> */}
          </div>
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
              htmlFor="battery"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Battery sampling interval (second)
            </label>
            <input
              id="battery"
              type="text"
              className="battery"
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
          </div>
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
              htmlFor="intervalBatS"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Sending interval (hour)
            </label>
            <input
              id="sending"
              type="text"
              className="sending"
              placeholder="Enter the message sending interval(hour)"
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
              { /* eslint-disable  no-nested-ternary */ }
              {
                (isLoading === true)
                  ? <CircularProgress style={{ color: 'white', width: '10%', height: '10%' }} />
                  : this.isUpdate ? 'UPDATE' : 'ADD'
              }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

AddDeviceForm.propTypes = {
  id: PropTypes.string,
  caseid: PropTypes.string,
  mode: PropTypes.string,
  intervalBatS: PropTypes.string,
  intervalSendingH: PropTypes.any,
  isUpdate: PropTypes.bool,
  setOpenPopup: PropTypes.any,
  function: PropTypes.any,
};

export default AddDeviceForm;
