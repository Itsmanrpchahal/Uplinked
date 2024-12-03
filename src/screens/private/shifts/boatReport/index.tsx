import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
    Text,
} from 'react-native';
import { Switch } from 'react-native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend } from '@root/utils/assets';
import { Formik } from 'formik';
import { BOATENTRY_ENTRY_SCHEMA } from './helper';
import { useActions } from '@root/hooks/useActions';
import CustomTimePicker from '@root/components/TimePicker';
import {
    getUserLocation,
    actionsButtonIcons,
} from '../../../../utils/common-methods';
import { navigationRef } from '@root/navigation/RootNavigation';
import { FloatingAction } from 'react-native-floating-action';
import navigationStrings from '../../../../navigation/navigationStrings';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { store } from '../../../../store';
import { ActionType } from '../../../../store/shift-reports/actions-types';

const BoatReport = (props: any) => {
    const { colors }: any = useTheme();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const [location, setLocation] = useState<any>({});
    const [damage, setDamage] = useState<any>(false);
    const [description, setDescription] = useState<any>('');
    const [boatNumberOrName, setBoatNumberOrName] = useState<any>('');
    const [damageLoaction, setDamageLocation] = useState<any>('');
    const [damageDescription, setDamageDescription] = useState<any>('');
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const toggleRememberPin = (value) => {
        setDamage(value);
    };
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        setBoatReport,
        getBoatReport,
        updateBoatReport,
        openModal,
        getShiftsReportsEntrieAttachments,
        uploadAttachmentShiftReportsEntries,
        putOfflineBoatReportEntry,
    } = useActions();
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);

    const { boatReportData, loading }: any = useTypedSelector(
        (state) => state.boatReportData,
    );
    const {
        route: { params },
        navigation,
    } = props;

    const netInfo = useNetInfo();

    useEffect(() => {
        if (params.editable) {
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
        if (params.editable) {
            getBoatReport({ id: params.item.shiftReportID });

            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
            getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
        }
    }, []);

    useEffect(() => {
        if (params.editable) {
            setDamage(boatReportData.damagePresent);
            setDescription(boatReportData.description);
            setBoatNumberOrName(boatReportData.boatNumberOrName);
            setDamageLocation(boatReportData.damageLocation);
            setDamageDescription(boatReportData.damageDescription);
        }
    }, [boatReportData.damagePresent]);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {shiftReportsEntriesAttachmentsLoading ||
                loading_offlineUploadAttachmentShift ||
                createReportEntryLoading ||
                loading ? (
                    <AppLoader />
                ) : (
                    <ScrollView nestedScrollEnabled={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={BOATENTRY_ENTRY_SCHEMA}
                                    initialValues={{
                                        reportTime: time,
                                        description: description,
                                        geoLocation: {
                                            latitude:
                                                location.coords &&
                                                location.coords.latitude,
                                            longitude:
                                                location.coords &&
                                                location.coords.longitude,
                                        },
                                        boatNumberOrName: boatNumberOrName,
                                        damageLocation: damageLoaction,
                                        damageDescription: damageDescription,
                                        damagePresent: damage,
                                        shiftID:
                                            activeShift && activeShift.shiftID,
                                    }}
                                    enableReinitialize={true}
                                    onSubmit={async (values) => {
                                        const newValue = { ...values };
                                        if (params.editable) {
                                            delete newValue.shiftID;
                                            newValue.shiftID = values.shiftID;
                                        }
                                        if (
                                            netInfo.isInternetReachable === true
                                        ) {
                                            if (params.editable === false) {
                                                await setBoatReport({
                                                    reportTime:
                                                        values.reportTime,
                                                    description:
                                                        values.description,
                                                    geoLocation: {
                                                        latitude:
                                                            values.geoLocation
                                                                .latitude,
                                                        longitude:
                                                            values.geoLocation
                                                                .latitude,
                                                    },
                                                    boatNumberOrName:
                                                        values.boatNumberOrName,
                                                    damagePresent:
                                                        values.damagePresent,
                                                    damageLocation:
                                                        values.damageLocation,
                                                    damageDescription:
                                                        values.damageDescription,
                                                    shiftID: values.shiftID,
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
                                                await updateBoatReport({
                                                    reportTime:
                                                        values.reportTime,
                                                    description:
                                                        values.description,
                                                    geoLocation: {
                                                        latitude:
                                                            values.geoLocation
                                                                .latitude,
                                                        longitude:
                                                            values.geoLocation
                                                                .latitude,
                                                    },
                                                    boatNumberOrName:
                                                        values.boatNumberOrName,
                                                    damagePresent:
                                                        values.damagePresent,
                                                    damageLocation:
                                                        values.damageLocation,
                                                    damageDescription:
                                                        values.damageDescription,
                                                    shiftReportID:
                                                        params.item
                                                            .shiftReportID,
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            await putOfflineBoatReportEntry({
                                                reportTime: values.reportTime,
                                                description: values.description,
                                                geoLocation: {
                                                    latitude:
                                                        values.geoLocation
                                                            .latitude,
                                                    longitude:
                                                        values.geoLocation
                                                            .latitude,
                                                },
                                                boatNumberOrName:
                                                    values.boatNumberOrName,
                                                damagePresent:
                                                    values.damagePresent,
                                                damageLocation:
                                                    values.damageLocation,
                                                damageDescription:
                                                    values.damageDescription,
                                                shiftID: values.shiftID,
                                                attachment:
                                                    offlineUploadAttachmentShiftListData,
                                            });
                                            store.dispatch({
                                                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                                            });
                                            navigationRef.current.goBack();
                                        }
                                    }}>
                                    {({
                                        setFieldValue,
                                        handleSubmit,
                                        errors,
                                        values,
                                    }) => (
                                        <View>
                                            <TextFieldView>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVisibleTimer(true);
                                                    }}>
                                                    <TextField
                                                        accessibilityLabel="Time of Occurance:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'reportTime',
                                                                value,
                                                            );
                                                        }}
                                                        editable={false}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.reportTime
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.reportTime
                                                                : null
                                                        }
                                                    />
                                                </TouchableOpacity>
                                            </TextFieldView>

                                            <TextField
                                                accessibilityLabel="Comments:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'description',
                                                        value,
                                                    );
                                                    setDescription(value);
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                value={values.description}
                                                error={
                                                    errors
                                                        ? errors.description
                                                        : null
                                                }
                                            />
                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Boat Number/Name:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'boatNumberOrName',
                                                                value,
                                                            );
                                                            setBoatNumberOrName(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.boatNumberOrName
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.boatNumberOrName
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <SwitchHorizontalWrapper>
                                                    <TextImageWrapper>
                                                        <TextWrapper
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            textColor={
                                                                colors.text
                                                            }>
                                                            Damage?
                                                        </TextWrapper>
                                                    </TextImageWrapper>

                                                    <Switch
                                                        onValueChange={
                                                            toggleRememberPin
                                                        }
                                                        renderActiveText={false}
                                                        value={damage}
                                                        renderInActiveText={
                                                            false
                                                        }
                                                    />
                                                </SwitchHorizontalWrapper>
                                            </HorizontalView>

                                            {damage && (
                                                <TextField
                                                    accessibilityLabel="Damage Location:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'damageLocation',
                                                            value,
                                                        );
                                                        setDamageLocation(
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    value={
                                                        values.damageLocation
                                                    }
                                                    error={
                                                        errors
                                                            ? errors.damageLocation
                                                            : null
                                                    }
                                                />
                                            )}

                                            {damage && (
                                                <TextField
                                                    accessibilityLabel="Damage Description:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'damageDescription',
                                                            value,
                                                        );
                                                        setDamageDescription(
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    multiline={true}
                                                    value={
                                                        values.damageDescription
                                                    }
                                                    error={
                                                        errors
                                                            ? errors.damageDescription
                                                            : null
                                                    }
                                                    style={{
                                                        minHeight: 60,
                                                    }}
                                                />
                                            )}

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
                                                                        params.editable
                                                                            ? params
                                                                                  .item
                                                                                  .shiftReportID
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

                                            <ButtonWrapper>
                                                <ButtonSecondary
                                                    btnText={'Submit'}
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                    icon={arrowSend}
                                                    loading={loading}
                                                    fontSize={fontSizeState}
                                                    isIconLeft={false}
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
                                                    setTime(
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
            {!params.editable &&
                navigation.setOptions({
                    headerRight: () => null,
                })}

            {params.editable === true && (
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

export default withTheme(BoatReport);

type FontSizeProps = {
    fontSize: number;
};

type TextColorProps = {
    textColor: string;
};

type ImageWrapper__ImageProps = {
    width: number;
};

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

const ImageWrapper__Image = styled.View<ImageWrapper__ImageProps>`
    width: ${({ width }: any) => width / 6}px;
    height: ${({ width }: any) => width / 6}px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 4px 4px 4px 4px;
`;

const ImageWrapper = styled.View`
    flex-wrap: wrap;
    flex-direction: row;
    background-color: ${({ theme }: any) => theme.colors.secondary};
    margin-top: 20px;
    padding: 8px;
    justify-content: flex-start;
`;

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 80px;
`;

const TextWrapper = styled.Text<TextColorProps, FontSizeProps>`
    color: ${({ textColor }: any) => textColor};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    margin-left: 16px;
`;

const TextImageWrapper = styled.View`
    display: flex;
    padding-right: 15px;
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
    width: 50%;
`;

const TextFieldView = styled.View`
    width: 45%;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
`;
