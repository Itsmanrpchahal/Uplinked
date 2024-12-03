import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import TextField from '@root/components/TextField';
import styled from 'styled-components/native';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend } from '@root/utils/assets';
import { Formik } from 'formik';
import { WELFARECHECK_ENTRY_SCHEMA } from './helper';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import CustomTimePicker from '@root/components/TimePicker';
import { navigationRef } from '@root/navigation/RootNavigation';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import navigationStrings from '@root/navigation/navigationStrings';
import AppLoader from '../../../../utils/AppLoader';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { store } from '../../../../store';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

const WelfareCheck = (props: any) => {
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({});
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();

    const [time, setTime] = useState<any>(hours + ':' + minute);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const {
        route: { params },
        navigation,
    } = props;
    const {
        addWelfare,
        getWelfare,
        updateWelfare,
        openModal,
        getShiftsReportsEntrieAttachments,
        putOfflineWelfareCheckEntry,
        uploadAttachmentShiftReportsEntries,
    } = useActions();

    const { offlineUploadAttachmentShiftListData } = useTypedSelector(
        (state) => state.offlineUploadAttachmentShiftListData,
    );

    const { offlineWelfareCheckListData, loading_offlineWelfareCheck } =
        useTypedSelector((state) => state.offlineWelfareCheckListData);

    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { welfareData, loading } = useTypedSelector(
        (state) => state.welfareData,
    );
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
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
            getWelfare({ id: params.item.shiftReportID });
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

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {loading ||
                loading_offlineWelfareCheck ||
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
                                    validationSchema={WELFARECHECK_ENTRY_SCHEMA}
                                    enableReinitialize={true}
                                    initialValues={{
                                        reportTime: time,
                                        description:
                                            params.editable === false
                                                ? ''
                                                : welfareData.description,
                                        geoLocation: {
                                            latitude:
                                                location.coords &&
                                                location.coords.latitude,
                                            longitude:
                                                location.coords &&
                                                location.coords.longitude,
                                        },
                                        shiftID:
                                            activeShift && activeShift.shiftID,
                                        site:
                                            params.editable === false
                                                ? ''
                                                : welfareData.site,
                                        guardSpokenTo:
                                            params.editable === false
                                                ? ''
                                                : welfareData.guardSpokenTo,
                                    }}
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
                                                await addWelfare({
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
                                                    shiftID:
                                                        activeShift &&
                                                        activeShift.shiftID,
                                                    site: values.site,
                                                    guardSpokenTo:
                                                        values.guardSpokenTo,
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
                                                await updateWelfare({
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
                                                    shiftReportID:
                                                        params.item
                                                            .shiftReportID,
                                                    site: values.site,
                                                    guardSpokenTo:
                                                        values.guardSpokenTo,
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            putOfflineWelfareCheckEntry({
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
                                                shiftID:
                                                    activeShift &&
                                                    activeShift.shiftID,
                                                site: values.site,
                                                guardSpokenTo:
                                                    values.guardSpokenTo,
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
                                            <HorizontalView>
                                                <FormField>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setVisibleTimer(
                                                                true,
                                                            )
                                                        }>
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
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                            editable={false}
                                                            value={time}
                                                            error={
                                                                errors
                                                                    ? errors.reportTime
                                                                    : null
                                                            }
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Site:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'site',
                                                                value,
                                                            );
                                                        }}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={values.site}
                                                        error={
                                                            errors
                                                                ? errors.site
                                                                : null
                                                        }
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="Description:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'description',
                                                        value,
                                                    );
                                                }}
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
                                                fontSize={fontSizeState}
                                            />

                                            <TextField
                                                accessibilityLabel="Guard spoken to:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'guardSpokenTo',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={values.guardSpokenTo}
                                                error={
                                                    errors
                                                        ? errors.guardSpokenTo
                                                        : null
                                                }
                                                fontSize={fontSizeState}
                                            />

                                            {
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

export default withTheme(WelfareCheck);

type FontSizeProps = {
    fontSize: number;
};

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 80px;
`;

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

const FormField = styled.View`
    width: 50%;
    padding: 0 15px;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
    margin: 5px -15px;
`;
