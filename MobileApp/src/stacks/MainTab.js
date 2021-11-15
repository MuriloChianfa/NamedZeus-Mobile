import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CustomTabBar from '../components/CustomTabBar';

import Home from '../screens/Home';
import Server from '../screens/Server';
import Dashboard from '../screens/Dashboard';
import SNMP from '../screens/SNMP';
import Profile from '../screens/Profile';
import AddServer from '../screens/AddServer';
import AddSNMP from '../screens/AddSNMP';

const Tab = createBottomTabNavigator();

export default () => (
    <Tab.Navigator tabBar={props=><CustomTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Server" component={Server} />
        <Tab.Screen name="Dashboard" component={Dashboard} />
        <Tab.Screen name="SNMP" component={SNMP} />
        <Tab.Screen name="Profile" component={Profile} />
        <Tab.Screen name="AddServer" component={AddServer} />
        <Tab.Screen name="AddSNMP" component={AddSNMP} />
    </Tab.Navigator>
);
