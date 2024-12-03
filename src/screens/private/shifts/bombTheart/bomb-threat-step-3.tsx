import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
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
import { backgray } from '@root/utils/assets';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next, back } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { Formik } from 'formik';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';

const BombTheartStep3 = (props: any) => {
    const [calltime, setCallTime] = useState<any>('');
    const [callerSex, setCallerSex] = useState('');
    const [visible, setVisible] = useState(false);

    const hideMenu = () => setVisible(false);

    const showMenu = () => setVisible(true);
    const data = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
    ];
    const {
        route: { params },
        navigation,
    } = props;
    const {
        setBombThreatMultiStep,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { modeState } = useTypedSelector((state) => state.mode);
    const { bombThreatmultiStepdata }: any = useTypedSelector(
        (state) => state.bombThreatmultiStepdata,
    );
    const { bombThreatData, loading }: any = useTypedSelector(
        (state) => state.bombThreatData,
    );
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);

    useEffect(() => {
        setCallTime(calltime);
    }, [calltime]);

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

            callerAccent: bombThreatmultiStepdata.callerAccent,
            impediment: bombThreatmultiStepdata.impediment,
            callerVoice: bombThreatmultiStepdata.callerVoice,
            callerSpeech: bombThreatmultiStepdata.callerSpeech,
            callerDiction: bombThreatmultiStepdata.callerDiction,
            callerManner: bombThreatmultiStepdata.callerManner,
            voiceRecognized: bombThreatmultiStepdata.voiceRecognized,
            whoTheCallerWas: bombThreatmultiStepdata.whoTheCallerWas,
            callerFamiliarWithArea:
                bombThreatmultiStepdata.callerFamiliarWithArea,

            threatWording: values.threatWording,
            reportCallTo: values.reportCallTo,
            reportCallToPhone: values.reportCallToPhone,
            callerEstimatedAge: parseInt(values.callerEstimatedAge),
            callTime: values.callTime,
            callDuration: values.callDuration,
            recipientName: values.recipientName,
            recipientPhone: values.recipientPhone,
            callerSex: values.callerSex,
        });
        props.navigation.goBack();
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {shiftReportsEntriesAttachmentsLoading || loading ? (
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
                                        threatWording:
                                            bombThreatmultiStepdata.threatWording,
                                        reportCallTo:
                                            bombThreatmultiStepdata.reportCallTo,
                                        reportCallToPhone:
                                            bombThreatmultiStepdata.reportCallToPhone,
                                        callerEstimatedAge:
                                            bombThreatmultiStepdata.callerEstimatedAge.toString(),
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

                                            threatWording: values.threatWording,
                                            reportCallTo: values.reportCallTo,
                                            reportCallToPhone:
                                                values.reportCallToPhone,
                                            callerEstimatedAge: parseInt(
                                                values.callerEstimatedAge,
                                            ),
                                            callTime: values.callTime,
                                            callDuration: values.callDuration,
                                            recipientName: values.recipientName,
                                            recipientPhone:
                                                values.recipientPhone,
                                            callerSex: values.callerSex,
                                        });

                                        props.navigation.navigate(
                                            navigationStrings.BOMB_THEART_STEP_4,
                                            {
                                                type: params.type,
                                                shiftReportID:
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
                                            <TitleText fontSize={fontSizeState}>
                                                Further Information
                                            </TitleText>

                                            <TextField
                                                accessibilityLabel="Exact wording of threat:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'threatWording',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                fontSize={fontSizeState}
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                value={values.threatWording}
                                                error={
                                                    errors
                                                        ? errors.threatWording
                                                        : null
                                                }
                                            />

                                            <TitleText fontSize={fontSizeState}>
                                                Action
                                            </TitleText>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Report call to:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'reportCallTo',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.reportCallTo
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.reportCallTo
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Contact Number:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'reportCallToPhone',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.reportCallToPhone
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.reportCallToPhone
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TitleText fontSize={fontSizeState}>
                                                Other
                                            </TitleText>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            showMenu();
                                                        }}>
                                                        <TextField
                                                            accessibilityLabel="Sex of Caller:"
                                                            editable={false}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            value={
                                                                values.callerSex
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                    <Menu
                                                        style={{
                                                            backgroundColor:
                                                                modeState ===
                                                                true
                                                                    ? Platform.OS ===
                                                                      'ios'
                                                                        ? '#FFFFFF'
                                                                        : '#000000'
                                                                    : Platform.OS ===
                                                                      'ios'
                                                                    ? '#FFFFFF'
                                                                    : '#000000',
                                                        }}
                                                        visible={visible}
                                                        onRequestClose={
                                                            hideMenu
                                                        }>
                                                        <MenuItem
                                                            onPress={() => {
                                                                hideMenu(),
                                                                    setCallerSex(
                                                                        'Male',
                                                                    ),
                                                                    setFieldValue(
                                                                        'callerSex',
                                                                        'Male',
                                                                    );
                                                            }}>
                                                            Male
                                                        </MenuItem>
                                                        <MenuItem
                                                            onPress={() => {
                                                                hideMenu(),
                                                                    setCallerSex(
                                                                        'Female',
                                                                    ),
                                                                    setFieldValue(
                                                                        'callerSex',
                                                                        'Female',
                                                                    );
                                                            }}>
                                                            Female
                                                        </MenuItem>
                                                    </Menu>
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Estimated Age:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callerEstimatedAge',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'numeric'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callerEstimatedAge
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callerEstimatedAge
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TitleText fontSize={fontSizeState}>
                                                Call Details
                                            </TitleText>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Time of Call:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callTime',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={values.callTime}
                                                        error={
                                                            errors
                                                                ? errors.callTime
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Call Duration:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'callDuration',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.callDuration
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.callDuration
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            <TitleText fontSize={fontSizeState}>
                                                Recipient:
                                            </TitleText>

                                            <HorizontalView>
                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Recipient Name:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'recipientName',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.recipientName
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.recipientName
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>

                                                <TextFieldView>
                                                    <TextField
                                                        accessibilityLabel="Contact Number:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'recipientPhone',
                                                                value,
                                                            );
                                                        }}
                                                        fontSize={fontSizeState}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.recipientPhone
                                                        }
                                                        error={
                                                            errors
                                                                ? errors.recipientPhone
                                                                : null
                                                        }
                                                    />
                                                </TextFieldView>
                                            </HorizontalView>

                                            {params.type === true && (
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
                                                    icon={back}
                                                    fontSize={fontSizeState}
                                                    isIconLeft={true}
                                                />

                                                <ButtonSecondary
                                                    btnText={'Next'}
                                                    onPress={() => {
                                                        handleSubmit();
                                                    }}
                                                    icon={next}
                                                    fontSize={fontSizeState}
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
            {!params.type &&
                navigation.setOptions({
                    headerRight: () => null,
                })}
        </BackgroundGlobal>
    );
};

export default withTheme(BombTheartStep3);

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

const BtnHorizontal = styled.View`
    flex-direction: row;
    margin-top: 40px;
    margin-bottom: 80px;
    justify-content: space-between;
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

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    font-weight: 500;
    text-align: center;
`;
