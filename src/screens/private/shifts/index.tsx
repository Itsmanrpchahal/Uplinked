import React, { useEffect } from 'react';
// @ts-ignore
import { useActions } from '@root/hooks/useActions';
import { useIsFocused } from '@react-navigation/native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import CaseActiveShift from '@root/components/shifts/case-active-shift';
import NoCurrentShift from '@root/components/shifts/no-current-shift';
import AppLoader from '../../../utils/AppLoader';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useNetInfo } from '@react-native-community/netinfo';
import { NoInternetView } from '../../../components/NoInternetView';

export const Shifts = (props: any) => {
    const { getActiveShift, locationLog } = useActions();
    const { locationLogData, locationLogLoading } = useTypedSelector(
        (state) => state.locationLogData,
    );
    const netInfo = useNetInfo();
    const isFocused = useIsFocused();
    const { activeShift, activeLoading, isActiveShift } = useTypedSelector(
        (state) => state.activeShift,
    );

    useEffect(() => {
        if (isFocused) {
            if (
                netInfo.isInternetReachable === null ||
                netInfo.isInternetReachable === true
            ) {
                getActiveShift({ orgID: 1 });
            } else {
                netInfo.isInternetReachable === false && <NoInternetView /> 
            }
        }
        }, [isFocused]);

    return activeLoading ? (
        <BackgroundGlobal>
            <AppLoader />
        </BackgroundGlobal>
    ) : isActiveShift ? (
        <CaseActiveShift item={activeShift} />
    ) : (
        <NoCurrentShift navigation={props.navigation} />
    );
   
};
