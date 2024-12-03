import React, { useEffect, useState } from 'react';
import { Alert, FlatList, ScrollView, TouchableOpacity } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import {
    MainParentWrapper,
    MainWrapper,
    NotFound,
} from '@root/utils/globalStyle';
import BackgroundGlobal from '../BackgroundGlobal';
import HomeRosters from '@root/components/rosters/HomeRosters';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import navigationStrings from '@root/navigation/navigationStrings';
import { useNetInfo } from '@react-native-community/netinfo';
import { NetworkStateView } from '../NetworkStateView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoader from '../../utils/AppLoader';
import { getUserLocation } from '../../utils/common-methods';
import { NoInternetView } from '../NoInternetView';

type ShiftProps = {
    navigation: any;
};

const NoCurrentShift: React.FC<ShiftProps> = ({ navigation }) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { getUpcomingRosters, closeModal, getActiveShift } = useActions();
    const { modalProps } = useTypedSelector((state) => state.modalSheet);
    const [scannedData, setScannedData] = useState();
    const [location, setLocation] = useState({});
    const { upcomingRosterData, upcomingRoasterLoading } = useTypedSelector(
        (state) => state.rostersByDays,
    );
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const netInfo = useNetInfo();

    AsyncStorage.getItem('SCANNED_ITEM').then((asyncStorageRes) => {
        // @ts-ignore
        setScannedData(asyncStorageRes);
    });
    useEffect(() => {
        if (modalProps !== null) {
            closeModal();
        }
        if (
            netInfo.isInternetReachable === null ||
            netInfo.isInternetReachable === true
        ) {
            getUpcomingRosters({ orgID: orgID });
        }
    }, []);

    useEffect(() => {
        getLoc();
    }, []);

    useEffect(() => {
        if (Object.keys(location).length > 0) {
            if (location.coords.accuracy > 0 && location.coords.accuracy < 50) {
            } else {
                alert('Please Enable Precise Location');
            }
        }
    }, [location]);

    const getLoc = async () => {
        const uLocationData: any = await getUserLocation();
        setLocation(uLocationData);
        if (
            uLocationData.coords.accuracy > 0 &&
            uLocationData.coords.accuracy < 50
        ) {
            getLoc();
        }
    };
    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                {upcomingRoasterLoading && <AppLoader />}
                <ScrollView>
                    <MainWrapper>
                        <ParentBoth>
                            <AvailableToStartText fontSize={fontSizeState}>
                                Available to start
                            </AvailableToStartText>
                            {/* <InfoImage
                                source={require('@root/assets/info/info.png')} /> */}
                        </ParentBoth>

                        <PressToStartText fontSize={fontSizeState}>
                            Press on the shift to start
                        </PressToStartText>
                        {upcomingRosterData.length > 0 ? (
                            <FlatList
                                nestedScrollEnabled={true}
                                data={upcomingRosterData}
                                renderItem={({ item }) => {
                                    return (
                                        <HomeRosters
                                            item={item}
                                            showButton={true}
                                            height={'85%'}
                                            navigation={navigation}
                                            fontSize={fontSizeState}
                                        />
                                    );
                                }}
                            />
                        ) : (
                            <NotFound>No Shift Found</NotFound>
                        )}

                        <BtnWrapper>
                            <TouchableOpacity
                                onPress={() => {
                                    if (Object.keys(location).length > 0) {
                                        if (
                                            location.coords.accuracy > 0 &&
                                            location.coords.accuracy < 50
                                        ) {
                                            navigation.navigate(
                                                navigationStrings.SHIFT_CODE,
                                            );
                                        } else
                                            alert(
                                                'Please Enable Precise Location',
                                            );
                                    }
                                }}>
                                <StartManualShiftBtn>
                                    <MyShiftText fontSize={fontSizeState}>
                                        Start Manual Shift
                                    </MyShiftText>
                                </StartManualShiftBtn>
                            </TouchableOpacity>
                        </BtnWrapper>
                    </MainWrapper>
                </ScrollView>
            </BackgroundGlobal>

            {netInfo.isInternetReachable === true && scannedData != null ? (
                <NetworkStateView />
            ) : (
                netInfo.isInternetReachable === false && <NoInternetView />
            )}
        </MainParentWrapper>
    );
};

// @ts-ignore
export default withTheme(NoCurrentShift);

type FontSizeProps = {
    fontSize: number;
};

const MyShiftText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    color: ${({ theme }: any) => theme.colors.text};
`;

const StartManualShiftBtn = styled.View`
    margin-top: 30px;
    justify-content: center;
    align-items: center;
    background-color: #d93f3c;
    height: 60px;
    border-radius: 8px;
`;

const BtnWrapper = styled.View`
    margin-top: 40px;
`;

const AvailableToStartText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;
const PressToStartText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.textGray};
    margin-top: 8px;
    margin-bottom: 8px;
`;

const ParentBoth = styled.View`
    flex-direction: row;
    margin-top: 32px;
`;

const InfoImage = styled.Image`
    height: 19px;
    width: 19px;
    position: relative;
    top: -8px;
    left: 8px;
`;
