import PropTypes from 'prop-types';
import React from 'react';
import { Image } from 'react-native';
import {
    homeIcon,
    actionIcon,
    messageIcon,
    rosterIcon,
    shiftIcon,
} from '@root/assets';
import navigationStrings from '@root/navigation/navigationStrings';

const tabIcon = {
    [navigationStrings.TAB_BAR_HOME]: homeIcon,
    [navigationStrings.TAB_BAR_ROSTERS]: rosterIcon,
    [navigationStrings.TAB_BAR_SHIFTS]: shiftIcon,
    [navigationStrings.TAB_BAR_ACTIONS]: actionIcon,
    [navigationStrings.TAB_BAR_MESSAGES]: messageIcon,
};

type TabBarIconProps = {
    color: string;
    routeName: string;
};

export const TabBarIcon: React.FC<TabBarIconProps> = ({ color, routeName }) => {
    return (
        <Image
            accessibilityIgnoresInvertColors
            source={tabIcon[routeName]}
            style={{ tintColor: color }}
        />
    );
};

TabBarIcon.propTypes = {
    color: PropTypes.string.isRequired,
    routeName: PropTypes.string.isRequired,
};
