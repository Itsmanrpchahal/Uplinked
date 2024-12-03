import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import { MainWrapper } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next } from '@root/utils/assets';
import {
    BackHandler,
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { Formik } from 'formik';
import navigationStrings from '../../../../navigation/navigationStrings';
import { ARM_HOLD_UP_1, setArmStep1 } from './helper';
import CustomTimePicker from '@root/components/TimePicker';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import { NotFound } from '../../../../utils/globalStyle';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import AppLoader from '../../../../utils/AppLoader';

const ArmedHoldUpStep1 = (props: any) => {
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    let hours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let minute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const {
        getArmedHoldUp,
        openModal,
        setArmedMultiStep,
        getShiftsReportsEntrieAttachments,
    } = useActions();

    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const {
        route: { params },
        navigation,
    } = props;
    const { armHoldUpData, loading }: any = useTypedSelector(
        (state) => state.armHoldUpData,
    );
    const { armedmultiStepdata }: any = useTypedSelector(
        (state) => state.armedmultiStepdata,
    );
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    useEffect(() => {
        if (params && params.editable) {
            getArmedHoldUp({ id: params.item.shiftReportID });
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
        if (params.trigger === 0) {
            setArmedMultiStep({
                reportTime: '',
                description: '',
                holdupDateTime: '',
                hat: '',
                hair: '',
                eyes: '',
                ears: '',
                nose: '',
                chin: '',
                complexion: '',
                shirt: '',
                tieOrScarf: '',
                coatOrJacket: '',
                gloves: '',
                pantsOrTrousers: '',
                socks: '',
                shoes: '',
                height: '',
                weight: '',
                handedDescription: '',
                physicalCharacteristicsDescription: '',
                weaponsAndEquipment: '',
                remarks: '',
                haveNote: false,
                noteDescription: '',
                influenceOfDrugsOrAlcohol: false,
                hasRobberTouchedAnything: false,
                touchDescription: '',
                haveDisguise: false,
                hasRobberUsedAContainer: false,
                hasLeftEvidence: false,
                evidenceDescription: '',
                containerDescription: '',
                influenceofDrugDescription: '',
                disguiseDescription: '',
                robberLeave: '',
                motorVehicle: '',
                make: '',
                model: '',
                color: '',
                distinguishingMarks: '',
                licenseNumber: '',
            });
        }
    }, []);

    useEffect(() => {
        if (params.trigger === 1 && Object.keys(armHoldUpData).length > 0) {
            set_MultiStep();
        }
    }, [armHoldUpData]);

    const set_MultiStep = async () => {
        await setArmedMultiStep({
            reportTime: armHoldUpData.reportTime,
            description: armHoldUpData.description,
            holdupDateTime: armHoldUpData.holdupDateTime,
            hat: armHoldUpData.hat,
            hair: armHoldUpData.hair,
            eyes: armHoldUpData.eyes,
            ears: armHoldUpData.ears,
            nose: armHoldUpData.nose,
            chin: armHoldUpData.chin,
            complexion: armHoldUpData.complexion,
            shirt: armHoldUpData.shirt,
            tieOrScarf: armHoldUpData.tieOrScarf,
            coatOrJacket: armHoldUpData.coatOrJacket,
            gloves: armHoldUpData.gloves,
            pantsOrTrousers: armHoldUpData.pantsOrTrousers,
            socks: armHoldUpData.socks,
            shoes: armHoldUpData.shoes,
            height: armHoldUpData.height,
            weight: armHoldUpData.weight,
            handedDescription: armHoldUpData.handedDescription,
            physicalCharacteristicsDescription:
                armHoldUpData.physicalCharacteristicsDescription,
            weaponsAndEquipment: armHoldUpData.weaponsAndEquipment,
            remarks: armHoldUpData.remarks,
            haveNote: armHoldUpData.haveNote,
            noteDescription: armHoldUpData.noteDescription,
            influenceOfDrugsOrAlcohol: armHoldUpData.influenceOfDrugsOrAlcohol,
            hasRobberTouchedAnything: armHoldUpData.hasRobberTouchedAnything,
            touchDescription: armHoldUpData.touchDescription,
            haveDisguise: armHoldUpData.haveDisguise,
            hasRobberUsedAContainer: armHoldUpData.hasRobberUsedAContainer,
            hasLeftEvidence: armHoldUpData.hasLeftEvidence,
            evidenceDescription: armHoldUpData.evidenceDescription,
            containerDescription: armHoldUpData.containerDescription,
            influenceofDrugDescription:
                armHoldUpData.influenceofDrugDescription,
            disguiseDescription: armHoldUpData.disguiseDescription,
            robberLeave: armHoldUpData.robberLeave,
            motorVehicle: armHoldUpData.motorVehicle,
            make: armHoldUpData.make,
            model: armHoldUpData.model,
            color: armHoldUpData.color,
            distinguishingMarks: armHoldUpData.distinguishingMarks,
            licenseNumber: armHoldUpData.licenseNumber,
        });
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
                                validationSchema={ARM_HOLD_UP_1}
                                enableReinitialize={true}
                                initialValues={{
                                    reportTime: armedmultiStepdata.reportTime,
                                    description: armedmultiStepdata.description,
                                    holdupDateTime:
                                        armedmultiStepdata.holdupDateTime,
                                    hat: armedmultiStepdata.hat,
                                    hair: armedmultiStepdata.hair,
                                    eyes: armedmultiStepdata.eyes,
                                    ears: armedmultiStepdata.ears,
                                    nose: armedmultiStepdata.nose,
                                    chin: armedmultiStepdata.chin,
                                    complexion: armedmultiStepdata.complexion,
                                    shirt: armedmultiStepdata.shirt,
                                    tieOrScarf: armedmultiStepdata.tieOrScarf,
                                    coatOrJacket:
                                        armedmultiStepdata.coatOrJacket,
                                    gloves: armedmultiStepdata.gloves,
                                    pantsOrTrousers:
                                        armedmultiStepdata.pantsOrTrousers,
                                    socks: armedmultiStepdata.socks,
                                    shoes: armedmultiStepdata.shoes,
                                }}
                                onSubmit={async (values) => {
                                    await setArmedMultiStep({
                                        reportTime: values.reportTime,
                                        description: values.description,
                                        holdupDateTime: values.holdupDateTime,
                                        hat: values.hat,
                                        hair: values.hair,
                                        eyes: values.eyes,
                                        ears: values.ears,
                                        nose: values.nose,
                                        chin: values.chin,
                                        complexion: values.complexion,
                                        shirt: values.shirt,
                                        tieOrScarf: values.tieOrScarf,
                                        coatOrJacket: values.coatOrJacket,
                                        gloves: values.gloves,
                                        pantsOrTrousers: values.pantsOrTrousers,
                                        socks: values.socks,
                                        shoes: values.shoes,
                                        height: armedmultiStepdata.height,
                                        weight: armedmultiStepdata.weight,
                                        handedDescription:
                                            armedmultiStepdata.handedDescription,
                                        physicalCharacteristicsDescription:
                                            armedmultiStepdata.physicalCharacteristicsDescription,
                                        weaponsAndEquipment:
                                            armedmultiStepdata.weaponsAndEquipment,
                                        remarks: armedmultiStepdata.remarks,
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
                                        navigationStrings.ARMED_HOLDUP_2,
                                        {
                                            type: params && params.editable,
                                            shiftReportID:
                                                params &&
                                                params.editable === true
                                                    ? params &&
                                                      params.item.shiftReportID
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
                                            <FormField>
                                                <TouchableOpacity
                                                    onPress={() =>
                                                        setVisibleTimer(true)
                                                    }>
                                                    <TextField
                                                        accessibilityLabel="Time of Occurrence:"
                                                        fontSize={fontSizeState}
                                                        editable={false}
                                                        value={
                                                            values.reportTime &&
                                                            values.reportTime
                                                        }
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
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
                                                    accessibilityLabel="Short Description:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'description',
                                                            value,
                                                        );
                                                    }}
                                                    value={values.description}
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    error={
                                                        errors
                                                            ? errors.description
                                                            : null
                                                    }
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <TitleText fontSize={fontSizeState}>
                                            Questions to ask Suspect
                                        </TitleText>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Time of Holdup:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'holdupDateTime',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        values.holdupDateTime
                                                    }
                                                    fontSize={fontSizeState}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Hat:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'hat',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.hat}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Hair:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'hair',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.hair}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Eyes:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'eyes',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.eyes}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Ears:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'ears',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.ears}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>
                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Nose:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'nose',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.nose}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Chin:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'chin',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.chin}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Complexion:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'complexion',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.complexion}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Shirt:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'shirt',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.shirt}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Tie or Scarf:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'tieOrScarf',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.tieOrScarf}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Coat or Jacket:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'coatOrJacket',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.coatOrJacket}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Gloves:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'gloves',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.gloves}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Pants or Trousers:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'pantsOrTrousers',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={
                                                        values.pantsOrTrousers
                                                    }
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Socks:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'socks',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.socks}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Shoes:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'shoes',
                                                            value,
                                                        );
                                                    }}
                                                    fontSize={fontSizeState}
                                                    value={values.shoes}
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        {params && params.editable && (
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

                                        {!params.editable &&
                                            navigation.setOptions({
                                                headerRight: () => null,
                                            })}

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
                                            showDateTimePicker={visibleTimer}
                                            time={
                                                params &&
                                                params.editable === true
                                                    ? params &&
                                                      params.item.reportDateTime
                                                    : ''
                                            }
                                            handlePickerData={(date: any) => {
                                                setVisibleTimer(false);
                                                let hours =
                                                    new Date(date)
                                                        .getHours()
                                                        .toString().length === 1
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
                                                        .toString().length === 1
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
                                            setDateTimePicker={setVisibleTimer}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </MainWrapper>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {params && params.editable && (
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

export default withTheme(ArmedHoldUpStep1);
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

const ButtonWrapper = styled.View`
    flex: 1;
    align-items: flex-end;
    margin-top: 16px;
    margin-bottom: 80px;
`;

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
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
