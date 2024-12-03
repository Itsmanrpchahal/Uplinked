import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from '@root/navigation/StackNavigator';
import { WINDOW_DEVICE_HEIGHT } from '@root/utils/constants';
import CustomDrawer from '@root/navigation/CustomDrawer';

const Drawer = createDrawerNavigator();

function MainDrawer() {
    return (
        <Drawer.Navigator
            drawerContent={(props) => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
                drawerContentContainerStyle: {
                    height: WINDOW_DEVICE_HEIGHT,
                },
                drawerActiveTintColor: 'white',
                drawerActiveBackgroundColor: 'transparent',
            }}>
            <Drawer.Screen name="Profile" component={StackNavigator} />
        </Drawer.Navigator>
    );
}

export default MainDrawer;
