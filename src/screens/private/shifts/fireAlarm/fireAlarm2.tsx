import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import styled from 'styled-components/native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import { Formik } from 'formik';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Switch,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend, back, backgray } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { FIREALARM_ENTRY_SCHEMA_1 } from './helper';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import { navigationRef } from '@root/navigation/RootNavigation';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { useNetInfo } from '@react-native-community/netinfo';
import { store } from '../../../../store';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { ActionType_Multi_Step } from '../../../../store/multistep/actions-types';
import { useIsFocused } from '@react-navigation/native';

const FireAlarm2 = (props: any) => {
    const netInfo = useNetInfo();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const isFocused = useIsFocused();

    const { colors }: any = useTheme();
    const [bridge, setBridge] = useState<boolean>(false);
    const [isoLatedFire, setISOLatedFire] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({});
    const [serviceRequired, setServiceRequired] = useState<any>(false);
    const {
        setFireAlarm,
        getfireAlarm,
        updatefireAlarm,
        openModal,
        putOfflineFireAlarmEntry,
        uploadAttachmentShiftReportsEntries,
        getShiftsReportsEntrieAttachments,
        setMultiStep,
    } = useActions();
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const { fireAlarmData, loading }: any = useTypedSelector(
        (state) => state.fireAlarmData,
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
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { multiStepdata, multiStepLoading }: any = useTypedSelector(
        (state) => state.multiStepdata,
    );

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

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

    useEffect(() => {
        getUserLoc();
    }, []);

    const toggleRememberPin = (value) => {
        setBridge(value);
    };
    const ISOtoggleRememberPin = (value) => {
        setISOLatedFire(value);
    };

    const servicetoggleRememberPin = (value) => {
        setServiceRequired(value);
    };

    const {
        route: { params },
        navigation,
    } = props;

    useEffect(() => {
        setISOLatedFire(multiStepdata.isolatedByFireBrigade);
        setBridge(multiStepdata.fireBrigadeAttended);
        setServiceRequired(multiStepdata.serviceRequired);
    }, [
        multiStepdata.fireBrigadeDetails,
        multiStepdata.fireBrigadeAttended,
        multiStepdata.isolatedByFireBrigade,
        multiStepdata.serviceRequired,
    ]);

    const setBack = async (values: any) => {
        await setMultiStep('Fire Alarm', {
            reportTime: multiStepdata.reportTime,
            fireAlarmLocation: multiStepdata.fireAlarmLocation,
            buildingNumber: multiStepdata.buildingNumber,
            description: multiStepdata.description,
            causeOfAlarm: multiStepdata.causeOfAlarm,
            notifiedByMonitoring: multiStepdata.notifiedByMonitoring,
            faultOnPanel: multiStepdata.faultOnPanel,
            fireBrigadeDetails: values.fireBrigadeDetails,
            fireBrigadeAttended: bridge,
            isolatedByFireBrigade: isoLatedFire,
            serviceRequired: serviceRequired,
        });
        props.navigation.pop();
    };

    const getAttachments = async () => {
        if (params.editable === true) {
            await getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
        }
    };

    useEffect(() => {
        getAttachments();
    }, []);

    return (
        <BackgroundGlobal>
            {shiftReportsEntriesAttachmentsLoading ||
            createReportEntryLoading ? (
                <AppLoader />
            ) : (
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS == 'ios' ? 'padding' : null}>
                    <ScrollView
                        nestedScrollEnabled={false}
                        showsVerticalScrollIndicator={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={FIREALARM_ENTRY_SCHEMA_1}
                                    enableReinitialize={true}
                                    initialValues={{
                                        fireBrigadeDetails:
                                            multiStepdata.fireBrigadeDetails,
                                        fireBrigadeAttended:
                                            multiStepdata.fireBrigadeAttended,
                                        isolatedByFireBrigade:
                                            multiStepdata.isolatedByFireBrigade,
                                        serviceRequired:
                                            multiStepdata.serviceRequired,
                                        shiftID:
                                            activeShift && activeShift.shiftID,
                                    }}
                                    onSubmit={async (values) => {
                                        const newValue = { ...values };
                                        if (params.type) {
                                            delete newValue.shiftID;
                                            newValue.shiftID = values.shiftID;
                                        }
                                        if (
                                            netInfo.isInternetReachable === true
                                        ) {
                                            if (params.type === false) {
                                                await setFireAlarm({
                                                    reportTime:
                                                        multiStepdata.reportTime,
                                                    fireAlarmLocation:
                                                        multiStepdata.fireAlarmLocation,
                                                    buildingNumber:
                                                        multiStepdata.buildingNumber,
                                                    description:
                                                        multiStepdata.description,
                                                    causeOfAlarm:
                                                        multiStepdata.causeOfAlarm,
                                                    notifiedByMonitoring:
                                                        multiStepdata.notifiedByMonitoring,
                                                    faultOnPanel:
                                                        multiStepdata.faultOnPanel,
                                                    fireBrigadeDetails:
                                                        values.fireBrigadeDetails,
                                                    fireBrigadeAttended: bridge,
                                                    isolatedByFireBrigade:
                                                        isoLatedFire,
                                                    serviceRequired:
                                                        serviceRequired,
                                                    shiftID:
                                                        activeShift &&
                                                        activeShift.shiftID,
                                                    geoLocation: {
                                                        latitude:
                                                            location.coords &&
                                                            location.coords
                                                                .latitude,
                                                        longitude:
                                                            location.coords &&
                                                            location.coords
                                                                .longitude,
                                                    },
                                                }).then((res) => {
                                                    if (res.status === 200) {
                                                        offlineUploadAttachmentShiftListData.map(
                                                            (data, index) => {
                                                                data._parts[1][1] =
                                                                    res.data.reportID;
                                                                uploadAttachmentShiftReportsEntries(
                                                                    offlineUploadAttachmentShiftListData[
                                                                        index
                                                                    ],
                                                                );
                                                            },
                                                        );
                                                        store.dispatch({
                                                            type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                                                        });
                                                        navigationRef.current.goBack();
                                                    }
                                                });
                                            } else {
                                                await updatefireAlarm({
                                                    reportTime:
                                                        multiStepdata.reportTime,
                                                    fireAlarmLocation:
                                                        multiStepdata.fireAlarmLocation,
                                                    buildingNumber:
                                                        multiStepdata.buildingNumber,
                                                    description:
                                                        multiStepdata.description,
                                                    causeOfAlarm:
                                                        multiStepdata.causeOfAlarm,
                                                    notifiedByMonitoring:
                                                        multiStepdata.notifiedByMonitoring,
                                                    faultOnPanel:
                                                        multiStepdata.faultOnPanel,
                                                    fireBrigadeDetails:
                                                        values.fireBrigadeDetails,
                                                    fireBrigadeAttended: bridge,
                                                    isolatedByFireBrigade:
                                                        isoLatedFire,
                                                    serviceRequired:
                                                        serviceRequired,
                                                    shiftReportID:
                                                        params.shiftReportID,
                                                    geoLocation: {
                                                        latitude:
                                                            location.coords &&
                                                            location.coords
                                                                .latitude,
                                                        longitude:
                                                            location.coords &&
                                                            location.coords
                                                                .longitude,
                                                    },
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            putOfflineFireAlarmEntry({
                                                reportTime:
                                                    multiStepdata.reportTime,
                                                fireAlarmLocation:
                                                    multiStepdata.fireAlarmLocation,
                                                buildingNumber:
                                                    multiStepdata.buildingNumber,
                                                description:
                                                    multiStepdata.description,
                                                causeOfAlarm:
                                                    multiStepdata.causeOfAlarm,
                                                notifiedByMonitoring:
                                                    multiStepdata.notifiedByMonitoring,
                                                faultOnPanel:
                                                    multiStepdata.faultOnPanel,
                                                fireBrigadeDetails:
                                                    values.fireBrigadeDetails,
                                                fireBrigadeAttended: bridge,
                                                isolatedByFireBrigade:
                                                    isoLatedFire,
                                                serviceRequired:
                                                    serviceRequired,
                                                shiftID:
                                                    activeShift &&
                                                    activeShift.shiftID,
                                                attachment:
                                                    offlineUploadAttachmentShiftListData,
                                                geoLocation: {
                                                    latitude:
                                                        location.coords &&
                                                        location.coords
                                                            .latitude,
                                                    longitude:
                                                        location.coords &&
                                                        location.coords
                                                            .longitude,
                                                },
                                            });
                                            store.dispatch({
                                                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                                            });
                                            store.dispatch({
                                                type: ActionType_Multi_Step.MULTISTEP_INIT,
                                            });
                                            navigationRef.current.goBack();
                                        }
                                        navigationRef.current.navigate(
                                            navigationStrings.TAB_BAR_HOME,
                                        );
                                    }}>
                                    {({
                                        setFieldValue,
                                        handleSubmit,
                                        errors,
                                        values,
                                    }) => (
                                        <View>
                                            <TitleText fontSize={fontSizeState}>
                                                Complainant Information
                                            </TitleText>

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Fire Brigade attended?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        toggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={bridge}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            <TextField
                                                accessibilityLabel="Fire brigade details:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'fireBrigadeDetails',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={
                                                    values.fireBrigadeDetails
                                                }
                                                error={
                                                    errors
                                                        ? errors.fireBrigadeDetails
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
                                                        Isolated by fire
                                                        brigade?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        ISOtoggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={isoLatedFire}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Service required?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        servicetoggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={serviceRequired}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            {
                                                <ImageWrapper>
                                                    {shiftReportsEntriesAttachments.length >
                                                    0
                                                        ? shiftReportsEntriesAttachments.map(
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
                                                        : offlineUploadAttachmentShiftListData.length >
                                                          0
                                                        ? offlineUploadAttachmentShiftListData.map(
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
                                                        : null}

                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            openModal(
                                                                'ImagePickerSheet',
                                                                {
                                                                    height: '80%',
                                                                    shiftReportID:
                                                                        params.type
                                                                            ? params.shiftReportID
                                                                            : 0,
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
                                                </ImageWrapper>
                                            }

                                            {navigation.setOptions({
                                                headerLeft: () => (
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setBack(values);
                                                        }}>
                                                        <Image
                                                            style={{
                                                                margin: 10,
                                                            }}
                                                            source={
                                                                backgray
                                                            }></Image>
                                                    </TouchableOpacity>
                                                ),
                                            })}

                                            <BtnHorizontal>
                                                <ButtonSecondary
                                                    btnText={'Back'}
                                                    onPress={async () => {
                                                        setBack(values);
                                                    }}
                                                    icon={back}
                                                    isIconLeft={true}
                                                    fontSize={fontSizeState}
                                                />

                                                <ButtonSecondary
                                                    btnText={'Submit'}
                                                    onPress={() =>
                                                        handleSubmit()
                                                    }
                                                    icon={arrowSend}
                                                    isIconLeft={false}
                                                    fontSize={fontSizeState}
                                                />
                                            </BtnHorizontal>
                                        </View>
                                    )}
                                </Formik>
                            </MainWrapper>
                        </MainParentWrapper>
                    </ScrollView>
                </KeyboardAvoidingView>
            )}

            {!params.type &&
                navigation.setOptions({
                    headerRight: () => null,
                })}

            {params.type === true && (
                <FloatingAction
                    actions={actionsButtonIcons}
                    onPressItem={(name) => {
                        navigation.navigate(navigationStrings.QRSCAN);
                    }}
                    overlayColor={'rgba(255, 255, 255, 0)'}
                    color={'#16a086'}
                />
            )}
        </BackgroundGlobal>
    );
};

export default withTheme(FireAlarm2);

type FontSizeProps = {
    fontSize: number;
};

type TextColorProps = {
    textColor: string;
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

const BtnHorizontal = styled.View`
    flex-direction: row;
    margin-top: 40px;
    justify-content: space-between;
`;

const TextWrapper = styled.Text<TextColorProps, FontSizeProps>`
    color: ${({ textColor }: any) => textColor};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
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

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;
