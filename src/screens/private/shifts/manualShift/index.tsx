import React, { useEffect, useState } from 'react';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
// @ts-ignore
import styled from 'styled-components/native';
import { Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import TextField from '@root/components/TextField';
import { ManualShiftInterface } from 'interfaces/manualShiftInterface';
import { Formik } from 'formik';
import { MANUAL_SHIFT_SCHEMA } from '@root/screens/private/shifts/manualShift/helpers';
import CustomTimePicker from '@root/components/TimePicker';
import { format } from 'date-fns';
import { useActions } from '@root/hooks/useActions';
import { getUserLocation } from '@root/utils/common-methods';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import AppLoader from '../../../../utils/AppLoader';
import DeviceInfo from 'react-native-device-info';
import { NetworkInfo } from 'react-native-network-info';
import { StackActions } from '@react-navigation/native';

// @ts-ignore
const StartManualShift = (props: any) => {
    const {
        route: { params },
        navigation,
    } = props;
    const { startShiftAction, getShiftSites, locationLog } = useActions();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [visibleTimerEnd, setVisibleTimerEnd] = useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { siteListData, loading_shiftSite } = useTypedSelector(
        (state) => state.siteListData,
    );
    const { locationLogData, locationLogLoading } = useTypedSelector(
        (state) => state.locationLogData,
    );
    const [type, setType] = useState(1);
    const [stime, setSTime] = useState<any>(new Date());
    const [etime, setETime] = useState<any>(new Date());
    const [count, setCount] = useState(0);
    const [reason, setReason] = useState('');
    let ip = '';
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const setStartTime = (date: any) => {
        setSTime(date);
    };

    NetworkInfo.getIPAddress().then((ipAddress: any) => {
        ip = ipAddress;
    });
    const setEndTime = (date: any) => {
        setETime(date);
    };

    useEffect(() => {
        getLoc();
    }, [count]);

    // useEffect(() => {
    //     getLoc();
    // }, [count, locationLogData]);

    const getLoc = async () => {
        const uLocationData: any = await getUserLocation();
        if (count >= 1 && count <= 8) {
            await locationLog({
                geoLocation: {
                    latitude: uLocationData.coords.latitude,
                    longitude: uLocationData.coords.longitude,
                },
                rosterID: params.item.shiftCode,
                deviceType: Platform.OS,
                deviceID: DeviceInfo.getModel(),
                ipAddress: ip,
                comment: 'Manual Shift',
            })
                .then((res) => {
                    setCount(count + 1);
                })
                .catch((e) => {});
        } else if (count === 9) {
            await startShiftAction({
                type: 'manual',
                orgID: orgID,
                startManual: {
                    startTime: format(new Date(stime), 'HH:mm'),
                    endTime: format(new Date(etime), 'HH:mm'),
                    reason: reason,
                    shiftCode: params.item.shiftCode,
                    geoLocation: {
                        latitude: uLocationData.coords.latitude,
                        longitude: uLocationData.coords.longitude,
                    },
                },
            });
            navigation.dispatch(StackActions.popToTop());
        }
    };

    const handleStartManualShift = async (values: ManualShiftInterface) => {
        try {
            const uLocationData: any = await getUserLocation();
            setCount(count + 1);
        } catch (e) {
            alert('Please enable the location from settings!');
        }
    };

    // @ts-ignore
    return (
        <BackgroundGlobal>
            {loading_shiftSite || (locationLogLoading && <AppLoader />)}
            <ScrollView>
                <MainFrame>
                    <TitleText fontSize={fontSizeState}>
                        Start Shift without a roster
                    </TitleText>
                    <Formik
                        validationSchema={MANUAL_SHIFT_SCHEMA}
                        initialValues={{
                            description: '',
                        }}
                        onSubmit={(values) => {
                            handleStartManualShift(values);
                        }}>
                        {({ setFieldValue, handleSubmit, errors }) => (
                            <View>
                                <TextFieldView>
                                    <TextTV fontSize={fontSizeState}>
                                        At: {params.item.siteName}
                                    </TextTV>
                                </TextFieldView>

                                <TextField
                                    accessibilityLabel="You are about to start a shift that has not been rostered. Please add some details"
                                    onChangeText={(value: any) => {
                                        setReason(value);
                                        setFieldValue('description', value);
                                    }}
                                    autoCapitalize={'none'}
                                    fontSize={fontSizeState}
                                    error={errors ? errors.description : null}
                                />

                                <ShiftText fontSize={fontSizeState}>
                                    The Shift
                                </ShiftText>

                                <TimerView
                                    style={{
                                        marginTop: 16,
                                        alignItems: 'center',
                                    }}>
                                    <View style={{ alignItems: 'center' }}>
                                        <TextTV fontSize={fontSizeState}>
                                            Starts At
                                        </TextTV>

                                        <TouchableOpacity
                                            onPress={() => {
                                                {
                                                    setVisibleTimer(true),
                                                        setType(1);
                                                }
                                            }}>
                                            <TimeWrapper>
                                                <TimeText
                                                    fontSize={fontSizeState}>
                                                    {format(
                                                        new Date(stime),
                                                        'HH:mm',
                                                    )}
                                                </TimeText>
                                            </TimeWrapper>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ alignItems: 'center' }}>
                                        <TextTV fontSize={fontSizeState}>
                                            Ends At
                                        </TextTV>
                                        <TouchableOpacity
                                            onPress={() => {
                                                {
                                                    setVisibleTimerEnd(true),
                                                        setType(2);
                                                }
                                            }}>
                                            <TimeWrapper>
                                                <TimeText
                                                    fontSize={fontSizeState}>
                                                    {format(
                                                        new Date(etime),
                                                        'HH:mm',
                                                    )}
                                                </TimeText>
                                            </TimeWrapper>
                                        </TouchableOpacity>
                                    </View>
                                </TimerView>

                                {type == 1 ? (
                                    <CustomTimePicker
                                        showDateTimePicker={visibleTimer}
                                        time={''}
                                        handlePickerData={(date: any) =>
                                            setStartTime(date)
                                        }
                                        setDateTimePicker={setVisibleTimer}
                                    />
                                ) : (
                                    <CustomTimePicker
                                        showDateTimePicker={visibleTimerEnd}
                                        time={''}
                                        handlePickerData={(date: any) =>
                                            setEndTime(date)
                                        }
                                        setDateTimePicker={setVisibleTimerEnd}
                                    />
                                )}

                                <MainFrame>
                                    <TouchableOpacity
                                        onPress={() => {
                                            handleSubmit();
                                        }}>
                                        <View style={{ alignItems: 'center' }}>
                                            <StartBtnImage
                                                source={require('@root/assets/startshiftbtn/startshiftbtn.png')}
                                            />
                                        </View>
                                    </TouchableOpacity>
                                </MainFrame>
                            </View>
                        )}
                    </Formik>
                </MainFrame>
            </ScrollView>
        </BackgroundGlobal>
    );
};

export default StartManualShift;

type FontSizeProps = {
    fontSize: number;
};

const ErrorWrapper = styled.View`
    margin-top: 3px;
    padding-left: 2px;
`;
const ErrorWrapper__Text = styled.Text`
    color: red;
`;

const TextTV = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const TimeText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.accentColor};
`;

const DropWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.primary};
    padding: 10px;
    border-radius: 10px;
    margin-top: 10px;
`;

const TimeWrapper = styled.View`
    background-color: ${({ theme }: any) => theme.colors.secondary};
    padding-left: 26px;
    padding-right: 20px;
    padding-top: 10px;
    padding-bottom: 10px;
    border-radius: 10px;
    margin-top: 10px;
`;

const StartBtnImage = styled.Image`
    flex-direction: row;
    align-items: center;
    display: flex;
`;

const TextFieldView = styled.View`
    width: auto;
`;

const TimerView = styled.View`
    display: flex;
    padding-left: 35px;
    padding-right: 35px;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 8px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ShiftText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 32px;
    align-items: center;
    align-self: center;
`;

const TitleText = styled.Text<FontSizeProps>`
    margin: 15px 0 15px 0;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
`;
