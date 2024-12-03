import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import { Formik } from 'formik';
import ButtonSecondary from '@root/components/ButtonSecondary';
import CustomTimePicker from '@root/components/TimePicker';
import {
    getUserLocation,
    actionsButtonIcons,
} from '../../../../utils/common-methods';
import {
    ScrollView,
    TouchableOpacity,
    View,
    Switch,
    Text,
    Image,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import TextField from '@root/components/TextField';
import { next } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { BOMBREPORT_ENTRY_SCHEMA_1, setBombStep } from './helper';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import AppLoader from '../../../../utils/AppLoader';

const BombTheartStep1 = (props: any) => {
    const { colors }: any = useTheme();
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [didYouPlaceTheBomb, setDidYouPlaceTheBomb] =
        useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    const [time, setTime] = useState<any>(hours + ':' + minute);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const placetoggleRememberPin = (value) => {
        setDidYouPlaceTheBomb(value);
    };

    const {
        route: { params },
        navigation,
    } = props;
    const {
        getBombThreat,
        openModal,
        setBombThreatMultiStep,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { bombThreatData, loading }: any = useTypedSelector(
        (state) => state.bombThreatData,
    );
    const { bombThreatmultiStepdata }: any = useTypedSelector(
        (state) => state.bombThreatmultiStepdata,
    );
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    useEffect(() => {
        if (params.editable) {
            getBombThreat({ id: params.item.shiftReportID, orgID: orgID });
            getAttachments();
        }
    }, []);

    const getAttachments = async () => {
        if (params.editable) {
            await getShiftsReportsEntrieAttachments({
                id: params.item.shiftReportID,
                orgID: orgID,
            });
        }
    };

    useEffect(() => {
        setTime(
            params.trigger === 1
                ? params.item.reportDateTime.split('T')[1].split(':')[0] +
                      ':' +
                      params.item.reportDateTime.split('T')[1].split(':')[1]
                : time,
        );
    }, []);

    useEffect(() => {
        if (params.editable) {
            setDidYouPlaceTheBomb(bombThreatData.didYouPlaceTheBomb);
        }
    }, [bombThreatData.didYouPlaceTheBomb]);

    useEffect(() => {
        if (params.trigger === 1 && Object.keys(bombThreatData).length > 0) {
            set_MultiStep();
        }
    }, [bombThreatData]);

    useEffect(() => {
        if (params.trigger === 0) {
            setBombThreatMultiStep({
                reportTime: '',
                bombExplodeDateTime: '',
                bombPlacementDatetime: '',
                description: '',
                bombType: '',
                didYouPlaceTheBomb: false,
                bombPlacementReason: '',
                callerName: '',
                callerAddress: '',
                callerCurrentLocation: '',

                callerAccent: '',
                impediment: '',
                callerVoice: '',
                callerSpeech: '',
                callerDiction: '',
                callerManner: '',
                voiceRecognized: false,
                whoTheCallerWas: '',
                callerFamiliarWithArea: false,

                threatWording: '',
                reportCallTo: '',
                reportCallToPhone: '',
                callerEstimatedAge: 0,
                callTime: '',
                callDuration: '',
                recipientName: '',
                recipientPhone: '',
                callerSex: '',
            });
        }
    }, []);

    const set_MultiStep = async () => {
        await setBombThreatMultiStep({
            reportTime: bombThreatData.reportTime,
            bombExplodeDateTime: bombThreatData.bombExplodeDateTime,
            bombPlacementDatetime: bombThreatData.bombPlacementDatetime,
            description: bombThreatData.description,
            bombType: bombThreatData.bombType,
            didYouPlaceTheBomb: didYouPlaceTheBomb,
            bombPlacementReason: bombThreatData.bombPlacementReason,
            callerName: bombThreatData.callerName,
            callerAddress: bombThreatData.callerAddress,
            callerCurrentLocation: bombThreatData.callerCurrentLocation,

            callerAccent: bombThreatData.callerAccent,
            impediment: bombThreatData.impediment,
            callerVoice: bombThreatData.callerVoice,
            callerSpeech: bombThreatData.callerSpeech,
            callerDiction: bombThreatData.callerDiction,
            callerManner: bombThreatData.callerManner,
            voiceRecognized: bombThreatData.voiceRecognized,
            whoTheCallerWas: bombThreatData.whoTheCallerWas,
            callerFamiliarWithArea: bombThreatData.callerFamiliarWithArea,

            threatWording: bombThreatData.threatWording,
            reportCallTo: bombThreatData.reportCallTo,
            reportCallToPhone: bombThreatData.reportCallToPhone,
            callerEstimatedAge: parseInt(bombThreatData.callerEstimatedAge),
            callTime: bombThreatData.callTime,
            callDuration: bombThreatData.callDuration,
            recipientName: bombThreatData.recipientName,
            recipientPhone: bombThreatData.recipientPhone,
            callerSex: bombThreatData.callerSex,
        });
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={false}
                        showsVerticalScrollIndicator={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    validationSchema={BOMBREPORT_ENTRY_SCHEMA_1}
                                    enableReinitialize={true}
                                    initialValues={{
                                        reportTime:
                                            bombThreatmultiStepdata.reportTime,
                                        description:
                                            bombThreatmultiStepdata.description,
                                        bombExplodeDateTime:
                                            bombThreatmultiStepdata.bombExplodeDateTime,
                                        bombPlacementDatetime:
                                            bombThreatmultiStepdata.bombPlacementDatetime,
                                        bombType:
                                            bombThreatmultiStepdata.bombType,
                                        bombPlacementReason:
                                            bombThreatmultiStepdata.bombPlacementReason,
                                        didYouPlaceTheBomb:
                                            bombThreatmultiStepdata.didYouPlaceTheBomb,
                                        callerName:
                                            bombThreatmultiStepdata.callerName,
                                        callerAddress:
                                            bombThreatmultiStepdata.callerAddress,
                                        callerCurrentLocation:
                                            bombThreatmultiStepdata.callerCurrentLocation,
                                    }}
                                    onSubmit={async (values) => {
                                        await setBombThreatMultiStep({
                                            reportTime: values.reportTime,
                                            bombExplodeDateTime:
                                                values.bombExplodeDateTime,
                                            bombPlacementDatetime:
                                                values.bombPlacementDatetime,
                                            description: values.description,
                                            bombType: values.bombType,
                                            didYouPlaceTheBomb:
                                                didYouPlaceTheBomb,
                                            bombPlacementReason:
                                                values.bombPlacementReason,
                                            callerName: values.callerName,
                                            callerAddress: values.callerAddress,
                                            callerCurrentLocation:
                                                values.callerCurrentLocation,

                                            callerAccent:
                                                bombThreatmultiStepdata.callerAccent,
                                            impediment:
                                                bombThreatmultiStepdata.impediment,
                                            callerVoice:
                                                bombThreatmultiStepdata.callerVoice,
                                            callerSpeech:
                                                bombThreatmultiStepdata.callerSpeech,
                                            callerDiction:
                                                bombThreatmultiStepdata.callerDiction,
                                            callerManner:
                                                bombThreatmultiStepdata.callerManner,
                                            voiceRecognized:
                                                bombThreatmultiStepdata.voiceRecognized,
                                            whoTheCallerWas:
                                                bombThreatmultiStepdata.whoTheCallerWas,
                                            callerFamiliarWithArea:
                                                bombThreatmultiStepdata.callerFamiliarWithArea,

                                            threatWording:
                                                bombThreatmultiStepdata.threatWording,
                                            reportCallTo:
                                                bombThreatmultiStepdata.reportCallTo,
                                            reportCallToPhone:
                                                bombThreatmultiStepdata.reportCallToPhone,
                                            callerEstimatedAge: parseInt(
                                                bombThreatmultiStepdata.callerEstimatedAge,
                                            ),
                                            callTime:
                                                bombThreatmultiStepdata.callTime,
                                            callDuration:
                                                bombThreatmultiStepdata.callDuration,
                                            recipientName:
                                                bombThreatmultiStepdata.recipientName,
                                            recipientPhone:
                                                bombThreatmultiStepdata.recipientPhone,
                                            callerSex:
                                                bombThreatmultiStepdata.callerSex,
                                        });

                                        props.navigation.navigate(
                                            navigationStrings.BOMB_THEART_STEP_2,
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
                                            <TextFieldView>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVisibleTimer(true);
                                                    }}>
                                                    <TextField
                                                        accessibilityLabel="Time of Occurrence:"
                                                        fontSize={fontSizeState}
                                                        editable={false}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.reportTime &&
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

                                            <TitleText fontSize={fontSizeState}>
                                                Questions to ask Suspect
                                            </TitleText>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Explodes when:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'bombExplodeDateTime',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.bombExplodeDateTime
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Placed when:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'bombPlacementDatetime',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.bombPlacementDatetime
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="Describe bomb:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'description',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                fontSize={fontSizeState}
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

                                            <TextField
                                                accessibilityLabel="Type of bomb:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'bombType',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                fontSize={fontSizeState}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                value={values.bombType}
                                            />

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Did you place the bomb?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        placetoggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={didYouPlaceTheBomb}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            {didYouPlaceTheBomb && (
                                                <TextField
                                                    accessibilityLabel="Purpose of placing Bomb"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'bombPlacementReason',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    multiline={true}
                                                    style={{
                                                        minHeight: 40,
                                                    }}
                                                    value={
                                                        values.bombPlacementReason
                                                    }
                                                />
                                            )}

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Whats your name?"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerName',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerName
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Where are you?"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerAddress',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerAddress
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="What's your address?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'callerCurrentLocation',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={
                                                    values.callerCurrentLocation
                                                }
                                            />

                                            {params.editable && (
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
                                            )}

                                            <ButtonWrapper>
                                                <ButtonSecondary
                                                    btnText={'Next'}
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                    icon={next}
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

            {params.type && params.type === true && (
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

export default withTheme(BombTheartStep1);

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

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
`;

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;

const TextFieldView = styled.View`
    width: 45%;
`;
