import BackgroundGlobal from '@root/components/BackgroundGlobal';
import React, { useEffect, useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Appearance,
} from 'react-native';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import { useTheme, withTheme } from 'styled-components';
import CustomTimePicker from '@root/components/TimePicker';
import TextField from '@root/components/TextField';
import styled from 'styled-components/native';
import { arrowSend } from '@root/utils/assets';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { Formik } from 'formik';
import { MAINTENANCE_ENTRY_SCHEMA } from './helpers';
import AppLoader from '../../../../utils/AppLoader';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { useActions } from '@root/hooks/useActions';
import { navigationRef } from '@root/navigation/RootNavigation';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import { apiUri } from '@root/service/apiEndPoints';
import { Dropdown } from 'react-native-element-dropdown';
import navigationStrings from '@root/navigation/navigationStrings';
import { NoInternetView } from '../../../../components/NoInternetView';
import { useNetInfo } from '@react-native-community/netinfo';
import { getUserLocation } from '../../../../utils/common-methods';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { store } from '../../../../store';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

const Maintenance = (props: any) => {
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    let data = [];
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        createReportEntryForShift,
        getMaintenanceList,
        addMaintenance,
        getMaintenance,
        openModal,
        updateMaintenance,
        putOfflineMaintenanceEntry,
        getShiftsReportsEntrieAttachments,
        uploadAttachmentShiftReportsEntries,
    } = useActions();
    const { offlineMaintenanceListData, loading_offlineMaintenance } =
        useTypedSelector((state) => state.offlineMaintenanceListData);
    const { offlineUploadAttachmentShiftListData } = useTypedSelector(
        (state) => state.offlineUploadAttachmentShiftListData,
    );

    const netInfo = useNetInfo();
    var mode = Appearance.getColorScheme();
    const { maintainenacelistData, maintainenaceLoading }: any =
        useTypedSelector((state) => state.maintainenacelistData);
    const { addMaintainenaceData, addMaintainenaceLoading }: any =
        useTypedSelector((state) => state.addMaintainenaceData);
    const [maintenanceTypeID, setMaintenanceTypeID] = useState(0);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const [notes, setNotes] = useState('');
    const [location, setLocation] = useState<any>({});
    const [serviceRequired, setServiceRequired] = useState(0);
    const [service, setService] = useState(false);
    let [indexDrop, setIndexDrop] = useState(0);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const [isFocus, setIsFocus] = useState(false);
    useEffect(() => {
        getUserLoc();
    }, []);

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
        if (params.editable) {
            getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
        }
    }, []);

    useEffect(() => {
        if (params.editable) {
            getMaintenance({ id: params.item.shiftReportID });
            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
        }
    }, []);

    useEffect(() => {
        addMaintainenaceData &&
            setMaintenanceTypeID(addMaintainenaceData.maintenanceTypeID);
    }, [addMaintainenaceData]);

    useEffect(() => {
        if (params.editable && service != true) {
            addMaintainenaceData &&
                addMaintainenaceData.serviceRequired &&
                setServiceRequired(1);
            addMaintainenaceData &&
                addMaintainenaceData.serviceRequired === false &&
                setServiceRequired(0);
        }
    }, [serviceRequired, addMaintainenaceData]);

    useEffect(() => {
        if (params.editable) {
            maintainenacelistData &&
                maintainenacelistData.map((item, i) => {
                    if (item.id === maintenanceTypeID) {
                        setIndexDrop(i);
                    }
                });
        }
    }, [maintenanceTypeID, maintainenacelistData, indexDrop]);

    const {
        route: { params },
        navigation,
    } = props;
    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

    useEffect(() => {
        if (
            netInfo.isInternetReachable === true ||
            netInfo.isConnected === true
        ) {
            getMaintenanceList();
        }
    }, [netInfo]);

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {maintainenaceLoading ||
                addMaintainenaceLoading ||
                createReportEntryLoading ||
                shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={false}
                        showsVerticalScrollIndicator={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={MAINTENANCE_ENTRY_SCHEMA}
                                    initialValues={{
                                        reportTime: time,
                                        description:
                                            params.editable === false
                                                ? ''
                                                : addMaintainenaceData &&
                                                  addMaintainenaceData.description,
                                        geoLocation: {
                                            latitude:
                                                location.coords &&
                                                location.coords.latitude,
                                            longitude:
                                                location.coords &&
                                                location.coords.longitude,
                                        },
                                        maintenanceLocation:
                                            params.editable === false
                                                ? ''
                                                : addMaintainenaceData &&
                                                  addMaintainenaceData.maintenanceLocation,
                                        buildingNumber:
                                            params.editable === false
                                                ? ''
                                                : addMaintainenaceData &&
                                                  addMaintainenaceData.buildingNumber,
                                        notes:
                                            params.editable === false
                                                ? ''
                                                : addMaintainenaceData &&
                                                  addMaintainenaceData.notes,
                                        maintenanceTypeID:
                                            params.editable === false
                                                ? maintenanceTypeID
                                                : maintenanceTypeID,
                                        serviceRequired:
                                            serviceRequired === 1
                                                ? true
                                                : false,
                                        shiftID:
                                            activeShift && activeShift.shiftID,
                                    }}
                                    enableReinitialize={false}
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
                                                await addMaintenance({
                                                    reportTime: time,
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
                                                    maintenanceLocation:
                                                        values.maintenanceLocation,
                                                    buildingNumber:
                                                        values.buildingNumber,
                                                    notes: values.notes,
                                                    maintenanceTypeID:
                                                        maintenanceTypeID,
                                                    serviceRequired:
                                                        serviceRequired === 1
                                                            ? true
                                                            : false,
                                                    shiftID: params.item
                                                        ? params.item
                                                              .shiftReportID
                                                        : activeShift
                                                        ? activeShift.shiftID
                                                        : 0,
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
                                                await updateMaintenance({
                                                    reportTime: time,
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
                                                    maintenanceLocation:
                                                        values.maintenanceLocation,
                                                    buildingNumber:
                                                        values.buildingNumber,
                                                    notes: values.notes,
                                                    maintenanceTypeID:
                                                        maintenanceTypeID,
                                                    serviceRequired:
                                                        serviceRequired === 1
                                                            ? true
                                                            : false,
                                                    shiftReportID:
                                                        params.item
                                                            .shiftReportID,
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            await putOfflineMaintenanceEntry({
                                                reportTime: time,
                                                description: values.description,
                                                geoLocation: {
                                                    latitude:
                                                        values.geoLocation
                                                            .latitude,
                                                    longitude:
                                                        values.geoLocation
                                                            .longitude,
                                                },
                                                maintenanceLocation:
                                                    values.maintenanceLocation,
                                                buildingNumber:
                                                    values.buildingNumber,
                                                notes: values.notes,
                                                maintenanceTypeID:
                                                    maintenanceTypeID,
                                                serviceRequired:
                                                    serviceRequired === 1
                                                        ? true
                                                        : false,
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
                                                        value={time}
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
                                                        accessibilityLabel="Location:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'maintenanceLocation',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        value={
                                                            values.maintenanceLocation
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.maintenanceLocation
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                                <FormField>
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
                                                        keyboardType={'numeric'}
                                                        value={
                                                            values.buildingNumber
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.buildingNumber
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <HorizontalView>
                                                <View>
                                                    <View
                                                        style={{
                                                            width: 170,
                                                        }}>
                                                        <Dropdown
                                                            placeholderStyle={
                                                                styles.placeholderStyle
                                                            }
                                                            selectedTextStyle={
                                                                styles.selectedTextStyle
                                                            }
                                                            inputSearchStyle={
                                                                styles.inputSearchStyle
                                                            }
                                                            iconStyle={
                                                                styles.iconStyle
                                                            }
                                                            containerStyle={{
                                                                backgroundColor:
                                                                    mode ===
                                                                    'light'
                                                                        ? 'white'
                                                                        : 'gray',
                                                            }}
                                                            data={
                                                                maintainenacelistData &&
                                                                maintainenacelistData.length >
                                                                    0
                                                                    ? maintainenacelistData
                                                                    : []
                                                            }
                                                            search={false}
                                                            maxHeight={300}
                                                            labelField="text"
                                                            valueField="id"
                                                            placeholder={
                                                                maintainenacelistData &&
                                                                params.editable ===
                                                                    false
                                                                    ? maintainenacelistData &&
                                                                      maintainenacelistData[0]
                                                                          .text
                                                                    : maintainenacelistData &&
                                                                      maintainenacelistData[
                                                                          indexDrop
                                                                      ].text
                                                            }
                                                            value={'57'}
                                                            onFocus={() =>
                                                                setIsFocus(true)
                                                            }
                                                            onBlur={() =>
                                                                setIsFocus(
                                                                    false,
                                                                )
                                                            }
                                                            onChange={(
                                                                item,
                                                            ) => {
                                                                setIsFocus(
                                                                    false,
                                                                );
                                                                setMaintenanceTypeID(
                                                                    item.id,
                                                                );
                                                            }}
                                                        />
                                                    </View>
                                                </View>

                                                <TextFieldView>
                                                    <TitleText
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        Service Required?
                                                    </TitleText>

                                                    <HorizontalView>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setServiceRequired(
                                                                    1,
                                                                );
                                                                setService(
                                                                    true,
                                                                );
                                                            }}>
                                                            <HorizontalViewItem>
                                                                <Image
                                                                    source={
                                                                        serviceRequired ===
                                                                        1
                                                                            ? require('@root/assets/radioon/radioon.png')
                                                                            : require('@root/assets/radiooff/radiooff.png')
                                                                    }
                                                                />
                                                                <RadioText
                                                                    fontSize={
                                                                        fontSizeState
                                                                    }>
                                                                    Yes
                                                                </RadioText>
                                                            </HorizontalViewItem>
                                                        </TouchableOpacity>

                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setServiceRequired(
                                                                    0,
                                                                );
                                                                setService(
                                                                    true,
                                                                );
                                                            }}>
                                                            <HorizontalViewItem>
                                                                <Image
                                                                    source={
                                                                        serviceRequired ===
                                                                        0
                                                                            ? require('@root/assets/radioon/radioon.png')
                                                                            : require('@root/assets/radiooff/radiooff.png')
                                                                    }
                                                                />
                                                                <RadioText
                                                                    fontSize={
                                                                        fontSizeState
                                                                    }>
                                                                    No
                                                                </RadioText>
                                                            </HorizontalViewItem>
                                                        </TouchableOpacity>
                                                    </HorizontalView>
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="Notes:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'notes',
                                                        value,
                                                    );
                                                    setNotes(value);
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                value={values.notes}
                                                error={
                                                    errors ? errors.notes : null
                                                }
                                            />

                                            {
                                                // params.editable === true && (
                                                <ImageWrapper>
                                                    {shiftReportsEntriesAttachmentsLoading ? (
                                                        <NotFound
                                                            style={{
                                                                alignSelf:
                                                                    'center',
                                                            }}>
                                                            Loading...
                                                        </NotFound>
                                                    ) : shiftReportsEntriesAttachments.length >
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
                                                    ) : offlineUploadAttachmentShiftListData.length >
                                                      0 ? (
                                                        offlineUploadAttachmentShiftListData.map(
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
                                                    ) : null}

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

                                            {!params.editable &&
                                                navigation.setOptions({
                                                    headerRight: () => null,
                                                })}

                                            <ButtonWrapper>
                                                <ButtonSecondary
                                                    btnText={'Submit'}
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                    icon={arrowSend}
                                                    loading={
                                                        maintainenaceLoading
                                                    }
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
        </BackgroundGlobal>
    );
};

export default withTheme(Maintenance);

type FontSizeProps = {
    fontSize: number;
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'gray',
        padding: 16,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
        color: 'white',
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'white',
    },
    selectedTextStyle: {
        fontSize: 16,
        color: 'white',
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

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

const RadioText = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    font-weight: 600;
    text-align: center;
`;
const TitleText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    font-weight: 700;
    text-align: center;
    margin-top: 10px;
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

const HorizontalViewItem = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 10px;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
`;

const TextFieldView = styled.View`
    width: 45%;
    margin-top: 10px;
`;
