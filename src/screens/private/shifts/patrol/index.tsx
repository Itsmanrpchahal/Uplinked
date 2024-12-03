import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {
    MainParentWrapper,
    MainWrapper,
    NotFound,
} from '@root/utils/globalStyle';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import TextField from '@root/components/TextField';
import {
    Alert,
    Button,
    Image,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
} from 'react-native';
import { back } from '../../../../assets/back';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend } from 'utils/assets';
import {
    actionsButtonIcons,
    getUserLocation,
} from '@root/utils/common-methods';
import CustomTimePicker from '@root/components/TimePicker';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { navigationRef } from '../../../../navigation/RootNavigation';

import { store } from '../../../../store';
import { PATROL_ENTRY_SCHEMA } from './helper';
import { apiUri } from '@root/service/apiEndPoints';
import { FloatingAction } from 'react-native-floating-action';
import navigationStrings from '@root/navigation/navigationStrings';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';
import { useNetInfo } from '@react-native-community/netinfo';
import { NoInternetView } from '../../../../components/NoInternetView';
import { ActionType } from '../../../../store/shift-reports/actions-types';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

const Patrol = (props: any) => {
    const {
        createReportEntryForShift,
        putOfflineUploadAttachmentShiftReportEntries,
        uploadAttachmentShiftReportsEntries,
        openModal,
        getShiftsReportsEntrieAttachments,
        putOfflinePatrolEntry,
    } = useActions();
    const netInfo = useNetInfo();
    const {
        route: { params },
        navigation,
    } = props;

    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        offlineUploadAttachmentShiftListData,
        loading_offlineUploadAttachmentShift,
    } = useTypedSelector((state) => state.offlineUploadAttachmentShiftListData);
    const { offlinePatrolListData } = useTypedSelector(
        (state) => state.offlinePatrolListData,
    );

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
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const [fileID, setFileID] = useState('');
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const [isModalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

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
        if (netInfo.isInternetReachable === false) {
            <NoInternetView />;
        }
    }, []);

    useEffect(() => {
        getUserLoc();
    }, []);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

    const handleCreateReportEntry = async (values: any) => {
        const newValue = { ...values };
        if (params.editable) {
            delete newValue.shiftID;
            newValue.shiftReportID = values.shiftID;
        }
        if (
            netInfo.isInternetReachable === null ||
            netInfo.isInternetReachable === true
        ) {
            if (params.editable) {
                await createReportEntryForShift({
                    url: apiUri.shifts.createPetrolEntry,
                    type: params.editable ? 'update' : 'create',
                    create: newValue,
                });
                navigationRef.current.goBack();
            } else {
                await createReportEntryForShift({
                    url: apiUri.shifts.createPetrolEntry,
                    type: params.editable ? 'update' : 'create',
                    create: newValue,
                }).then((res) => {
                    if (res.status === 200) {
                        offlineUploadAttachmentShiftListData.map(
                            (data, index) => {
                                data._parts[1][1] = res.data.reportID;
                                uploadAttachmentShiftReportsEntries(
                                    offlineUploadAttachmentShiftListData[index],
                                );
                            },
                        );
                        store.dispatch({
                            type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
                        });
                        navigationRef.current.goBack();
                    }
                });
            }
        } else if (netInfo.isConnected === false && !params.editable) {
            const newValue = { ...values };
            await putOfflinePatrolEntry({
                reportTime: newValue.reportTime,
                description: newValue.description,
                geoLocation: {
                    latitude: newValue.geoLocation.lattitude,
                    longitude: newValue.geoLocation.longitude,
                },
                shiftID: newValue.shiftID,
                attachment: offlineUploadAttachmentShiftListData,
            });

            store.dispatch({
                type: ActionType_Offline_Upload_Attachment.OFFLINE_UPLOAD_ATTACHMENTS_SHIFT_GET_FAILED,
            });
            navigationRef.current.goBack();

            netInfo.isInternetReachable === false && <NoInternetView />;
        }
    };

    // @ts-ignore
    // @ts-ignore
    // @ts-ignore
    return (
        <BackgroundGlobal>
            <MainParentWrapper>
                {createReportEntryLoading ||
                shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView nestedScrollEnabled={false}>
                        <MainWrapper>
                            <Formik
                                validationSchema={PATROL_ENTRY_SCHEMA}
                                initialValues={{
                                    reportTime: time,
                                    description: params.item
                                        ? params.item.description
                                        : '',
                                    geoLocation: {
                                        latitude:
                                            location.coords &&
                                            location.coords.latitude,
                                        longitude:
                                            location.coords &&
                                            location.coords.longitude,
                                    },
                                    shiftID: params.item
                                        ? params.item.shiftReportID
                                        : activeShift
                                        ? activeShift.shiftID
                                        : 0,
                                }}
                                enableReinitialize={true}
                                onSubmit={async (values) => {
                                    await handleCreateReportEntry(values);
                                }}>
                                {({
                                    setFieldValue,
                                    handleSubmit,
                                    errors,
                                    values,
                                }) => (
                                    <View>
                                        <ImageRight>
                                            <TimeTitleText
                                                fontSize={fontSizeState}>
                                                Time of Patrol{' '}
                                            </TimeTitleText>
                                            <ShiftItemHorizontal>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setVisibleTimer(true)
                                                    }
                                                    style={{
                                                        flexDirection: 'row',
                                                        justifyContent:
                                                            'center',
                                                        alignItems: 'center',
                                                    }}>
                                                    <Timeicon
                                                        source={require('@root/assets/clock/clock.png')}
                                                    />
                                                    <TimeTitleText
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {values.reportTime}
                                                    </TimeTitleText>
                                                </TouchableOpacity>
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
                                                            hours +
                                                                ':' +
                                                                minute,
                                                        );
                                                    }}
                                                    setDateTimePicker={
                                                        setVisibleTimer
                                                    }
                                                />
                                            </ShiftItemHorizontal>
                                        </ImageRight>

                                        <TextField
                                            accessibilityLabel="Description"
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
                                            style={{
                                                minHeight: 60,
                                            }}
                                            fontSize={fontSizeState}
                                            error={
                                                errors
                                                    ? errors.description
                                                    : null
                                            }
                                        />

                                        {
                                            // params.editable && (
                                            <ImageWrapper>
                                                {shiftReportsEntriesAttachmentsLoading ? (
                                                    <View>
                                                        <NotFound
                                                            style={{
                                                                alignSelf:
                                                                    'center',
                                                            }}>
                                                            Loading...
                                                        </NotFound>
                                                    </View>
                                                ) : shiftReportsEntriesAttachments.length >
                                                  0 ? (
                                                    shiftReportsEntriesAttachments.map(
                                                        (attachment: any) => {
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
                                                                            resizeMode="contain"
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
                                                        (attachment: any) => {
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
                                                                            resizeMode="contain"
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

                                        <ButtonWrapper>
                                            <ButtonSecondary
                                                btnText={'Submit'}
                                                onPress={() => handleSubmit()}
                                                loading={
                                                    createReportEntryLoading
                                                }
                                                icon={arrowSend}
                                                isIconLeft={false}
                                                fontSize={fontSizeState}
                                            />
                                        </ButtonWrapper>
                                    </View>
                                )}
                            </Formik>
                        </MainWrapper>
                    </ScrollView>
                )}

                <FloatingAction
                    actions={actionsButtonIcons}
                    onPressItem={(name) => {
                        navigation.navigate(navigationStrings.QRSCAN);
                    }}
                    overlayColor={'rgba(255, 255, 255, 0)'}
                    color={'#16a086'}
                />
            </MainParentWrapper>
        </BackgroundGlobal>
    );
};
// @ts-ignore
export default withTheme(Patrol);

type FontSizeProps = {
    fontSize: number;
};

type ImageWrapper__ImageProps = {
    width: number;
};

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: flex-end;
    margin-top: 16px;
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

const Timeicon = styled.Image`
    margin-right: 8px;
`;

const ShiftItemHorizontal = styled.View`
    display: flex;
    flex-direction: row;
    margin-top: 8px;
    align-items: center;
`;

const TimeTitleText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const ImageRight = styled.View`
    margin-top: 30px;
`;
