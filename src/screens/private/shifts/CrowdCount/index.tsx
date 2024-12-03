import BackgroundGlobal from '@root/components/BackgroundGlobal';
import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import CustomTimePicker from '@root/components/TimePicker';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend } from '@root/utils/assets';
import { Formik } from 'formik';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { navigationRef } from '@root/navigation/RootNavigation';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import { useNetInfo } from '@react-native-community/netinfo';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';

import {
    MainParentWrapper,
    MainWrapper,
    Divider,
} from '@root/utils/globalStyle';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { CROWDCOUNT_ENTRY_SCHEMA } from './helper';
import { useActions } from '@root/hooks/useActions';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import navigationStrings from '@root/navigation/navigationStrings';
import AppLoader from '../../../../utils/AppLoader';
import { store } from '../../../../store';
import { ActionType } from '../../../../store/shift-reports/actions-types';

const CrowdCount = (props: any) => {
    const netInfo = useNetInfo();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [location, setLocation] = useState<any>({});
    const [description, setDescription] = useState('');
    const [crowdNumber, setCrowdNumber] = useState<any>();
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
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
    const {
        setCrowdCount,
        getCrowdCount,
        updateCrowdCount,
        openModal,
        getShiftsReportsEntrieAttachments,
        uploadAttachmentShiftReportsEntries,
        putOfflineCrowdCountEntry,
    } = useActions();
    const { crowdCountData, loading }: any = useTypedSelector(
        (state) => state.crowdCountData,
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
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const {
        route: { params },
        navigation,
    } = props;
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
            setTime(
                params.item.reportDateTime.split('T')[1].split(':')[0] +
                    ':' +
                    params.item.reportDateTime.split('T')[1].split(':')[1],
            );
            setDescription(crowdCountData.description);
            setCrowdNumber(crowdCountData.crowdNumber);
        }
    }, [crowdCountData.crowdNumber, crowdCountData.description]);
    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
        if (params.editable) {
            await getCrowdCount({ id: params.item.shiftReportID });
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
                loading_offlineUploadAttachmentShift ||
                shiftReportsEntriesAttachmentsLoading ||
                createReportEntryLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={CROWDCOUNT_ENTRY_SCHEMA}
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
                                        crowdNumber: crowdNumber,
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
                                                await setCrowdCount({
                                                    reportTime:
                                                        values.reportTime,
                                                    description:
                                                        values.description,
                                                    crowdNumber:
                                                        values.crowdNumber,
                                                    geoLocation: {
                                                        latitude:
                                                            values.geoLocation
                                                                .latitude,
                                                        longitude:
                                                            values.geoLocation
                                                                .longitude,
                                                    },
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
                                                await updateCrowdCount({
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
                                                    shiftReportID:
                                                        params.item
                                                            .shiftReportID,
                                                    crowdNumber:
                                                        values.crowdNumber,
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            await putOfflineCrowdCountEntry({
                                                reportTime: values.reportTime,
                                                description: values.description,
                                                crowdNumber: values.crowdNumber,
                                                geoLocation: {
                                                    latitude:
                                                        values.geoLocation
                                                            .latitude,
                                                    longitude:
                                                        values.geoLocation
                                                            .longitude,
                                                },
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
                                            <HorizontalView>
                                                <FormField>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setVisibleTimer(
                                                                true,
                                                            );
                                                        }}>
                                                        <TextField
                                                            accessibilityLabel="Time of Count:"
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
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
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
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Crowd Number:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'crowdNumber',
                                                                value,
                                                            );
                                                            setCrowdNumber(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'numeric'}
                                                        value={
                                                            values.crowdNumber &&
                                                            values.crowdNumber.toString()
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.crowdNumber
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                            </HorizontalView>
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
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                multiline={true}
                                                value={values.description}
                                                error={
                                                    errors
                                                        ? errors.description
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

export default withTheme(CrowdCount);

type FontSizeProps = {
    fontSize: number;
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
