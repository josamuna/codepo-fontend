import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  // Divider
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
// import SearchIcon from '@material-ui/icons/Search';
import Logo from 'src/components/Logo';
import { Link } from 'react-router-dom';
// import DevicesDrow from 'src/views/maps/MapView/DevicesDrow';
import Notification from './Notification';
import Profile from './Profile/Profile';

const useStyles = makeStyles(() => ({
  root: {},
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({
  className,
  onMobileNavOpen,
  onMobileProfileOpen,
  ...rest
}) => {
  const classes = useStyles();
  // const [open, setOpen] = useState(false);

  return (
    <fragment>
      <Box>
        <AppBar
          className={clsx(classes.root, className)}
          elevation={0}
          {...rest}
          style={{ backgroundColor: 'white', color: 'black' }}
        >
          <Toolbar>
            <Hidden mdDown>
              <Box style={{
                width: '232px',
                borderRight: '1px solid #E0E0E0',
                height: '64px',
                paddingTop: '20px'
              }}
              >
                <Logo color="white" />
              </Box>
            </Hidden>
            <IconButton
              position="fixed"
              color="#8F9091"
              // onClick={() => setOpen(true)}
              onClick={onMobileNavOpen}
            >
              <MenuIcon />
            </IconButton>
            {/* <IconButton
              position="fixed"
              color="#8F9091"
            >
              <SearchIcon />
            </IconButton> */}
            <Box flexGrow={1} />
            <Box display="flex">
              <Link to="/app/settings">
                <IconButton>
                  <SettingsIcon />
                </IconButton>
              </Link>
              <Notification />
              <Profile />
              {/* <Divider />
              <div>
                <div>
                  <select name="language">
                    <option>FR</option>
                    <option>EN</option>
                  </select>
                </div>
              </div> */}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {/* <DevicesDrow open={open} setOpen={setOpen} /> */}
    </fragment>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func,
  onMobileProfileOpen: PropTypes.func
};

export default TopBar;
