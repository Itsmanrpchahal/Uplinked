import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import { MainWrapper } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { back, next, backgray } from '@root/utils/assets';
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
import navigationStrings from '../../../../navigation/navigationStrings';
import { ARM_HOLD_UP_3, setArmStep1 } from './helper';
import { Formik } from 'formik';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { NotFound } from '../../../../utils/globalStyle';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';

const ArmedHoldUpStep3 = (props: any) => {
    const { colors }: any = useTheme();
    const [note, setNote] = useState<boolean>(false);
    const [influenceOfDrugsOrAlcohol, setInfluenceOfDrugsOrAlcohol] =
        useState<boolean>(false);
    const [hasRobberTouchedAnything, setHasRobberTouchedAnything] =
        useState<boolean>(false);
    const [haveDisguise, setHaveDisguise] = useState<boolean>(false);
    const [hasRobberUsedAContainer, setHasRobberUsedAContainer] =
        useState<boolean>(false);
    const [hasLeftEvidence, setHasLeftEvidence] = useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { setArmedMultiStep, openModal, getShiftsReportsEntrieAttachments } =
        useActions();
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const {
        route: { params },
        navigation,
    } = props;
    const { armedmultiStepdata }: any = useTypedSelector(
        (state) => state.armedmultiStepdata,
    );
    const { armHoldUpData, loading }: any = useTypedSelector(
        (state) => state.armHoldUpData,
    );

    const notetoggleRememberPin = (value) => {
        setNote(value);
    };
    const influencetoggleRememberPin = (value) => {
        setInfluenceOfDrugsOrAlcohol(value);
    };
    const touchtoggleRememberPin = (value) => {
        setHasRobberTouchedAnything(value);
    };
    const disguisetoggleRememberPin = (value) => {
        setHaveDisguise(value);
    };
    const containertoggleRememberPin = (value) => {
        setHasRobberUsedAContainer(value);
    };
    const evedencetoggleRememberPin = (value) => {
        setHasLeftEvidence(value);
    };

    useEffect(() => {
        setNote(armedmultiStepdata.haveNote);
    }, [armedmultiStepdata.haveNote]);

    useEffect(() => {
        setInfluenceOfDrugsOrAlcohol(
            armedmultiStepdata.influenceOfDrugsOrAlcohol,
        );
    }, [armedmultiStepdata.influenceOfDrugsOrAlcohol]);

    useEffect(() => {
        setHasRobberTouchedAnything(
            armedmultiStepdata.hasRobberTouchedAnything,
        );
    }, [armedmultiStepdata.hasRobberTouchedAnything]);

    useEffect(() => {
        setHaveDisguise(armedmultiStepdata.haveDisguise);
    }, [armedmultiStepdata.haveDisguise]);

    useEffect(() => {
        setHasRobberUsedAContainer(armedmultiStepdata.hasRobberUsedAContainer);
    }, [armedmultiStepdata.hasRobberUsedAContainer]);

    useEffect(() => {
        setHasLeftEvidence(armedmultiStepdata.hasLeftEvidence);
    }, [armedmultiStepdata.hasLeftEvidence]);

    const setBack = async (values: any) => {
        await setArmedMultiStep({
            reportTime: armedmultiStepdata.reportTime,
            description: armedmultiStepdata.description,
            holdupDateTime: armedmultiStepdata.holdupDateTime,
            hat: armedmultiStepdata.hat,
            hair: armedmultiStepdata.hair,
            eyes: armedmultiStepdata.eyes,
            ears: armedmultiStepdata.ears,
            nose: armedmultiStepdata.nose,
            chin: armedmultiStepdata.chin,
            complexion: armedmultiStepdata.complexion,
            shirt: armedmultiStepdata.shirt,
            tieOrScarf: armedmultiStepdata.tieOrScarf,
            coatOrJacket: armedmultiStepdata.coatOrJacket,
            gloves: armedmultiStepdata.gloves,
            pantsOrTrousers: armedmultiStepdata.pantsOrTrousers,
            socks: armedmultiStepdata.socks,
            shoes: armedmultiStepdata.shoes,
            height: armedmultiStepdata.height,
            weight: armedmultiStepdata.weight,
            handedDescription: armedmultiStepdata.handedDescription,
            physicalCharacteristicsDescription:
                armedmultiStepdata.physicalCharacteristicsDescription,
            weaponsAndEquipment: armedmultiStepdata.weaponsAndEquipment,
            remarks: armedmultiStepdata.remarks,
            haveNote: values.haveNote,
            noteDescription: values.noteDescription,
            influenceOfDrugsOrAlcohol: values.influenceOfDrugsOrAlcohol,
            hasRobberTouchedAnything: values.hasRobberTouchedAnything,
            touchDescription: values.touchDescription,
            haveDisguise: values.haveDisguise,
            hasRobberUsedAContainer: values.hasRobberUsedAContainer,
            hasLeftEvidence: values.hasLeftEvidence,
            evidenceDescription: values.evidenceDescription,
            containerDescription: values.containerDescription,
            influenceofDrugDescription: values.influenceofDrugDescription,
            disguiseDescription: values.disguiseDescription,
            robberLeave: armedmultiStepdata.robberLeave,
            motorVehicle: armedmultiStepdata.motorVehicle,
            make: armedmultiStepdata.make,
            model: armedmultiStepdata.model,
            color: armedmultiStepdata.color,
            distinguishingMarks: armedmultiStepdata.distinguishingMarks,
            licenseNumber: armedmultiStepdata.licenseNumber,
        });
        props.navigation.pop();
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {loading || shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}>
                        <MainWrapper>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    haveNote: armedmultiStepdata.haveNote,
                                    description: armedmultiStepdata.description,
                                    noteDescription:
                                        armedmultiStepdata.noteDescription,
                                    influenceOfDrugsOrAlcohol:
                                        armedmultiStepdata.influenceOfDrugsOrAlcohol,
                                    hasRobberTouchedAnything:
                                        armedmultiStepdata.hasRobberTouchedAnything,
                                    touchDescription:
                                        armedmultiStepdata.touchDescription,
                                    haveDisguise:
                                        armedmultiStepdata.haveDisguise,
                                    hasRobberUsedAContainer:
                                        armedmultiStepdata.hasRobberUsedAContainer,
                                    hasLeftEvidence:
                                        armedmultiStepdata.hasLeftEvidence,
                                    evidenceDescription:
                                        armedmultiStepdata.evidenceDescription,
                                    containerDescription:
                                        armedmultiStepdata.containerDescription,
                                    influenceofDrugDescription:
                                        armedmultiStepdata.influenceofDrugDescription,
                                    disguiseDescription:
                                        armedmultiStepdata.disguiseDescription,
                                    robberLeave: armedmultiStepdata.robberLeave,
                                    motorVehicle:
                                        armedmultiStepdata.motorVehicle,
                                    make: armedmultiStepdata.make,
                                    model: armedmultiStepdata.model,
                                    color: armedmultiStepdata.color,
                                    distinguishingMarks:
                                        armedmultiStepdata.distinguishingMarks,
                                    licenseNumber:
                                        armedmultiStepdata.licenseNumber,
                                }}
                                onSubmit={async (values) => {
                                    await setArmedMultiStep({
                                        reportTime:
                                            armedmultiStepdata.reportTime,
                                        description:
                                            armedmultiStepdata.description,
                                        holdupDateTime:
                                            armedmultiStepdata.holdupDateTime,
                                        hat: armedmultiStepdata.hat,
                                        hair: armedmultiStepdata.hair,
                                        eyes: armedmultiStepdata.eyes,
                                        ears: armedmultiStepdata.ears,
                                        nose: armedmultiStepdata.nose,
                                        chin: armedmultiStepdata.chin,
                                        complexion:
                                            armedmultiStepdata.complexion,
                                        shirt: armedmultiStepdata.shirt,
                                        tieOrScarf:
                                            armedmultiStepdata.tieOrScarf,
                                        coatOrJacket:
                                            armedmultiStepdata.coatOrJacket,
                                        gloves: armedmultiStepdata.gloves,
                                        pantsOrTrousers:
                                            armedmultiStepdata.pantsOrTrousers,
                                        socks: armedmultiStepdata.socks,
                                        shoes: armedmultiStepdata.shoes,
                                        height: armedmultiStepdata.height,
                                        weight: armedmultiStepdata.weight,
                                        handedDescription:
                                            armedmultiStepdata.handedDescription,
                                        physicalCharacteristicsDescription:
                                            armedmultiStepdata.physicalCharacteristicsDescription,
                                        weaponsAndEquipment:
                                            armedmultiStepdata.weaponsAndEquipment,
                                        remarks: armedmultiStepdata.remarks,
                                        haveNote: note,
                                        noteDescription: values.noteDescription,
                                        influenceOfDrugsOrAlcohol:
                                            influenceOfDrugsOrAlcohol,
                                        hasRobberTouchedAnything:
                                            hasRobberTouchedAnything,
                                        touchDescription:
                                            hasRobberTouchedAnything === true
                                                ? values.touchDescription
                                                : '',
                                        haveDisguise: haveDisguise,
                                        hasRobberUsedAContainer:
                                            hasRobberUsedAContainer,
                                        hasLeftEvidence: hasLeftEvidence,
                                        evidenceDescription:
                                            hasLeftEvidence === true
                                                ? values.evidenceDescription
                                                : '',
                                        containerDescription:
                                            hasRobberUsedAContainer === true
                                                ? values.containerDescription
                                                : '',
                                        influenceofDrugDescription:
                                            influenceOfDrugsOrAlcohol === true
                                                ? values.influenceofDrugDescription
                                                : '',
                                        disguiseDescription:
                                            haveDisguise === true
                                                ? values.disguiseDescription
                                                : '',
                                        robberLeave:
                                            armedmultiStepdata.robberLeave,
                                        motorVehicle:
                                            armedmultiStepdata.motorVehicle,
                                        make: armedmultiStepdata.make,
                                        model: armedmultiStepdata.model,
                                        color: armedmultiStepdata.color,
                                        distinguishingMarks:
                                            armedmultiStepdata.distinguishingMarks,
                                        licenseNumber:
                                            armedmultiStepdata.licenseNumber,
                                    });
                                    props.navigation.navigate(
                                        navigationStrings.ARMED_HOLDUP_4,
                                        {
                                            type: params && params.type,
                                            shiftReportID:
                                                params.type === true
                                                    ? params &&
                                                      params.shiftReportID
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
                                            Further Description
                                        </TitleText>

                                        <TextTV fontS>Did the robber:</TextTV>
                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Have a note?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    notetoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={note}
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>

                                        {note && (
                                            <TextField
                                                accessibilityLabel="What was the note?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'noteDescription',
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
                                                value={values.noteDescription}
                                                error={
                                                    errors
                                                        ? errors.noteDescription
                                                        : null
                                                }
                                            />
                                        )}

                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Appear under the influence?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    influencetoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={
                                                    influenceOfDrugsOrAlcohol
                                                }
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>

                                        {influenceOfDrugsOrAlcohol && (
                                            <TextField
                                                accessibilityLabel="Description?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'influenceofDrugDescription',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={
                                                    values.influenceofDrugDescription
                                                }
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />
                                        )}

                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Touch Anything?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    touchtoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={hasRobberTouchedAnything}
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>
                                        {hasRobberTouchedAnything && (
                                            <TextField
                                                accessibilityLabel="What did he touch?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'touchDescription',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={values.touchDescription}
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />
                                        )}

                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Have a disguise?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    disguisetoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={haveDisguise}
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>

                                        {haveDisguise && (
                                            <TextField
                                                accessibilityLabel="What was the disguise Description?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'disguiseDescription',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={
                                                    values.disguiseDescription
                                                }
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />
                                        )}
                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Use a container?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    containertoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={hasRobberUsedAContainer}
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>

                                        {hasRobberUsedAContainer && (
                                            <TextField
                                                accessibilityLabel="What was the container Description?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'containerDescription',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={
                                                    values.containerDescription
                                                }
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />
                                        )}

                                        <SwitchHorizontalWrapper>
                                            <TextImageWrapper>
                                                <TextWrapper
                                                    fontSize={fontSizeState}
                                                    textColor={colors.text}>
                                                    Leave evidence?
                                                </TextWrapper>
                                            </TextImageWrapper>

                                            <Switch
                                                onValueChange={
                                                    evedencetoggleRememberPin
                                                }
                                                renderActiveText={false}
                                                value={hasLeftEvidence}
                                                renderInActiveText={false}
                                            />
                                        </SwitchHorizontalWrapper>

                                        {hasLeftEvidence && (
                                            <TextField
                                                accessibilityLabel="What was the evidence?"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'evidenceDescription',
                                                        value,
                                                    );
                                                }}
                                                fontSize={fontSizeState}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                value={
                                                    values.evidenceDescription
                                                }
                                                multiline={true}
                                                style={{
                                                    minHeight: 60,
                                                }}
                                            />
                                        )}

                                        {params && params.type && (
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

                                        {!params.type &&
                                            navigation.setOptions({
                                                headerRight: () => null,
                                            })}

                                        {navigation.setOptions({
                                            headerLeft: () => (
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setBack(values);
                                                    }}>
                                                    <Image
                                                        style={{ margin: 10 }}
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
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {params && params.type && (
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

export default withTheme(ArmedHoldUpStep3);
type FontSizeProps = {
    fontSize: number;
};
type TextColorProps = {
    textColor: string;
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
    margin-bottom: 80px;
    justify-content: space-between;
`;

const TextWrapper = styled.Text<TextColorProps, FontSizeProps>`
    color: ${({ textColor }: any) => textColor};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
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
    margin-top: 20px;
    justify-content: space-between;
    align-items: center;
    align-content: center;
    width: 100%;
`;

const TextTV = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 20px;
`;

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;
