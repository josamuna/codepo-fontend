import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import Select from 'react-select';
import infoNotification from 'src/components/successToastNotification';
import errorNotification from 'src/components/errorToastNotification';
import axiosInstance from '../../axios';
import USER_CONNECTED from 'src/user-connected';

class AddDeviceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      username: props.username,
      email: props.email,
      password: props.password,
      type: props.type,
      fields: {
        firstName: props.firstName,
        lastName: props.lastName,
        email: props.email,
        username: props.username,
      },
      errors: {},
    };

    // const isUpdate = props.isUpdate;
    this.isUpdate = props.isUpdate;
    // this.handleChangeFN = this.handleChangeFirstName.bind(this);
    // this.handleChangeLN = this.handleChangeLastName.bind(this);
    // this.handleChangeUN = this.handleChangeUsername.bind(this);
    // this.handleChangeEM = this.handleChangeEmail.bind(this);
    this.handleChangePW = this.handleChangePassword.bind(this);
    this.handleChangeList = this.handleChangeList.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["firstName"]){
      formIsValid = false;
      errors["firstName"] = "Cannot be empty";
    }

    if(typeof fields["firstName"] !== "undefined"){
      if(!fields["firstName"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["firstName"] = "Only letters";
      }        
    }

    if(!fields["lastName"]){
      formIsValid = false;
      errors["lastName"] = "Cannot be empty";
    }

    if(typeof fields["lastName"] !== "undefined"){
      if(!fields["lastName"].match(/^[a-zA-Z]+$/)){
        formIsValid = false;
        errors["lastName"] = "Only letters";
      }        
    }


    //Name
    if(!fields["username"]){
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    }

    // if(typeof fields["username"] !== "undefined"){
    //   if(!fields["username"].match(/^[a-zA-Z]+$/)){
    //     formIsValid = false;
    //     errors["username"] = "Only letters";
    //   }        
    // }

    if(!fields["email"]){
      formIsValid = false;
      errors["email"] = "Cannot be empty";
    }

    if(typeof fields["email"] !== "undefined"){
      let lastAtPos = fields["email"].lastIndexOf('@');
      let lastDotPos = fields["email"].lastIndexOf('.');

      if (!(lastAtPos < lastDotPos && lastAtPos > 0 && fields["email"].indexOf('@@') === -1 && lastDotPos > 2 && (fields["email"].length - lastDotPos) > 2)) {
        formIsValid = false;
        errors["email"] = "Email is not valid";
      }
    }
    // if (this.state.isUpdate === true) {
    //   if(!fields["password"]){
    //     formIsValid = false;
    //     errors["password"] = "Cannot be empty";
    //   }
    // }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleChangeFirstName = async (field, event) => {
    let fields = this.state.fields;
    let firstName = this.state.firstName;
    fields[field] = event.target.value;
    firstName = event.target.value;
    this.setState({ fields, firstName });
  }

  handleChangeLastName = async (field, event) => {
    let fields = this.state.fields;
    let lastName = this.state.lastName;
    fields[field] = event.target.value;
    lastName = event.target.value;
    this.setState({ fields, lastName });
  }

  handleChangeUsername = async (field, event) => {
    let fields = this.state.fields;
    let username = this.state.username;
    fields[field] = event.target.value;
    username = event.target.value;
    this.setState({ fields, username });
  }

  handleChangeEmail = async (field, event) => {
    let fields = this.state.fields;
    let email = this.state.email;
    fields[field] = event.target.value;
    email = event.target.value;
    this.setState({ fields, email });
  }

  handleChangePassword(event) {
    this.setState({ password: event.target.value });
  }

  handleChangeList = async (event) => {
    this.setState({ type: event.value });
  }

  async handleSubmit(event) {
    // let isUpdate = this.props.isUpdate;
    // const { id, isUpdate, ...rest } = this.props;
    const formIsValid = this.handleValidation();
    if (formIsValid) {
      if (JSON.parse(USER_CONNECTED.user.is_superuser) !== true) {
        this.setState({ type: 'user' });
      }
      const
        {
          id,
          firstName,
          lastName,
          username,
          email,
          password,
          type,
        } = this.state;
      let isStaff;
      // console.log(`Description :  + ${description} + \nCmd :  + ${commande}`);
      // this.setState({ isLoading: true });
      if(type === 'user') {
        isStaff = false;
      } else if(type === 'admin') {
        isStaff = true;
      } else {
        isStaff = false;
      }

      if(id === 1) {
        isStaff = true;
      }
      
      if (this.isUpdate === true) {
        axiosInstance.post(`/user/update/${id}`, {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
          is_staff: isStaff,
        }).then((response) => {
          if (response.data.status) {
            /* eslint-disable  react/destructuring-assignment */
            this.props.setOpenPopup(false);
            this.props.function();
            setTimeout(() => {
              infoNotification('User updated succefully');
            }, 1000);
          } else {
            errorNotification('Error occured');
          }
        });
      } else {
        axiosInstance.post('/user/save', {
          first_name: firstName,
          last_name: lastName,
          username,
          email,
          password,
          is_staff: isStaff,
        }).then((response) => {
          if (response.data.status) {
            // infoNotification('User saved succefully');
            /* eslint-disable  react/destructuring-assignment */
            this.props.setOpenPopup(false);
            this.props.function();
            setTimeout(() => {
              infoNotification('User saved succefully');
            }, 2000);
          } else {
            errorNotification('Error occured');
          }
        });
      }
    }
    
    event.preventDefault();
  }

  render() {
    const
      {
        fields,
        errors,
        id,
        // firstName,
        // lastName,
        // username,
        // email,
        // mode,
        password
      } = this.state;

    const types = [
      {
        type: 'user',
        label: 'Simple user',
      },
      {
        type: 'admin',
        label: 'Administrator'
      },
    ];

    const options = types.map((data) => ({ value: data.type, label: data.label }));

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
        <h1 style={{
          textAlign: 'center',
          width: '100%',
          color: '#111',
          fontWeight: 'lighter',
          fontFamily: '-appleSystem, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Open Sans, Helvetica Neue, sans-serif'
        }}
        >
          USER
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
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
              htmlFor="extid"
            >
              First Name
            </label>
            <input
              id="firstName"
              type="text"
              className="firstName"
              placeholder="Enter user first name"
              name="firstName"
              noValidate
              value={fields['firstName']}
              onChange={this.handleChangeFirstName.bind(this, "firstName")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['firstName'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['firstName']}</p>}
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
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Last Name
            </label>
            <input
              id="lastName"
              type="text"
              className="lastName"
              placeholder="Enter user last name"
              name="lastName"
              noValidate
              value={fields['lastName']}
              onChange={this.handleChangeLastName.bind(this, "lastName")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['lastName'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['lastName']}</p>}
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
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              className="username"
              placeholder="Enter username"
              name="username"
              noValidate
              value={fields['username']}
              onChange={this.handleChangeUsername.bind(this, "username")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['username'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['username']}</p>}
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
              htmlFor="Identity"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="email"
              placeholder="Enter user email"
              name="email"
              noValidate
              value={fields['email']}
              onChange={this.handleChangeEmail.bind(this, "email")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['email'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['email']}</p>}
          </div>
          {
            (JSON.parse(USER_CONNECTED.user.is_superuser) === true && id !== 1 )
            ? <div style={{
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
                  Type
                </label>
                <Select
                  options={options}
                  onChange={this.handleChangeList}
                  defaultValue={{type: 'user', label: 'Simple user'}}
                  styles={{
                    padding: '10px 10px',
                    borderRadius: '5px',
                    outline: 'none',
                    border: '1px solid #cfcfcf'
                  }}
                />
              </div>
            : <p />
          }
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
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              className="password"
              placeholder="Mot de passe de connexion"
              name="password"
              noValidate
              value={password}
              onChange={this.handleChangePW}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
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
              { this.isUpdate ? 'UPDATE' : 'ADD' }
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

AddDeviceForm.propTypes = {
  id: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  username: PropTypes.string,
  email: PropTypes.string,
  password: PropTypes.string,
  function: PropTypes.any,
  isUpdate: PropTypes.bool,
  setOpenPopup: PropTypes.any,
};

export default AddDeviceForm;
