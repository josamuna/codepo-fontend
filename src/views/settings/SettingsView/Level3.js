import React from 'react';
import reactCSS from 'reactcss';
import { SketchPicker } from 'react-color';
import {
  Box
} from '@material-ui/core';

class ChangeColor extends React.Component {
  constructor() {
    super();
    this.state = {
      displayColorPicker: false,
      color: {
        r: '241',
        g: '112',
        b: '19',
        a: '1',
      }
    };
  }

  handleClick = () => {
    this.setState({ displayColorPicker: true });
  };

  handleClose = () => {
    this.setState({ displayColorPicker: false });
  };

  handleChange = (color) => {
    this.setState({ color: color.rgb });
  };

  render() {
    const { color } = this.state;
    const { displayColorPicker } = this.state;
    const styles = reactCSS({
      default: {
        color: {
          width: '390px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
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
      <Box>
        <Box>
          <div>
            <div style={styles.swatch} onClick={this.handleClick}>
              <div style={styles.color} />
            </div>
            { displayColorPicker
              ? (
                <div style={styles.popover}>
                  <div style={styles.cover} onClick={this.handleClose} />
                  <SketchPicker color={color} onChange={this.handleChange} />
                </div>
              )
              : null}
          </div>
        </Box>
      </Box>
    );
  }
}

export default ChangeColor;
