import React, { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import CalendarPicker from 'react-native-calendar-picker';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import HomeRosters from '@root/components/rosters/HomeRosters';
import { MainParentWrapper, NotFound } from '../../../utils/globalStyle';
import { apiUri } from '@root/service/apiEndPoints';
import { format } from 'date-fns';
import { useActions } from '@root/hooks/useActions';
import AppLoader from '../../../utils/AppLoader';
import { useNetInfo } from '@react-native-community/netinfo';

// @ts-ignore
export function RosterCalender(props: any) {
    const isFocused = useIsFocused();
    const { getRosters } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { rosterData, roasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );
    const { modeState } = useTypedSelector((state) => state.mode);
    const netInfo = useNetInfo();

    useEffect(() => {
        if (isFocused) {
            if (netInfo.isInternetReachable === true) {
                getRosters({
                    uri: `${apiUri.shifts.shiftByDate}`,
                    val: format(new Date(), 'y/L/d'),
                    orgID: orgID,
                    type: 'date',
                });
            }
        }
    }, [isFocused]);

    // @ts-ignore
    const onDateChange = (date) => {
        const newDate = new Date(date);
        if (netInfo.isInternetReachable === true) {
            getRosters({
                uri: `${apiUri.shifts.shiftByDate}`,
                val: format(newDate, 'y/L/d'),
                orgID: orgID,
                type: 'date',
            });
        }
    };

    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                {roasterLoading ? (
                    <AppLoader />
                ) : (
                    <View
                        style={{
                            marginTop: 16,
                            marginHorizontal: 8,
                            marginBottom: 280,
                        }}>
                        <CalendarPicker
                            style={{ backgroundColor: '#19212C' }}
                            startFromMonday={true}
                            allowRangeSelection={false}
                            weekdays={[
                                'Mon',
                                'Tue',
                                'Wed',
                                'Thurs',
                                'Fri',
                                'Sat',
                                'Sun',
                            ]}
                            months={[
                                'January',
                                'Febraury',
                                'March',
                                'April',
                                'May',
                                'June',
                                'July',
                                'August',
                                'September',
                                'October',
                                'November',
                                'December',
                            ]}
                            previousTitle="Previous"
                            nextTitle="Next"
                            todayBackgroundColor="#808080"
                            scrollable={false}
                            selectedDayColor="#7300e6"
                            selectedDayTextColor="#000000"
                            scaleFactor={375}
                            dayShape="circle"
                            textStyle={{
                                color:
                                    modeState === true ? '#FFFFFF' : '#000000',
                            }}
                            onDateChange={onDateChange}
                        />

                        {rosterData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={false}
                                data={rosterData}
                                renderItem={({ item }) => {
                                    return (
                                        <HomeRosters
                                            fontSize={fontSizeState}
                                            item={item}
                                            navigation={props.navigation}
                                            type={'modal'}
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <NotFound>No Rosters Data Found</NotFound>
                        )}
                    </View>
                )}
            </BackgroundGlobal>
        </MainParentWrapper>
    );
}
