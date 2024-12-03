import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import MainDrawer from '@root/navigation/Drawer';
import { navigationRef } from '@root/navigation/RootNavigation';
type RouteProps = {
    scheme: any;
};

const Routes: React.FC<RouteProps> = ({ scheme }) => {
    return (
        <NavigationContainer ref={navigationRef} theme={scheme}>
            <MainDrawer />
        </NavigationContainer>
    );
};
export default Routes;
