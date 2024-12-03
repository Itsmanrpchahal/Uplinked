import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import {
    getUserLocation,
    actionsButtonIcons,
} from '../../../../utils/common-methods';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next, back, backgray } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { Formik } from 'formik';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import AppLoader from '../../../../utils/AppLoader';

const BombTheartStep2 = (props: any) => {
    const { colors }: any = useTheme();
    const [voiceRecognized, setVoiceRecognized] = useState<any>(false);
    const [callerFamiliarWithArea, setCallerFamiliarWithArea] = useState(false);
    const ISOtoggleRememberPin = (value) => {
        setVoiceRecognized(value);
    };
    const isCallertoggleRememberPin = (value) => {
        setCallerFamiliarWithArea(value);
    };
    const {
        route: { params },
        navigation,
    } = props;
    const {
        openModal,
        getShiftsReportsEntrieAttachments,
        setBombThreatMultiStep,
    } = useActions();
    const { bombThreatmultiStepdata }: any = useTypedSelector(
        (state) => state.bombThreatmultiStepdata,
    );
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    useEffect(() => {
        setVoiceRecognized(bombThreatmultiStepdata.voiceRecognized);
    }, [bombThreatmultiStepdata.voiceRecognized]);

    useEffect(() => {
        setCallerFamiliarWithArea(
            bombThreatmultiStepdata.callerFamiliarWithArea,
        );
    }, [bombThreatmultiStepdata.callerFamiliarWithArea]);

    const setBack = async (values: any) => {
        await setBombThreatMultiStep({
            reportTime: bombThreatmultiStepdata.reportTime,
            bombExplodeDateTime: bombThreatmultiStepdata.bombExplodeDateTime,
            bombPlacementDatetime:
                bombThreatmultiStepdata.bombPlacementDatetime,
            description: bombThreatmultiStepdata.description,
            bombType: bombThreatmultiStepdata.bombType,
            didYouPlaceTheBomb: bombThreatmultiStepdata.didYouPlaceTheBomb,
            bombPlacementReason: bombThreatmultiStepdata.bombPlacementReason,
            callerName: bombThreatmultiStepdata.callerName,
            callerAddress: bombThreatmultiStepdata.callerAddress,
            callerCurrentLocation:
                bombThreatmultiStepdata.callerCurrentLocation,

            callerAccent: values.callerAccent,
            impediment: values.impediment,
            callerVoice: values.callerVoice,
            callerSpeech: values.callerSpeech,
            callerDiction: values.callerDiction,
            callerManner: values.callerManner,
            voiceRecognized: voiceRecognized,
            whoTheCallerWas: values.whoTheCallerWas,
            callerFamiliarWithArea: callerFamiliarWithArea,

            threatWording: bombThreatmultiStepdata.threatWording,
            reportCallTo: bombThreatmultiStepdata.reportCallTo,
            reportCallToPhone: bombThreatmultiStepdata.reportCallToPhone,
            callerEstimatedAge: parseInt(
                bombThreatmultiStepdata.callerEstimatedAge,
            ),
            callTime: bombThreatmultiStepdata.callTime,
            callDuration: bombThreatmultiStepdata.callDuration,
            recipientName: bombThreatmultiStepdata.recipientName,
            recipientPhone: bombThreatmultiStepdata.recipientPhone,
            callerSex: bombThreatmultiStepdata.callerSex,
        });
        props.navigation.pop();
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
                                    enableReinitialize={true}
                                    initialValues={{
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
                                    }}
                                    onSubmit={async (values) => {
                                        await setBombThreatMultiStep({
                                            reportTime:
                                                bombThreatmultiStepdata.reportTime,
                                            bombExplodeDateTime:
                                                bombThreatmultiStepdata.bombExplodeDateTime,
                                            bombPlacementDatetime:
                                                bombThreatmultiStepdata.bombPlacementDatetime,
                                            description:
                                                bombThreatmultiStepdata.description,
                                            bombType:
                                                bombThreatmultiStepdata.bombType,
                                            didYouPlaceTheBomb:
                                                bombThreatmultiStepdata.didYouPlaceTheBomb,
                                            bombPlacementReason:
                                                bombThreatmultiStepdata.bombPlacementReason,
                                            callerName:
                                                bombThreatmultiStepdata.callerName,
                                            callerAddress:
                                                bombThreatmultiStepdata.callerAddress,
                                            callerCurrentLocation:
                                                bombThreatmultiStepdata.callerCurrentLocation,

                                            callerAccent: values.callerAccent,
                                            impediment: values.impediment,
                                            callerVoice: values.callerVoice,
                                            callerSpeech: values.callerSpeech,
                                            callerDiction: values.callerDiction,
                                            callerManner: values.callerManner,
                                            voiceRecognized: voiceRecognized,
                                            whoTheCallerWas:
                                                values.whoTheCallerWas,
                                            callerFamiliarWithArea:
                                                callerFamiliarWithArea,

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

                                        navigation.navigate(
                                            navigationStrings.BOMB_THEART_STEP_3,
                                            {
                                                type:
                                                    params.type && params.type,
                                                shiftReportID:
                                                    params.type &&
                                                    params.type === true
                                                        ? params.shiftReportID
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
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Accent:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerAccent',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerAccent
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerAccent
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Impediment:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'impediment',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.impediment
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.impediment
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Voice:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerVoice',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerVoice
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerVoice
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Speech:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerSpeech',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerSpeech
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerSpeech
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Diction:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerDiction',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerDiction
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerDiction
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Manner:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerManner',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerManner
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerManner
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Do you recognise the
                                                        voice?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        ISOtoggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={voiceRecognized}
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            {voiceRecognized && (
                                                <TextField
                                                    accessibilityLabel="Who do you think it was?"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'whoTheCallerWas',
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
                                                    value={
                                                        values.whoTheCallerWas
                                                    }
                                                    error={
                                                        errors
                                                            ? errors.whoTheCallerWas
                                                            : null
                                                    }
                                                />
                                            )}

                                            <SwitchHorizontalWrapper>
                                                <TextImageWrapper>
                                                    <TextWrapper
                                                        fontSize={fontSizeState}
                                                        textColor={colors.text}>
                                                        Is the Caller Familiar
                                                        with the Area?
                                                    </TextWrapper>
                                                </TextImageWrapper>

                                                <Switch
                                                    onValueChange={
                                                        isCallertoggleRememberPin
                                                    }
                                                    renderActiveText={false}
                                                    value={
                                                        callerFamiliarWithArea
                                                    }
                                                    renderInActiveText={false}
                                                />
                                            </SwitchHorizontalWrapper>

                                            {params.type &&
                                                params.type === true && (
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
                                                                                params.shiftReportID,
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
                                                                                params.shiftReportID,
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
                                                    onPress={() => {
                                                        setBack(values);
                                                    }}
                                                    fontSize={fontSizeState}
                                                    icon={back}
                                                    isIconLeft={true}
                                                />

                                                <ButtonSecondary
                                                    btnText={'Next'}
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                    fontSize={fontSizeState}
                                                    icon={next}
                                                    isIconLeft={false}
                                                />
                                            </BtnHorizontal>
                                        </View>
                                    )}
                                </Formik>
                            </MainWrapper>
                        </MainParentWrapper>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {!params.type &&
                navigation.setOptions({
                    headerRight: () => null,
                })}
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
        </BackgroundGlobal>
    );
};

export default withTheme(BombTheartStep2);

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

const BtnHorizontal = styled.View`
    flex-direction: row;
    margin-top: 40px;
    justify-content: space-between;
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

const TextFieldView = styled.View`
    width: 45%;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: auto;
`;
