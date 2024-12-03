import React from "react";
import { ImageBackground } from 'react-native';
import { withTheme } from 'styled-components';
import { returnThemeTypeData } from '../utils/theme-type';

const BackgroundGlobal = (props: any) => {
    return (
        <ImageBackground
            resizeMode={'stretch'} // or cover
            style={{ flex: 1 }} // must be passed from the parent, the number may vary depending upon your screen size
            source={returnThemeTypeData({
                screenName: 'login',
                lightKey: 'loginBackgroundLight',
                darkKey: 'loginBackground',
                appearance: props.theme.type,
            })}>
            {props.children}
        </ImageBackground>
    );
};

// @ts-ignore
export default withTheme(BackgroundGlobal);
