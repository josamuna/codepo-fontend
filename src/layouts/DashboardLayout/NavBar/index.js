import React, { useEffect } from 'react';
// import { withTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Box,
  Divider,
  Drawer,
  Hidden,
  List,
  makeStyles
} from '@material-ui/core';
import {
  BarChart as BarChartIcon,
  Clock as ClockIcon,
  Map as MapIcon,
  UserPlus as UserPlusIcon,
  Code as CodeIcon,
  Trash as TrashIcon,
  // Settings as SettingsIcon
} from 'react-feather';
import Devices from '@material-ui/icons/Devices';
import ListItem from '@material-ui/core/ListItemText';
import NavItem from './NavItem';
import USER_CONNECTED from '../../../user-connected';

const items = [
  {
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    href: '/app/devices',
    icon: Devices,
    title: 'Device'
  },
  {
    href: '/app/search',
    icon: ClockIcon,
    title: 'History'
  },
  {
    href: '/app/map',
    icon: MapIcon,
    title: 'Maps'
  }
];
const Item2 = [
  {
    href: '/app/commande',
    icon: CodeIcon,
    title: 'Command'
  },
  {
    href: '/app/user',
    icon: UserPlusIcon,
    title: 'Users'
  },
  {
    href: '/app/recycle',
    icon: TrashIcon,
    title: 'Recycle bin'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box
      height="100%"
      display="flex"
      flexDirection="column"
    >
      <Divider />
      <Box p={2}>
        <List>
          {items.map((item) => (
            <NavItem
              href={item.href}
              key={item.title}
              title={item.title}
              icon={item.icon}
            />
          ))}
        </List>
        <Divider />
        <ListItem button divider />
        <List>
          {Item2.map((item) => (
            (JSON.parse(USER_CONNECTED.user.is_staff) === true || JSON.parse(USER_CONNECTED.user.is_superuser) === true)
              ? (
                <NavItem
                  href={item.href}
                  key={item.title}
                  title={item.title}
                  icon={item.icon}
                />
              )
              : <Box />
          ))}
        </List>
      </Box>
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool,
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
