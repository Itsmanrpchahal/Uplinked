import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
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
    TouchableOpacity,
    View,
} from 'react-native';
import navigationStrings from '../../../../navigation/navigationStrings';
import { Formik } from 'formik';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';

const ArmedHoldUpStep2 = (props: any) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { armedmultiStepdata }: any = useTypedSelector(
        (state) => state.armedmultiStepdata,
    );
    const { openModal, setArmedMultiStep, getShiftsReportsEntrieAttachments } =
        useActions();
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const {
        route: { params },
        navigation,
    } = props;

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
            height: values.height,
            weight: values.weight,
            handedDescription: values.handedDescription,
            physicalCharacteristicsDescription:
                values.physicalCharacteristicsDescription,
            weaponsAndEquipment: values.weaponsAndEquipment,
            remarks: values.remarks,
            haveNote: armedmultiStepdata.haveNote,
            noteDescription: armedmultiStepdata.noteDescription,
            influenceOfDrugsOrAlcohol:
                armedmultiStepdata.influenceOfDrugsOrAlcohol,
            hasRobberTouchedAnything:
                armedmultiStepdata.hasRobberTouchedAnything,
            touchDescription: armedmultiStepdata.touchDescription,
            haveDisguise: armedmultiStepdata.haveDisguise,
            hasRobberUsedAContainer: armedmultiStepdata.hasRobberUsedAContainer,
            hasLeftEvidence: armedmultiStepdata.hasLeftEvidence,
            evidenceDescription: armedmultiStepdata.evidenceDescription,
            containerDescription: armedmultiStepdata.containerDescription,
            influenceofDrugDescription:
                armedmultiStepdata.influenceofDrugDescription,
            disguiseDescription: armedmultiStepdata.influenceofDrugDescription,
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
                {shiftReportsEntriesAttachmentsLoading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}>
                        <MainWrapper>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
                                    height: armedmultiStepdata.height,
                                    weight: armedmultiStepdata.weight,
                                    handedDescription:
                                        armedmultiStepdata.handedDescription,
                                    physicalCharacteristicsDescription:
                                        armedmultiStepdata.physicalCharacteristicsDescription,
                                    weaponsAndEquipment:
                                        armedmultiStepdata.weaponsAndEquipment,
                                    remarks: armedmultiStepdata.remarks,
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
                                        height: values.height,
                                        weight: values.weight,
                                        handedDescription:
                                            values.handedDescription,
                                        physicalCharacteristicsDescription:
                                            values.physicalCharacteristicsDescription,
                                        weaponsAndEquipment:
                                            values.weaponsAndEquipment,
                                        remarks: values.remarks,
                                        haveNote: armedmultiStepdata.haveNote,
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
                                        navigationStrings.ARMED_HOLDUP_3,
                                        {
                                            type: params && params.type,
                                            shiftReportID:
                                                params && params.type === true
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

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Height:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'height',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    value={values.height}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Weight:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'weight',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    value={values.weight}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Left or Right handed:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'handedDescription',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    value={
                                                        values.handedDescription
                                                    }
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <TextField
                                            accessibilityLabel="Physical Characteristics:"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'physicalCharacteristicsDescription',
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
                                                values.physicalCharacteristicsDescription
                                            }
                                        />
                                        <TextField
                                            accessibilityLabel="Weapons and Equipment:"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'weaponsAndEquipment',
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
                                            value={values.weaponsAndEquipment}
                                        />
                                        <TextField
                                            accessibilityLabel="Remarks:"
                                            onChangeText={(value: any) => {
                                                setFieldValue('remarks', value);
                                            }}
                                            fontSize={fontSizeState}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            multiline={true}
                                            style={{
                                                minHeight: 60,
                                            }}
                                            value={values.remarks}
                                        />

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
                                        {!params.type &&
                                            navigation.setOptions({
                                                headerRight: () => null,
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

export default withTheme(ArmedHoldUpStep2);
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
    margin-bottom: 80px;
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

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;
