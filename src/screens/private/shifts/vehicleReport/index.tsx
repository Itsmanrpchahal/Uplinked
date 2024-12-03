import React, { useEffect, useState } from 'react';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useTheme, withTheme } from 'styled-components';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import { Switch } from 'react-native';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend } from '@root/utils/assets';
import CustomTimePicker from '@root/components/TimePicker';
import { Formik } from 'formik';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import { VEHICLE_ENTRY_SCHEMA } from './helpers';
import {
    getUserLocation,
    actionsButtonIcons,
} from '../../../../utils/common-methods';

import { navigationRef } from '@root/navigation/RootNavigation';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import navigationStrings from '../../../../navigation/navigationStrings';
import AppLoader from '../../../../utils/AppLoader';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { store } from '../../../../store';

const VehicleReport = (props: any) => {
    const { colors }: any = useTheme();
    const [damage, setDamage] = useState<any>(false);
    const [location, setLocation] = useState<any>({});
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const [description, setDescription] = useState('');
    const [odometerStart, setOdometerStart] = useState<number>();
    const [odometerEnd, setOdometerEnd] = useState<number>();
    const [vehicleRegistrationNumber, setVehicleRegistrationNumber] =
        useState('');
    const [damageLocation, setDamageLocation] = useState('');
    const [damageDescription, setDamageDescription] = useState('');
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const toggleRememberPin = (value) => {
        setDamage(value);
    };

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

    const {
        addVehicle,
        getVehicle,
        updateVehicle,
        openModal,
        getShiftsReportsEntrieAttachments,
        uploadAttachmentShiftReportsEntries,
        putOfflineVehicleReportEntry,
    } = useActions();

    const { offlineUploadAttachmentShiftListData } = useTypedSelector(
        (state) => state.offlineUploadAttachmentShiftListData,
    );
    const { offlineVehicleReportListData, loading_offlineVehicleReport } =
        useTypedSelector((state) => state.offlineVehicleReportListData);

    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { vehicleData, loading }: any = useTypedSelector(
        (state) => state.vehicleData,
    );
    const {
        route: { params },
        navigation,
    } = props;

    useEffect(() => {
        getUserLoc();
    }, []);

    useEffect(() => {
        if (params.editable === true) {
            setDamage(vehicleData.damagePresent);
        }
    }, [vehicleData.damagePresent]);

    useEffect(() => {
        if (params.editable) {
            setOdometerEnd(vehicleData.odometerEnd);
            setDescription(vehicleData.description);
            setVehicleRegistrationNumber(vehicleData.vehicleRegistrationNumber);
            setOdometerStart(vehicleData.odometerStart);

            setDamageLocation(vehicleData.damageLocation);
            setDamageDescription(vehicleData.damageDescription);
        }
    }, [vehicleData.odometerEnd, vehicleData.odometerStart]);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
        if (params.editable === true) {
            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
            getVehicle({ id: params.item.shiftReportID });
            await getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
        }
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
                                    validationSchema={VEHICLE_ENTRY_SCHEMA}
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
                                        vehicleRegistrationNumber:
                                            vehicleRegistrationNumber,
                                        odometerStart:
                                            odometerStart &&
                                            odometerStart.toString(),
                                        odometerEnd:
                                            odometerEnd &&
                                            odometerEnd.toString(),
                                        damagePresent: damage,
                                        damageLocation: damageLocation,
                                        damageDescription: damageDescription,
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
                                                await addVehicle({
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
                                                                .longitude,
                                                    },
                                                    vehicleRegistrationNumber:
                                                        values.vehicleRegistrationNumber,
                                                    odometerStart:
                                                        values.odometerStart,
                                                    odometerEnd:
                                                        values.odometerEnd,
                                                    damagePresent:
                                                        values.damagePresent,
                                                    damageLocation:
                                                        values.damageLocation,
                                                    damageDescription:
                                                        values.damageDescription,
                                                    shiftID:
                                                        activeShift &&
                                                        activeShift.shiftID,
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
                                                await updateVehicle({
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
                                                                .longitude,
                                                    },
                                                    vehicleRegistrationNumber:
                                                        values.vehicleRegistrationNumber,
                                                    odometerStart:
                                                        values.odometerStart,
                                                    odometerEnd:
                                                        values.odometerEnd,
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
                                            await putOfflineVehicleReportEntry({
                                                reportTime: values.reportTime,
                                                description: values.description,
                                                geoLocation: {
                                                    latitude:
                                                        values.geoLocation
                                                            .latitude,
                                                    longitude:
                                                        values.geoLocation
                                                            .longitude,
                                                },
                                                vehicleRegistrationNumber:
                                                    values.vehicleRegistrationNumber,
                                                odometerStart:
                                                    values.odometerStart,
                                                odometerEnd: values.odometerEnd,
                                                damagePresent:
                                                    values.damagePresent,
                                                damageLocation:
                                                    values.damageLocation,
                                                damageDescription:
                                                    values.damageDescription,
                                                shiftID:
                                                    activeShift &&
                                                    activeShift.shiftID,
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
                                                        defaultValue={time}
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
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Odometer Start:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'odometerStart',
                                                                value,
                                                            );
                                                            setOdometerStart(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'numeric'}
                                                        value={
                                                            values.odometerStart
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.odometerStart
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Odometer End:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'odometerEnd',
                                                                value,
                                                            );
                                                            setOdometerEnd(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'numeric'}
                                                        value={
                                                            values.odometerEnd
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.odometerEnd
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Registration Number:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'vehicleRegistrationNumber',
                                                                value,
                                                            );
                                                            setVehicleRegistrationNumber(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.vehicleRegistrationNumber
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.vehicleRegistrationNumber
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
                                                        fontSize={fontSizeState}
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
                                                    multiline={true}
                                                    style={{
                                                        minHeight: 30,
                                                    }}
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

                                            <TextField
                                                accessibilityLabel="Damage Description:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'damageDescription',
                                                        value,
                                                    );
                                                    setDamageDescription(value);
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                value={values.damageDescription}
                                                error={
                                                    errors
                                                        ? errors.damageDescription
                                                        : null
                                                }
                                            />

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

export default withTheme(VehicleReport);

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
    margin-bottom: 90px;
`;

const FormField = styled.View`
    width: 47%;
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

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
`;

const TextFieldView = styled.View`
    width: 45%;
`;
