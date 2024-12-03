import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import { Switch } from 'react-native';
import { Formik } from 'formik';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import CustomTimePicker from '@root/components/TimePicker';
import { FIREALARM_ENTRY_SCHEMA } from './helper';
import { navigationRef } from '@root/navigation/RootNavigation';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { FloatingAction } from 'react-native-floating-action';
import {
    actionsButtonIcons,
    getUserLocation,
} from '../../../../utils/common-methods';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';
import { store } from '../../../../store';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType_Multi_Step } from '../../../../store/multistep/actions-types';

const FireAlarm = (props: any) => {
    const netInfo = useNetInfo();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();

    const [notified, setNotified] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({});
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const [faultOnPanel, setFaultOnPanel] = useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { colors }: any = useTheme();
    const toggleRememberPin = (value) => {
        setNotified(value);
    };
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const setFaultOnPanelToggle = (value) => {
        setFaultOnPanel(value);
    };
    const {
        getfireAlarm,
        openModal,
        getShiftsReportsEntrieAttachments,
        setMultiStep,
        putOfflineFireAlarmEntry,
    } = useActions();
    const { fireAlarmData, loading }: any = useTypedSelector(
        (state) => state.fireAlarmData,
    );
    const { multiStepdata, multiStepLoading }: any = useTypedSelector(
        (state) => state.multiStepdata,
    );
    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const {
        route: { params },
        navigation,
    } = props;

    useEffect(() => {
        if (params.trigger === 1 && Object.keys(fireAlarmData).length > 0) {
            set_MultiStep();
        }
    }, [fireAlarmData]);

    useEffect(() => {
        if (params.trigger === 1) {
            setFaultOnPanel(fireAlarmData.faultOnPanel);
            setNotified(fireAlarmData.notifiedByMonitoring);
        }
    }, [fireAlarmData.faultOnPanel]);

    useEffect(() => {
        getAttachments();
    }, []);

    useEffect(() => {
        if (params.type) {
            store.dispatch({
                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
            });
        } else
            store.dispatch({
                type: ActionType.GET_ATTACHMENT_PATROL_ENTRY_FAILED,
            });
    }, []);

    useEffect(() => {
        getUserLoc();
    }, []);

    useEffect(() => {
        if (!params.editable) {
            store.dispatch({
                type: ActionType_Multi_Step.MULTISTEP_INIT,
            });
        }
    }, []);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
        if (params.editable === true) {
            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
            getfireAlarm({ id: params.item.shiftReportID });
        }
    };

    const getAttachments = async () => {
        if (params.editable === true) {
            await getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
        }
    };
    const set_MultiStep = async () => {
        await setMultiStep('Fire Alarm', {
            reportTime: fireAlarmData.reportTime,
            fireAlarmLocation: fireAlarmData.fireAlarmLocation,
            buildingNumber: fireAlarmData.buildingNumber,
            description: fireAlarmData.description,
            causeOfAlarm: fireAlarmData.causeOfAlarm,
            notifiedByMonitoring: notified,
            faultOnPanel: faultOnPanel,
            fireBrigadeDetails: fireAlarmData.fireBrigadeDetails,
            fireBrigadeAttended: fireAlarmData.fireBrigadeAttended,
            isolatedByFireBrigade: fireAlarmData.isolatedByFireBrigade,
            serviceRequired: fireAlarmData.serviceRequired,
        });
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {loading ||
                shiftReportsEntriesAttachmentsLoading ||
                createReportEntryLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={false}
                        showsVerticalScrollIndicator={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={FIREALARM_ENTRY_SCHEMA}
                                    enableReinitialize={true}
                                    initialValues={{
                                        reportTime: multiStepdata.reportTime,
                                        fireAlarmLocation:
                                            multiStepdata.fireAlarmLocation,
                                        buildingNumber:
                                            multiStepdata.buildingNumber,
                                        description: multiStepdata.description,
                                        causeOfAlarm:
                                            multiStepdata.causeOfAlarm,
                                        notifiedByMonitoring:
                                            multiStepdata.notifiedByMonitoring,
                                        faultOnPanel:
                                            multiStepdata.faultOnPanel,
                                    }}
                                    onSubmit={async (values) => {
                                        const da = {
                                            reportTime: values.reportTime,
                                            fireAlarmLocation:
                                                values.fireAlarmLocation,
                                            buildingNumber:
                                                values.buildingNumber,
                                            description: values.description,
                                            causeOfAlarm: values.causeOfAlarm,
                                            notifiedByMonitoring: notified,
                                            faultOnPanel: faultOnPanel,
                                            fireBrigadeDetails:
                                                multiStepdata.fireBrigadeDetails,
                                            fireBrigadeAttended:
                                                multiStepdata.fireBrigadeAttended,
                                            isolatedByFireBrigade:
                                                multiStepdata.isolatedByFireBrigade,
                                            serviceRequired:
                                                multiStepdata.serviceRequired,
                                        };

                                        await setMultiStep('Fire Alarm', da);
                                        navigationRef.current.navigate(
                                            navigationStrings.FIRE_ALARM_1,
                                            {
                                                type: params.editable,
                                                shiftReportID:
                                                    params.editable === true
                                                        ? params.item
                                                              .shiftReportID
                                                        : '',
                                            },
                                        );
                                    }}>
                                    {({
                                        setFieldValue,
                                        handleSubmit,
                                        errors,
                                        values,
                                    }) => (
                                        <View>
                                            <HorizontalView>
                                                <FormField>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setVisibleTimer(
                                                                true,
                                                            );
                                                        }}>
                                                        <TextField
                                                            accessibilityLabel="Time of Alarm:"
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            editable={false}
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                            value={
                                                                values.reportTime &&
                                                                values.reportTime
                                                            }
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            error={
                                                                errors
                                                                    ? errors.reportTime
                                                                    : null
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Location:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'fireAlarmLocation',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.fireAlarmLocation
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.fireAlarmLocation
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <TextFieldView>
                                                <TextField
                                                    accessibilityLabel="Building:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'buildingNumber',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    value={
                                                        values.buildingNumber
                                                    }
                                                    error={
                                                        errors
                                                            ? errors.buildingNumber
                                                            : null
                                                    }
                                                />
                                            </TextFieldView>

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Notified by Monitoring
                                                        Company:
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        toggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={notified}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            <TextField
                                                accessibilityLabel="Description:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'description',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={values.description}
                                                error={
                                                    errors
                                                        ? errors.description
                                                        : null
                                                }
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Fault on panel?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        setFaultOnPanelToggle
                                                    }
                                                    renderActiveText={false}
                                                    value={faultOnPanel}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            <TextField
                                                accessibilityLabel="Cause of Alarm:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'causeOfAlarm',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={values.causeOfAlarm}
                                                error={
                                                    errors
                                                        ? errors.causeOfAlarm
                                                        : null
                                                }
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />

                                            {/* {params && params.editable && (
                                                <ImageWrapper>
                                                    {shiftReportsEntriesAttachments.length >
                                                    0 ? (
                                                        shiftReportsEntriesAttachments.map(
                                                            (
                                                                attachment: any,
                                                            ) => {
                                                                return (
                                                                    <TouchableOpacity
                                                                        onPress={() => {}}>
                                                                        <ImageWrapper__Image
                                                                            width={
                                                                                WINDOW_DEVICE_WIDTH -
                                                                                32
                                                                            }>
                                                                            <ImageModal
                                                                                style={{
                                                                                    width:
                                                                                        (WINDOW_DEVICE_WIDTH -
                                                                                            32) /
                                                                                        6,
                                                                                    height:
                                                                                        (WINDOW_DEVICE_WIDTH -
                                                                                            32) /
                                                                                        6,
                                                                                    borderRadius: 4,
                                                                                }}
                                                                                resizeMode="cover"
                                                                                imageBackgroundColor="#000000"
                                                                                source={{
                                                                                    uri:
                                                                                        attachment.fileDetail !=
                                                                                        null
                                                                                            ? 'data:image/png;base64,' +
                                                                                              attachment
                                                                                                  .fileDetail
                                                                                                  .file
                                                                                            : '',
                                                                                }}
                                                                            />
                                                                        </ImageWrapper__Image>
                                                                    </TouchableOpacity>
                                                                );
                                                            },
                                                        )
                                                    ) : (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                openModal(
                                                                    'ImagePickerSheet',
                                                                    {
                                                                        height: '90%',
                                                                        shiftReportID:
                                                                            params
                                                                                .item
                                                                                .shiftReportID,
                                                                    },
                                                                )
                                                            }>
                                                            <ImageWrapper__AddImageButton
                                                                width={
                                                                    WINDOW_DEVICE_WIDTH -
                                                                    32
                                                                }>
                                                                <Image
                                                                    source={require('@root/assets/addWhite/addWhite.png')}
                                                                />
                                                            </ImageWrapper__AddImageButton>
                                                        </TouchableOpacity>
                                                    )}

                                                    {shiftReportsEntriesAttachments.length >
                                                        0 && (
                                                        <TouchableOpacity
                                                            onPress={() =>
                                                                openModal(
                                                                    'ImagePickerSheet',
                                                                    {
                                                                        height: '80%',
                                                                        shiftReportID:
                                                                            params
                                                                                .item
                                                                                .shiftReportID,
                                                                    },
                                                                )
                                                            }>
                                                            <ImageWrapper__AddImageButton
                                                                width={
                                                                    WINDOW_DEVICE_WIDTH -
                                                                    32
                                                                }>
                                                                <Image
                                                                    source={require('@root/assets/addWhite/addWhite.png')}
                                                                />
                                                            </ImageWrapper__AddImageButton>
                                                        </TouchableOpacity>
                                                    )}
                                                </ImageWrapper>
                                            )} */}

                                            <ButtonWrapper>
                                                <ButtonSecondary
                                                    btnText={'Next'}
                                                    onPress={() =>
                                                        handleSubmit()
                                                    }
                                                    icon={next}
                                                    isIconLeft={false}
                                                    fontSize={fontSizeState}
                                                />
                                            </ButtonWrapper>

                                            <CustomTimePicker
                                                showDateTimePicker={
                                                    visibleTimer
                                                }
                                                time={
                                                    params.editable === true
                                                        ? params.item
                                                              .reportDateTime
                                                        : ''
                                                }
                                                handlePickerData={(
                                                    date: any,
                                                ) => {
                                                    setVisibleTimer(false);
                                                    let hours =
                                                        new Date(date)
                                                            .getHours()
                                                            .toString()
                                                            .length === 1
                                                            ? '0' +
                                                              new Date(
                                                                  date,
                                                              ).getHours()
                                                            : new Date(
                                                                  date,
                                                              ).getHours();
                                                    let minute =
                                                        new Date(date)
                                                            .getMinutes()
                                                            .toString()
                                                            .length === 1
                                                            ? '0' +
                                                              new Date(
                                                                  date,
                                                              ).getMinutes()
                                                            : new Date(
                                                                  date,
                                                              ).getMinutes();

                                                    setFieldValue(
                                                        'reportTime',
                                                        hours + ':' + minute,
                                                    );
                                                }}
                                                setDateTimePicker={
                                                    setVisibleTimer
                                                }
                                            />
                                        </View>
                                    )}
                                </Formik>
                            </MainWrapper>
                        </MainParentWrapper>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {params && params.editable && (
                <FloatingAction
                    actions={actionsButtonIcons}
                    onPressItem={(name) => {
                        navigation.navigate(navigationStrings.QRSCAN);
                    }}
                    overlayColor={'rgba(255, 255, 255, 0)'}
                    color={'#16a086'}
                />
            )}

            {!params.editable &&
                navigation.setOptions({
                    headerRight: () => null,
                })}
        </BackgroundGlobal>
    );
};

export default withTheme(FireAlarm);

type FontSizeProps = {
    fontSize: number;
};

type ImageWrapper__ImageProps = {
    width: number;
};

const ImageWrapper__Image = styled.View<ImageWrapper__ImageProps>`
    width: ${({ width }: any) => width / 6}px;
    height: ${({ width }: any) => width / 6}px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 4px 4px 4px 4px;
`;

const ImageWrapper__AddImageButton = styled.View<ImageWrapper__ImageProps>`
    background-color: ${({ theme }: any) => theme.colors.primary};
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-top: 5px;
    margin-left: 4px;
    width: ${({ width }: any) => width / 6}px;
    height: ${({ width }: any) => width / 6}px;
`;

const ImageWrapper = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    background-color: ${({ theme }: any) => theme.colors.secondary};
    margin-top: 20px;
    padding: 8px;
    justify-content: flex-start;
`;

type TextColorProps = {
    textColor: string;
};

const TextWrapper = styled.Text<TextColorProps, FontSizeProps>`
    color: ${({ textColor }: any) => textColor};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
`;

const TextImageWrapper = styled.View`
    display: flex;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 2px;
    flex-direction: row;
    align-items: center;
    align-content: center;
`;

const SwitchHorizontalWrapper = styled.View`
    flex-direction: row;
    margin-top: 40px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
`;

const TextFieldView = styled.View`
    width: 45%;
`;
const FormField = styled.View`
    width: 50%;
    padding: 0 15px;
`;

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 80px;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
    margin: 5px -15px;
`;

function openModal(
    arg0: string,
    arg1: { height: string; shiftReportID: any },
): void {
    throw new Error('Function not implemented.');
}
