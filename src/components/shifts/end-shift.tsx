import React, { useEffect, useState } from 'react';
import BackgroundGlobal from '../BackgroundGlobal';
import TextField from '@root/components/TextField';
import { MainWrapper } from '../../utils/globalStyle';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import styled from 'styled-components/native';
import PrimaryButton from 'components/Button';
import { useActions } from '../../hooks/useActions';
import { getUserLocation } from '../../utils/common-methods';
import { Formik } from 'formik';
import { Platform, View } from 'react-native';
import { NetworkInfo } from 'react-native-network-info';
import { navigationRef } from '@root/navigation/RootNavigation';
import AppLoader from '../../utils/AppLoader';
import DeviceInfo from 'react-native-device-info';
import { format } from 'date-fns';
const EndShift = (props: any) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    const { endShiftAction, locationLog } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const { endShiftLoading } = useTypedSelector((state) => state.shiftReports);
    let ip = '';
    const [count, setCount] = useState(0);
    const [comment, setComment] = useState('');
    const { locationLogData, locationLogLoading } = useTypedSelector(
        (state) => state.locationLogData,
    );
    const { activeShift } = useTypedSelector((state) => state.activeShift);
    NetworkInfo.getIPAddress().then((ipAddress: any) => {
        ip = ipAddress;
    });

    useEffect(() => {
        getLoc();
    }, [count]);

    const getLoc = async () => {
        const uLocationData: any = await getUserLocation();

        if (count >= 1 && count <= 8) {
            await locationLog({
                geoLocation: {
                    latitude: uLocationData.coords.latitude,
                    longitude: uLocationData.coords.longitude,
                },
                rosterID: activeShift.shiftID.toString(),
                deviceType: Platform.OS,
                deviceID: DeviceInfo.getModel(),
                ipAddress: ip,
                comment: 'Roster Shift',
            })
                .then((res) => {
                    setCount(count + 1);
                })
                .catch((e) => {});
        } else if (count === 9) {
            await endShiftAction({
                orgID: orgID,
                item: {
                    shiftID: activeShift.shiftID,
                    endShiftComment: comment,
                    geoLocation: {
                        latitude: uLocationData.coords.latitude,
                        longitude: uLocationData.coords.longitude,
                    },
                },
            });
            navigationRef.current.goBack();
        }
    };

    return (
        <BackgroundGlobal>
            {endShiftLoading || (locationLogLoading && <AppLoader />)}
            <MainWrapper>
                <Formik
                    initialValues={{
                        endShiftComment: '',
                    }}
                    enableReinitialize={true}
                    onSubmit={async (values) => {
                        try {
                            const uLocationData: any = await getUserLocation();
                            setComment(values.endShiftComment);
                            setCount(count + 1);
                        } catch (e) {
                            alert('Please enable the location from settings!');
                        }
                    }}>
                    {({ setFieldValue, handleSubmit, errors, values }) => (
                        <View>
                            <TextField
                                accessibilityLabel="Comment"
                                onChangeText={(value: any) => {
                                    setFieldValue('endShiftComment', value);
                                }}
                                keyboardType={'default'}
                                autoCapitalize={'none'}
                                multiline={true}
                                value={values.endShiftComment}
                                fontSize={fontSizeState}
                            />

                            <ButtonWrapper>
                                <PrimaryButton
                                    onPress={() => {
                                        handleSubmit();
                                    }}
                                    btnText={'End Shift'}
                                    fontSize={fontSizeState}
                                />
                            </ButtonWrapper>
                        </View>
                    )}
                </Formik>
            </MainWrapper>
        </BackgroundGlobal>
    );
};
export default EndShift;

const ButtonWrapper = styled.View`
    flex: 1;
    margin-top: 25px;
`;
