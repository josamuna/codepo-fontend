import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MapView from 'src/views/maps/MapView';
import DeviceListView from 'src/views/devices/DeviceListView';
import DashboardView from 'src/views/reports/DashboardView';
import NotFoundView from 'src/views/errors/NotFoundView';
import SearchDeviceListView from 'src/views/search/SearchDeviceListView';
import SettingsView from 'src/views/settings/SettingsView';
// import AddDevicesView from 'src/views/AddDevices/AddDevicesView';
// import AddCommandView from 'src/views/AddCommand/AddCommandView';
import RecycleBinView from 'src/views/corbeille/CorbeilleView';
// import AddUserView from 'src/views/AddUser/AddUserView';
import UserView from 'src/views/User/UserView';
import ComandeView from 'src/views/commande/ComandeView';
import Login from 'src/views/Login/Login';
// import Profile from 'src/views/Profile/Profile';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'map', element: <MapView /> },
      { path: 'devices', element: <DeviceListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'search', element: <SearchDeviceListView /> },
      { path: 'recycle', element: <RecycleBinView /> },
      { path: 'settings', element: <SettingsView /> },
      // { path: 'AddDevices', element: <AddDevicesView /> },
      // { path: 'AddCommand', element: <AddCommandView /> },
      { path: 'GoToAddCommand', element: <Navigate to="/app/AddCommand" /> },
      // { path: 'AddUser', element: <AddUserView /> },
      // { path: 'Profile', element: <Profile /> },
      { path: 'user', element: <UserView /> },
      { path: 'commande', element: <ComandeView /> },
      { path: '/', element: <Navigate to="/Login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    children: [
      { path: '404', element: <NotFoundView /> },
      { path: 'Login', element: <Login /> },
      { path: '/', element: <Navigate to="/Login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
