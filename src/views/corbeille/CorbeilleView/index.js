// import React from 'react';
// import {
//   Box,
//   Container,
//   makeStyles,
//   // TextField,
//   // InputAdornment,
//   // SvgIcon
// } from '@material-ui/core';
// // import { Search as SearchIcon } from 'react-feather';
// import Page from 'src/components/Page';
// // import Results from './Results';
// import Toolbar from './Toolbar';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     backgroundColor: theme.palette.background.dark,
//     minHeight: '100%',
//     paddingBottom: theme.spacing(3),
//     paddingTop: theme.spacing(3)
//   }
// }));

// const DeviceListView = () => {
//   const classes = useStyles();

//   return (
//     <Page
//       className={classes.root}
//       title="Corbeille"
//     >
//       <Container maxWidth={false}>
//         <Box
//           display="flex"
//         >
//           <Box flexGrow={1} />
//           <Toolbar />
//         </Box>
//       </Container>
//     </Page>
//   );
// };

// export default DeviceListView;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import DeviceTable from './devicesTable';
import UserTable from './userTable';
import CommandTable from './commandTable';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

function TabPanel(props) {
  const {
    children,
    value,
    index,
    ...other
  } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="User" />
        <Tab label="Device" />
        <Tab label="Command" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <UserTable />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DeviceTable />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <CommandTable />
      </TabPanel>
    </Paper>
  );
}
