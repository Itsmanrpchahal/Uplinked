import React, { useEffect, useState } from 'react';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { withTheme } from 'styled-components';
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
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import styled from 'styled-components/native';
import { useNetInfo } from '@react-native-community/netinfo';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend, uncheck } from '@root/utils/assets';
import CustomTimePicker from '@root/components/TimePicker';
import { Formik } from 'formik';
import { INTOXICATION_ENTRY_SCHEMA } from './helper';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { useActions } from '@root/hooks/useActions';
import { navigationRef } from '@root/navigation/RootNavigation';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import navigationStrings from '@root/navigation/navigationStrings';
import { FloatingAction } from 'react-native-floating-action';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';
import { store } from '../../../../store';
import { ActionType_Offline_Upload_Attachment } from '../../../../store/putOfflineUploadAttachmentShiftReportsEntries/actions-types';
import { ActionType } from '../../../../store/shift-reports/actions-types';

const Intoxication = (props: any) => {
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
    const [informerd, setInformed] = useState(false);
    const [contacted, setContacted] = useState(false);
    const [patronName, setPatronName] = useState();
    const [description, setDescription] = useState();
    const [clientRepName, setClientRepName] = useState();
    const [escortedPatron, setEscortedPatron] = useState(false);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const { intoxicationData, loading }: any = useTypedSelector(
        (state) => state.intoxicationData,
    );
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const {
        setIntoxication,
        getIntoxication,
        updateIntoxication,
        openModal,
        getShiftsReportsEntrieAttachments,
        uploadAttachmentShiftReportsEntries,
        putOfflineIntoxicationEntry,
    } = useActions();
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    const {
        route: { params },
        navigation,
    } = props;
    const { offlineUploadAttachmentShiftListData } = useTypedSelector(
        (state) => state.offlineUploadAttachmentShiftListData,
    );

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
        if (params.editable === true) {
            getIntoxication({ id: params.item.shiftReportID });
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
        if (params.editable === true) {
            setInformed(intoxicationData.informedClientOrDM);
        }
    }, [intoxicationData.informedClientOrDM]);

    useEffect(() => {
        if (params.editable === true) {
            setContacted(intoxicationData.contactedPolice);
        }
    }, [intoxicationData.contactedPolice]);

    useEffect(() => {
        if (params.editable === true) {
            setEscortedPatron(intoxicationData.escortedPatron);
        }
    }, [intoxicationData.escortedPatron]);
    useEffect(() => {
        if (params.editable === true) {
            setPatronName(intoxicationData.patronName);
        }
    }, [intoxicationData.patronName]);
    useEffect(() => {
        if (params.editable === true) {
            setClientRepName(intoxicationData.clientRepName);
        }
    }, [intoxicationData.clientRepName]);
    useEffect(() => {
        if (params.editable === true) {
            setDescription(intoxicationData.description);
        }
    }, [intoxicationData.description]);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };
    return (
        <BackgroundGlobal>
            {loading ||
            shiftReportsEntriesAttachmentsLoading ||
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
                                    validationSchema={INTOXICATION_ENTRY_SCHEMA}
                                    enableReinitialize={true}
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
                                        informedClientOrDM: informerd,
                                        escortedPatron: escortedPatron,
                                        contactedPolice: contacted,
                                        patronName: patronName,
                                        clientRepName: clientRepName,
                                        shiftID:
                                            activeShift && activeShift.shiftID,
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
                                                await setIntoxication({
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
                                                    informedClientOrDM:
                                                        values.informedClientOrDM,
                                                    escortedPatron:
                                                        values.escortedPatron,
                                                    contactedPolice:
                                                        values.contactedPolice,
                                                    patronName:
                                                        values.patronName,
                                                    clientRepName:
                                                        values.clientRepName,
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
                                                await updateIntoxication({
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
                                                    informedClientOrDM:
                                                        values.informedClientOrDM,
                                                    escortedPatron:
                                                        values.escortedPatron,
                                                    contactedPolice:
                                                        values.contactedPolice,
                                                    patronName:
                                                        values.patronName,
                                                    clientRepName:
                                                        values.clientRepName,
                                                    shiftReportID:
                                                        params.item
                                                            .shiftReportID,
                                                });
                                                navigationRef.current.goBack();
                                            }
                                        } else {
                                            await putOfflineIntoxicationEntry({
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
                                                informedClientOrDM:
                                                    values.informedClientOrDM,
                                                escortedPatron:
                                                    values.escortedPatron,
                                                contactedPolice:
                                                    values.contactedPolice,
                                                patronName: values.patronName,
                                                clientRepName:
                                                    values.clientRepName,
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
                                                    <TitleLabel
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        Time of Occurrence:
                                                    </TitleLabel>
                                                </FormField>

                                                <FormField>
                                                    <TouchableOpacity
                                                        onPress={() =>
                                                            setVisibleTimer(
                                                                true,
                                                            )
                                                        }>
                                                        <TextField
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setFieldValue(
                                                                    'reportTime',
                                                                    value,
                                                                );
                                                            }}
                                                            editable={false}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                            value={time}
                                                            error={
                                                                errors
                                                                    ? errors.reportTime
                                                                    : null
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </FormField>
                                            </HorizontalView>

                                            <HorizontalView>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Patron Name:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'patronName',
                                                                value,
                                                            );
                                                            setPatronName(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.patronName
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.patronName
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Client rep/DM:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'clientRepName',
                                                                value,
                                                            );
                                                            setClientRepName(
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.clientRepName
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.clientRepName
                                                                : null
                                                        }
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <CheckBoxMainView>
                                                <TitleLabel
                                                    fontSize={fontSizeState}>
                                                    Action:
                                                </TitleLabel>
                                            </CheckBoxMainView>

                                            <CheckBoxBackground>
                                                <CheckView>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setFieldValue(
                                                                'informedClientOrDM',
                                                                !informerd,
                                                            );
                                                            setInformed(
                                                                !informerd,
                                                            );
                                                        }}>
                                                        <Image
                                                            source={
                                                                informerd ===
                                                                true
                                                                    ? require('@root/assets/check/check.png')
                                                                    : require('@root/assets/uncheck/checkuncheck.png')
                                                            }
                                                        />
                                                    </TouchableOpacity>

                                                    <TitleLabel
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {' '}
                                                        Informed Client/DM
                                                    </TitleLabel>
                                                </CheckView>
                                                <Divider />
                                                <CheckView>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setFieldValue(
                                                                'escortedPatron',
                                                                !escortedPatron,
                                                            );
                                                            setEscortedPatron(
                                                                !escortedPatron,
                                                            );
                                                        }}>
                                                        <Image
                                                            source={
                                                                escortedPatron ===
                                                                true
                                                                    ? require('@root/assets/check/check.png')
                                                                    : require('@root/assets/uncheck/checkuncheck.png')
                                                            }
                                                        />
                                                    </TouchableOpacity>

                                                    <TitleLabel
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {' '}
                                                        Escorted Patron{' '}
                                                    </TitleLabel>
                                                </CheckView>
                                                <Divider />
                                                <CheckView>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setFieldValue(
                                                                'contactedPolice',
                                                                !contacted,
                                                            );
                                                            setContacted(
                                                                !contacted,
                                                            );
                                                        }}>
                                                        <Image
                                                            source={
                                                                contacted ===
                                                                true
                                                                    ? require('@root/assets/check/check.png')
                                                                    : require('@root/assets/uncheck/checkuncheck.png')
                                                            }
                                                        />
                                                    </TouchableOpacity>

                                                    <TitleLabel
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        {' '}
                                                        Contacted Police
                                                    </TitleLabel>
                                                </CheckView>
                                            </CheckBoxBackground>

                                            <TextField
                                                accessibilityLabel="Description:"
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
                                                value={values.description}
                                                style={{
                                                    minHeight: 60,
                                                }}
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
                </KeyboardAvoidingView>
            )}

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

type FontSizeProps = {
    fontSize: number;
};

export default withTheme(Intoxication);
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

const CheckBoxMainView = styled.View`
    color: ${({ theme }: any) => theme.colors.text};
    background-color: ${({ theme }: any) => theme.colors.secondary};
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    margin-top: 10px;
    padding: 10px;
    fontsize: 15px;
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
const TitleLabel = styled.Text<FontSizeProps>`
    padding-right: 10px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    font-weight: 600;
    margin-top: 5px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const FormField = styled.View`
    width: 50%;
    padding: 0 15px;
`;

const CheckView = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

const CheckBoxBackground = styled.View`
    background: #29313e;
    padding: 10px 0 0 0;
`;
