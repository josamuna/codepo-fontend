import React from 'react';
import PropTypes from 'prop-types';
import AngularGauge from './AngularGauge';
// import FusionCharts from 'fusioncharts';
// import charts from 'fusioncharts/fusioncharts.charts';
// import ReactFusioncharts from 'react-fusioncharts';
// import GaugeChart from 'react-gauge-chart';

// charts(FusionCharts);
// const dataSource = {
//   chart: {
//     caption: 'Nordstorm\'s Customer Satisfaction Score for 2017',
//     lowerlimit: '0',
//     upperlimit: '100',
//     showvalue: '1',
//     numbersuffix: '%',
//     theme: 'fusion',
//     showtooltip: '0'
//   },
//   colorrange: {
//     color: [
//       {
//         minvalue: '0',
//         maxvalue: '50',
//         code: '#F2726F'
//       },
//       {
//         minvalue: '50',
//         maxvalue: '75',
//         code: '#FFC533'
//       },
//       {
//         minvalue: '75',
//         maxvalue: '100',
//         code: '#62B58F'
//       }
//     ]
//   },
//   dials: {
//     dial: [
//       {
//         value: '81'
//       }
//     ]
//   }
// };

class MyComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      percent: props.percent === undefined || props.percent === null ? 0 : props.percent,
      device: props.device === undefined || props.device === null ? 0 : props.device
    };
  }

  render() {
    const { percent, device } = this.state;
    return (
      <div>
        <AngularGauge percent={percent} device={device} />
      </div>
    );
  }
}

MyComponent.propTypes = {
  percent: PropTypes.number,
  device: PropTypes.string,
};

export default MyComponent;
