import React, { Component } from 'react';
import { Button } from '@material-ui/core';
import PropTypes from 'prop-types';
import axiosInstance from '../../axios';

class CommandDevice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.id,
      designation: props.designation,
      externalId: props.externalId,
      identity: props.identity,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  async handleSubmit(event) {
    const {
      id,
      designation,
      externalId,
      identity
    } = this.state;

    axiosInstance.post('/device/publish', {
      id,
      designation,
      externalId,
      identity
    }).then((response) => {
      if (response.data.status) {
        console.log('success');
      } else {
        console.log('Error occured');
      }
    });
    event.preventDefault();
  }

  render() {
    const { designation, externalId, identity } = this.state;

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
              Identifiant du device :
            </label>
            <label
              htmlFor="id"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              {externalId}
            </label>
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
              htmlFor="id"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              Designation du device :
            </label>
            <label
              htmlFor="id"
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
            >
              {designation}
            </label>
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
              Identity :
            </label>
            <label
              style={{
                fontSize: '0.8em',
                marginBottom: '0.25em',
                color: '#222',
                fontWeight: 'lighter'
              }}
              htmlFor="extid"
            >
              {identity}
            </label>
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
              METTRE EN VEILLE
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

CommandDevice.propTypes = {
  id: PropTypes.string,
  designation: PropTypes.string,
  externalId: PropTypes.string,
  identity: PropTypes.string,
};

export default CommandDevice;
