import React, { useMemo } from 'react';
import { BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';

const CustomBackdrop = ({ animatedIndex, style }: BottomSheetBackdropProps) => {
    // animated variables
    const animatedOpacity = useMemo(
        () =>
            interpolate(animatedIndex, {
                inputRange: [0, 1],
                outputRange: [0, 0.4],
                extrapolate: Extrapolate.CLAMP,
            }),
        [animatedIndex],
    );

    // styles
    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: '#ffffff',
                opacity: animatedOpacity,
            },
        ],
        [style, animatedOpacity],
    );

    return <Animated.View style={containerStyle} />;
};

export default CustomBackdrop;
