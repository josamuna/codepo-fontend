import React from 'react';
import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

class DataResult extends React.Component {
  constructor(props) {
    super(props);
    this.setState = {
      devices: [
        {
          id: 1,
          device: 'Dev_001',
          latitude: 12_52554,
          Longitude: 1555016,
          source: 'GSM cell data',
          time: 1555016400000,
          mode: 0,
          statut: 0,
          tension: '77',
          frequence: '7',
        },
        {
          id: 1,
          device: 'Dev_001',
          latitude: 12_52554,
          Longitude: 1555016,
          source: 'GSM cell data',
          time: 1555016400000,
          mode: 0,
          statut: 0,
          tension: '77',
          frequence: '7',
        },
        {
          id: 1,
          device: 'Dev_001',
          latitude: 12_52554,
          Longitude: 1555016,
          source: 'GSM cell data',
          time: 1555016400000,
          mode: 0,
          statut: 0,
          tension: '77',
          frequence: '7',
        },
      ]
    };
  }

  render() {
    return (
      <Card>
        <Box>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Device
                </TableCell>
                <TableCell>
                  Latitude
                </TableCell>
                <TableCell>
                  Longitude
                </TableCell>
                <TableCell>
                  Souce
                </TableCell>
                <TableCell>
                  Time
                </TableCell>
                <TableCell>
                  Mode
                </TableCell>
                <TableCell>
                  Statut
                </TableCell>
                <TableCell>
                  Tension
                </TableCell>
                <TableCell>
                  Frequency
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.setState.devices.map((dev) => (
                <TableRow>
                  <TableCell>
                    {dev.id}
                  </TableCell>
                  <TableCell>
                    <Box
                      alignItems="center"
                      display="flex"
                    >
                      {dev.device}
                    </Box>
                  </TableCell>
                  <TableCell>
                    {dev.latitude}
                  </TableCell>
                  <TableCell>
                    {dev.Longitude}
                  </TableCell>
                  <TableCell>
                    {dev.source}
                  </TableCell>
                  <TableCell>
                    {dev.time}
                  </TableCell>
                  <TableCell>
                    {dev.mode}
                  </TableCell>
                  <TableCell>
                    {dev.statut}
                  </TableCell>
                  <TableCell>
                    {dev.tension}
                  </TableCell>
                  <TableCell>
                    {dev.frequence}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </Card>
    );
  }
}

export default DataResult;
