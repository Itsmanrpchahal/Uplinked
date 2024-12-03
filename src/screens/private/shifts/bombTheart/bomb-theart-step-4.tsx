import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import { Image, ScrollView, TouchableOpacity, View } from 'react-native';
import TextField from '@root/components/TextField';
import { arrowSend } from '@root/utils/assets';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { backgray, back } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { Formik } from 'formik';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import { useActions } from '@root/hooks/useActions';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';

const BombTheartStep4 = (props: any) => {
    const [location, setLocation] = useState<any>({});
    const {
        addBombThreat,
        setBombThreatMultiStep,
        updateBombThreat,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { bombThreatData, loading }: any = useTypedSelector(
        (state) => state.bombThreatData,
    );
    const { bombThreatmultiStepdata }: any = useTypedSelector(
        (state) => state.bombThreatmultiStepdata,
    );
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const {
        route: { params },
        navigation,
    } = props;
    useEffect(() => {
        getUserLoc();
    }, []);

    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };

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

            threatWording: bombThreatmultiStepdata.threatWording,
            reportCallTo: bombThreatmultiStepdata.reportCallTo,
            reportCallToPhone: bombThreatmultiStepdata.reportCallToPhone,
            callerEstimatedAge: bombThreatmultiStepdata.callerEstimatedAge,
            callTime: bombThreatmultiStepdata.callTime,
            callDuration: bombThreatmultiStepdata.callDuration,
            recipientName: bombThreatmultiStepdata.recipientName,
            recipientPhone: bombThreatmultiStepdata.recipientPhone,
            callerSex: bombThreatmultiStepdata.callerSex,
        });
        props.navigation.goBack();
    };

    return (
        <BackgroundGlobal>
            {shiftReportsEntriesAttachmentsLoading || loading ? (
                <AppLoader />
            ) : (
                <ScrollView>
                    <MainWrapper>
                        <Formik
                            enableReinitialize={true}
                            initialValues={{
                                shiftID: activeShift && activeShift.shiftID,
                            }}
                            onSubmit={async (values) => {
                                params.type === true
                                    ? await updateBombThreat({
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
                                          shiftReportID: params.shiftReportID,
                                          geoLocation: {
                                              latitude: location.latitude,
                                              longitude: location.longitude,
                                          },
                                      })
                                    : await addBombThreat({
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
                                          shiftID: values.shiftID,
                                          geoLocation: {
                                              latitude: location.latitude,
                                              longitude: location.longitude,
                                          },
                                      });
                                props.navigation.navigate(
                                    navigationStrings.TAB_BAR_HOME,
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
                                        Final Details
                                    </TitleText>

                                    <TextField
                                        accessibilityLabel="Signature:"
                                        onChangeText={(value: any) => {}}
                                        fontSize={fontSizeState}
                                        keyboardType={'default'}
                                        autoCapitalize={'none'}
                                        multiline={true}
                                        style={{
                                            minHeight: 80,
                                        }}
                                    />

                                    {params.type === true && (
                                        <ImageWrapper>
                                            {shiftReportsEntriesAttachments.length >
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
                                                    style={{ margin: 10 }}
                                                    source={backgray}></Image>
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
                                            btnText={'Submit'}
                                            fontSize={fontSizeState}
                                            onPress={() => {
                                                handleSubmit();
                                            }}
                                            icon={arrowSend}
                                            isIconLeft={false}
                                        />
                                    </BtnHorizontal>
                                </View>
                            )}
                        </Formik>
                    </MainWrapper>
                </ScrollView>
            )}

            {!params.type &&
                navigation.setOptions({
                    headerRight: () => null,
                })}
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
        </BackgroundGlobal>
    );
};

export default withTheme(BombTheartStep4);

type FontSizeProps = {
    fontSize: number;
};

type ImageWrapper__ImageProps = {
    width: number;
};

const ImageWrapper__Image = styled.View<ImageWrapper__ImageProps>`
    width: ${({ width }: any) => width / 6}px;
    height: ${({ width }: any) => width / 6}px;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    margin: 4px 4px 4px 4px;
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
    margin-bottom: 40px;
    justify-content: space-between;
`;

const TitleText = styled.Text`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    font-weight: 500;
    text-align: center;
`;
