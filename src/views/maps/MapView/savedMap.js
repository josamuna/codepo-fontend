import React from 'react';
import './Map.css';
import PropTypes from 'prop-types';
import {
  CircularProgress,
  TableCell,
  TableRow,
  Grid,
  Typography
} from '@material-ui/core';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Error from 'src/assets/warning_cyit.svg';
import Container from 'react-bootstrap/Container';
import {
  MapContainer,
  TileLayer,
  Marker,
  LayersControl,
  Popup,
  Tooltip,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'react-leaflet-markercluster/dist/styles.min.css';
import MarkerClusterGroup from 'react-leaflet-markercluster';
import MyComponent from './GaugeView';
import axiosInstance from '../../../axios';

class MapChange extends React.PureComponent {
  /* eslint-disable react/no-unused-state */
  constructor(props) {
    super(props);
    this.state = {
      devices: props.devices === undefined || props.devices === null ? [] : props.devices,
      isLoading: false,
      isError: false
    };
  }

  componentDidMount() {
    this.handleLoadDevices();
    this.intervalID = setInterval(() => {
      this.handleLoadDevices();
    }, 300000/* 30000 */);
    // console.log(`------ ${this.intervalID} -------------`);
    // this.setState({ intervalID: myIntervalID });
  }

  componentWillUnmount() {
    // use intervalId from the state to clear the interval
    /* eslint-disable prefer-destructuring */
    /* eslint-disable react/destructuring-assignment */
    // const intervalID = this.state.intervalID;
    // console.log(this.intervalID);
    clearInterval(this.intervalID);
    // console.log('=============  COMPONENT DESTROYED  ================');
  }

  async handleLoadDevices() {
    let count = 0;
    try {
      this.setState({ isLoading: true });
      const res = await axiosInstance.get('/device/history/show/all')
        .then((response) => response);
      if (res.status === 200) {
        // console.log(res.data);
        const devices = res.data;
        this.setState({ devices, isLoading: false });
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    } catch (err) {
      count++;
      if (err.message.indexOf('401') !== -1) {
        window.location = '/Login';
        localStorage.removeItem('id');
        localStorage.removeItem('username');
        localStorage.removeItem('email');
        localStorage.removeItem('first_name');
        localStorage.removeItem('last_name');
        localStorage.removeItem('is_superuser');
      } else if (count <= 3) {
        this.handleLoadDevices();
      } else {
        this.setState({ isError: true, isLoading: false });
      }
    }
  }

  render() {
    const myIcon = L.icon({
      iconUrl: 'https://ghybs.github.io/leaflet-defaulticon-compatibility/built/assets/2273e3d8ad9264b7daa5bdbf8e6b47f8.png',
      iconSize: [25, 41],
      inconAnchor: [12.5, 41],
      popupAnchor: [0, -41]
    });

    const mapType = {
      maptiler: {
        url: 'https://api.maptiler.com/maps/basic/256/{z}/{x}/{y}.png?key=QItxyrOEmoTCWZxLHLQf',
        attribution: '&copy; <a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      },
      openStreet: {
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      },
      satellite: {
        url: 'https://api.maptiler.com/maps/hybrid/{z}/{x}/{y}@2x.jpg?key=QItxyrOEmoTCWZxLHLQf',
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      },
      toner: {
        url: 'https://api.maptiler.com/maps/toner/{z}/{x}/{y}@2x.png?key=QItxyrOEmoTCWZxLHLQf',
        attribution: '<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
      }
    };

    const
      {
        devices,
        isLoading,
        isError
      } = this.state;
    // console.log(isLoading);
    // console.log(isError);
    // console.log('**********************************');
    // console.log(devices);

    if (isLoading) {
      console.log('is loading...');
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
      <Grid container style={{ marginLeft: '5%' }}>
        <Grid
          item
          xs={12}
        >
          {/* {[-1.691, 29.100]} */}
          <MapContainer className="map" center={[-1, 29]} zoom={2} scrollWheelZoom={false}>
            <LayersControl position="topright">
              <LayersControl.BaseLayer checked name="Observation Vue Par defaut">
                <TileLayer
                  attribution={mapType.openStreet.attribution}
                  url={mapType.openStreet.url}
                />
              </LayersControl.BaseLayer>
              <LayersControl.BaseLayer name="Observation Vue Satellite">
                <TileLayer
                  attribution={mapType.satellite.attribution}
                  url={mapType.satellite.url}
                />
              </LayersControl.BaseLayer>
              <LayersControl.Overlay name="Afficher les devices">
                <MarkerClusterGroup>
                  {
                    devices.map((device) => (
                      <Marker
                        position={
                          [
                            device.measureds[0].location_latitude,
                            device.measureds[0].location_longitude
                          ]
                        }
                        icon={myIcon}
                      >
                        <Tooltip>
                          {device.external_id}
                          <br />
                          {device.measureds[0].location_latitude}
                          <br />
                          {device.measureds[0].location_longitude}
                        </Tooltip>
                        <Popup>
                          <MyComponent
                            percent={device.measureds[0].tension}
                            device={device.external_id}
                          />
                          <br />
                          <Container>
                            <Col>
                              <Row>Designation :</Row>
                              <Row>{device.external_id}</Row>
                            </Col>
                            <Col>
                              <Row>Identite :</Row>
                              <Row>{device.designation}</Row>
                            </Col>
                            <Grid container justify="space-around">
                              <Typography>Designation</Typography>
                              <Typography align="right">{device.external_id}</Typography>
                              <br />
                              <Typography>Identite</Typography>
                              <Typography align="right">{device.designation}</Typography>
                            </Grid>
                          </Container>
                          <TableRow>
                            <TableCell>Niveau de la batterie :</TableCell>
                            <TableCell>{device.measureds[0].tension}</TableCell>
                          </TableRow>
                          Niveau de la batterie :
                          {device.measureds[0].tension}
                          %
                          <br />
                          <br />
                          Localisation :
                          {device.measureds[0].location_latitude}
                          ,
                          <br />
                          {device.measureds[0].location_longitude}
                          <br />
                          <br />
                          Source :
                          {device.measureds[0].source}
                        </Popup>
                      </Marker>
                    ))
                  }
                </MarkerClusterGroup>
              </LayersControl.Overlay>
            </LayersControl>
          </MapContainer>
        </Grid>
      </Grid>
    );
  }
}

MapChange.propTypes = {
  devices: PropTypes.arrayOf,
  // history: PropTypes.object
};

export default MapChange;
