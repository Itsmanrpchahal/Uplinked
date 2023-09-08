/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React from 'react';
import { Provider } from 'react-redux';
// @ts-ignore
import { ThemeProvider } from 'styled-components';
import { useTheme } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from 'react-query';
import { LogBox, StatusBar, useColorScheme, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@root/store/store';
import Routes from '@root/navigation/Routes';
import { navigationTheme } from '@root/theme/theme';
import { useTypedSelector } from './src/hooks/useTypedSelector';
import ModalManager from '@root/store/global_modal/manager';

const queryClient = new QueryClient();

XMLHttpRequest = GLOBAL.originalXMLHttpRequest
    ? GLOBAL.originalXMLHttpRequest
    : GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        return response;
    });
};

const AppWrapper = () => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <View style={{ flex: 1, position: 'relative' }}>
                    <App />
                </View>
            </PersistGate>
        </Provider>
    );
};

const App = () => {
    const scheme: any = useColorScheme();
    const { modeState } = useTypedSelector((state) => state.mode);
    const {colors} = useTheme()
    LogBox.ignoreAllLogs();
    StatusBar.setBackgroundColor('#28303D');
    <StatusBar barStyle="light-content" translucent={true} />;
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider
                theme={
                    modeState === true
                        ? navigationTheme.dark
                        : navigationTheme.light
                }>
                <Routes
                    scheme={
                        modeState === true
                            ? navigationTheme.dark
                            : navigationTheme.light
                    }
                />
                 <ModalManager />
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default AppWrapper;
