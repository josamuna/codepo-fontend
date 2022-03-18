import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import infoNotification from 'src/components/successToastNotification';
import axiosInstance from '../../axios';

class AddCommandForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      command: props.command,
      description: props.description,
      fields: {
        command: props.command,
        description: props.description
      },
      errors: {},
    };

    this.isUpdate = props.isUpdate;
    // this.handleChange = this.handleChange.bind(this);
    // this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidation(){
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Name
    if(!fields["command"]){
      formIsValid = false;
      errors["command"] = "Cannot be empty";
    }

    // if(typeof fields["command"] !== "undefined"){
    //   if(!fields["command"].match(/^[a-zA-Z]+$/)){
    //     formIsValid = false;
    //     errors["command"] = "Only letters";
    //   }        
    // }

    //Name
    if(!fields["description"]){
      formIsValid = false;
      errors["description"] = "Cannot be empty";
    }

    // if(typeof fields["description"] !== "undefined"){
    //   if(!fields["description"].match(/^[a-zA-Z]+$/)){
    //     formIsValid = false;
    //     errors["description"] = "Only letters";
    //   }        
    // }

    this.setState({errors: errors});
    return formIsValid;
  }

  handleChange(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ command: event.target.value });
  }

  handleChangeDescription(field, event) {
    let fields = this.state.fields;
    fields[field] = event.target.value;
    this.setState({ description: event.target.value });
  }

  async handleSubmit(event) {
    const formIsValid = this.handleValidation();
    if (formIsValid) {
      const { id, command, description } = this.state;
      // console.log(`Description :  + ${description} + \nCmd :  + ${commande}`);
      // this.setState({ isLoading: true });
      if (this.isUpdate === true) {
        axiosInstance.post(`/command/update/${id}`, {
          command,
          description,
        }).then((response) => {
          if (response.data.status) {
            /* eslint-disable  react/destructuring-assignment */
            this.props.setOpenPopup(false);
            this.props.function();
            setTimeout(() => {
              infoNotification('Command updated succefully');
            }, 1000);
          } else {
          }
        });
      } else {
        axiosInstance.post('/command/save', {
          command,
          description,
        }).then((response) => {
          if (response.data.status) {
            /* eslint-disable  react/destructuring-assignment */
            this.props.setOpenPopup(false);
            this.props.function();
            setTimeout(() => {
              infoNotification('Command saved succefully');
            }, 1000);
          } else {
          }
        });
      }
    }
    event.preventDefault();
  }

  render() {
    const { fields, errors } = this.state;

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
          COMMAND
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
              Commande
            </label>
            <input
              id="command"
              type="text"
              className="command"
              placeholder="Enter command"
              name="command"
              noValidate
              value={fields['command']}
              onChange={this.handleChange.bind(this, "command")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['command'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['command']}</p>}
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
              Description
            </label>
            <input
              id="description"
              type="text"
              // className="de"
              placeholder="Enter command description"
              name="description"
              noValidate
              value={fields['description']}
              onChange={this.handleChangeDescription.bind(this, "description")}
              style={{
                padding: '10px 10px',
                borderRadius: '5px',
                outline: 'none',
                border: '1px solid #cfcfcf'
              }}
            />
            {errors['description'] && <p style={{ color: '#FD1A2C', fontSize: '12px' }}>{errors['description']}</p>}
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

AddCommandForm.propTypes = {
  id: PropTypes.string,
  command: PropTypes.string,
  description: PropTypes.string,
  isUpdate: PropTypes.bool,
  setOpenPopup: PropTypes.any,
  function: PropTypes.any
};

export default AddCommandForm;
