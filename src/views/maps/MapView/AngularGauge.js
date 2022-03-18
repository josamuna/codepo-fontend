import React from 'react';
import PropTypes from 'prop-types';
import ReactFC from 'react-fusioncharts';
import FusionCharts from 'fusioncharts';
import Widgets from 'fusioncharts/fusioncharts.widgets';
import FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

ReactFC.fcRoot(FusionCharts, Widgets, FusionTheme);

// STEP 2 - Defining the dataset for the angular gauge along with the color configuration

const colorRange = {
  color: [{
    minValue: '0',
    maxValue: '25',
    code: localStorage.getItem('level_one') === null ? '#ff0000' : localStorage.getItem('level_one')
  }, {
    minValue: '25',
    maxValue: '50',
    code: localStorage.getItem('level_two') === null ? '#e44a00' : localStorage.getItem('level_two')
  }, {
    minValue: '50',
    maxValue: '75',
    code: localStorage.getItem('level_three') === null ? '#f8bd19' : localStorage.getItem('level_three')
  }, {
    minValue: '75',
    maxValue: '100',
    code: localStorage.getItem('level_four') === null ? '#6baa01' : localStorage.getItem('level_four')
  }]
};

// const dials = {
//   dial: [{
//     value: '67'
//   }]
// };

// STEP 3 - Creating the JSON object to store the chart configurations
// const chartConfigs = {
//   type: 'angulargauge', // The chart type
//   width: '300', // Width of the chart
//   height: '220', // Height of the chart
//   dataFormat: 'json', // Data type
//   dataSource: {
//     chart: {
//       caption: 'NIVEAU BATTERIE',
//       subcaption: 'DEVICE-1',
//       lowerLimit: '0',
//       upperLimit: '100',
//       theme: 'fusion'
//     },
//     colorRange,
//     dials
//   }
// };

// STEP 3 - Creating the DOM element to pass the react-fusioncharts component
class AngularGauge extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percent: props.percent === undefined || props.percent === null ? 0 : props.percent,
      device: props.device === undefined || props.device === null ? 0 : props.device
    };
  }

  render() {
    const { percent, device } = this.state;
    const dials = {
      dial: [{
        value: `${percent}`
      }]
    };

    // console.log('++++++++++++++++++++++');
    // console.log(percent);
    // console.log(device);

    return (
      <ReactFC
        {
          ...{
            type: 'angulargauge', // The chart type
            width: '300', // Width of the chart
            height: '220', // Height of the chart
            dataFormat: 'json', // Data type
            dataSource: {
              chart: {
                caption: 'BATTERY LEVEL',
                subcaption: `${device}`,
                lowerLimit: '0',
                upperLimit: '100',
                theme: 'fusion'
              },
              colorRange,
              dials
            }
          }
        }
      />
    );
  }
}

AngularGauge.propTypes = {
  percent: PropTypes.number,
  device: PropTypes.string
};

export default AngularGauge;
