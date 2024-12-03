import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import { MainWrapper, Divider } from '@root/utils/globalStyle';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { back, arrowSend, backgray } from '@root/utils/assets';
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
import { setArmStep1 } from './helper';
import { Formik } from 'formik';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import {
    getUserLocation,
    actionsButtonIcons,
} from '@root/utils/common-methods';
import ImageModal from 'react-native-image-modal';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import { useActions } from '@root/hooks/useActions';
import { navigationRef } from '@root/navigation/RootNavigation';
import { FloatingAction } from 'react-native-floating-action';
import AppLoader from '../../../../utils/AppLoader';

const ArmedHoldUpStep4 = (props: any) => {
    const [vehicle, setVehicle] = useState(false);
    const [foot, setFoot] = useState(false);
    const [car, setCar] = useState(false);
    const [motorCycle, setMotorCycle] = useState(false);
    const [robberLeave, setRobberLeave] = useState('');
    const [motorVehicle, setMotorVehicle] = useState('');
    const [make, setMake] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [distinguishingMarks, setDistinguishingMarks] = useState('');
    const [licenseNumber, setLicenseNumber] = useState('');
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const {
        setArmedHoldUp,
        getArmedHoldUp,
        updateArmedHoldUp,
        openModal,
        setArmedMultiStep,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { armedmultiStepdata }: any = useTypedSelector(
        (state) => state.armedmultiStepdata,
    );
    const { armHoldUpData, loading }: any = useTypedSelector(
        (state) => state.armHoldUpData,
    );
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    const [location, setLocation] = useState<any>({});
    const getUserLoc = async () => {
        const data = await getUserLocation();
        setLocation(data);
    };
    const {
        route: { params },
        navigation,
    } = props;

    useEffect(() => {
        getUserLoc();
    }, []);

    useEffect(() => {
        armedmultiStepdata.motorVehicle === 'motorCycle' && setMotorCycle(true);
        armedmultiStepdata.motorVehicle === 'car' && setCar(true);
    }, [armedmultiStepdata.vehicle]);

    useEffect(() => {
        armedmultiStepdata.robberLeave === 'vehicle' && setVehicle(true);
        armedmultiStepdata.robberLeave === 'foot' && setFoot(true);
    }, [armedmultiStepdata.robberLeave]);

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
            disguiseDescription: armedmultiStepdata.disguiseDescription,
            robberLeave: values.robberLeave,
            motorVehicle: values.motorVehicle,
            make: values.make,
            model: values.model,
            color: values.color,
            distinguishingMarks: values.distinguishingMarks,
            licenseNumber: values.licenseNumber,
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
                                    shiftID: activeShift && activeShift.shiftID,
                                    geoLocation: {
                                        latitude: location.latitude,
                                        longitude: location.longitude,
                                    },
                                }}
                                onSubmit={async (values) => {
                                    params.type === false
                                        ? await setArmedHoldUp({
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
                                              remarks:
                                                  armedmultiStepdata.remarks,
                                              haveNote:
                                                  armedmultiStepdata.haveNote,
                                              noteDescription:
                                                  armedmultiStepdata.noteDescription,
                                              influenceOfDrugsOrAlcohol:
                                                  armedmultiStepdata.influenceOfDrugsOrAlcohol,
                                              influenceofDrugDescription:
                                                  armedmultiStepdata.influenceofDrugDescription,
                                              hasRobberTouchedAnything:
                                                  armedmultiStepdata.hasRobberTouchedAnything,
                                              touchDescription:
                                                  armedmultiStepdata.touchDescription,
                                              haveDisguise:
                                                  armedmultiStepdata.haveDisguise,
                                              disguiseDescription:
                                                  armedmultiStepdata.disguiseDescription,
                                              hasRobberUsedAContainer:
                                                  armedmultiStepdata.hasRobberUsedAContainer,
                                              containerDescription:
                                                  armedmultiStepdata.containerDescription,
                                              hasLeftEvidence:
                                                  armedmultiStepdata.hasLeftEvidence,
                                              evidenceDescription:
                                                  armedmultiStepdata.evidenceDescription,
                                              robberLeave: values.robberLeave,
                                              motorVehicle: values.motorVehicle,
                                              make: values.make,
                                              model: values.model,
                                              color: values.color,
                                              distinguishingMarks:
                                                  values.distinguishingMarks,
                                              licenseNumber:
                                                  values.licenseNumber,
                                              geoLocation: {
                                                  latitude: location.latitude,
                                                  longitude: location.longitude,
                                              },
                                              shiftID:
                                                  activeShift &&
                                                  activeShift.shiftID,
                                          })
                                        : await updateArmedHoldUp({
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
                                              remarks:
                                                  armedmultiStepdata.remarks,
                                              haveNote:
                                                  armedmultiStepdata.haveNote,
                                              noteDescription:
                                                  armedmultiStepdata.noteDescription,
                                              influenceOfDrugsOrAlcohol:
                                                  armedmultiStepdata.influenceOfDrugsOrAlcohol,
                                              influenceofDrugDescription:
                                                  armedmultiStepdata.influenceofDrugDescription,
                                              hasRobberTouchedAnything:
                                                  armedmultiStepdata.hasRobberTouchedAnything,
                                              touchDescription:
                                                  armedmultiStepdata.touchDescription,
                                              haveDisguise:
                                                  armedmultiStepdata.haveDisguise,
                                              disguiseDescription:
                                                  armedmultiStepdata.disguiseDescription,
                                              hasRobberUsedAContainer:
                                                  armedmultiStepdata.hasRobberUsedAContainer,
                                              containerDescription:
                                                  armedmultiStepdata.containerDescription,
                                              hasLeftEvidence:
                                                  armedmultiStepdata.hasLeftEvidence,
                                              evidenceDescription:
                                                  armedmultiStepdata.evidenceDescription,
                                              robberLeave: values.robberLeave,
                                              motorVehicle: values.motorVehicle,
                                              make: values.make,
                                              model: values.model,
                                              color: values.color,
                                              distinguishingMarks:
                                                  values.distinguishingMarks,
                                              licenseNumber:
                                                  values.licenseNumber,
                                              geoLocation: {
                                                  latitude: location.latitude,
                                                  longitude: location.longitude,
                                              },
                                              shiftReportID:
                                                  params.shiftReportID,
                                          });

                                    navigationRef.current.navigate(
                                        navigationStrings.TAB_BAR_HOME,
                                    );
                                }}>
                                {({ setFieldValue, handleSubmit, values }) => (
                                    <View>
                                        <TitleText fontSize={fontSizeState}>
                                            Method of Operation Continued
                                        </TitleText>

                                        <CheckBoxMainView>
                                            <TitleLabel
                                                fontSize={fontSizeState}>
                                                How did the robber leave:
                                            </TitleLabel>
                                        </CheckBoxMainView>

                                        <CheckBoxBackground>
                                            <CheckView>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVehicle(!vehicle);
                                                        setFoot(false);
                                                        setRobberLeave(
                                                            'vehicle',
                                                        );
                                                        setFieldValue(
                                                            'robberLeave',
                                                            'vehicle',
                                                        );
                                                    }}>
                                                    <Image
                                                        source={
                                                            vehicle === true
                                                                ? require('@root/assets/check/check.png')
                                                                : require('@root/assets/uncheck/checkuncheck.png')
                                                        }
                                                    />
                                                </TouchableOpacity>
                                                <TitleLabel
                                                    fontSize={fontSizeState}>
                                                    {' '}
                                                    In a vehicle
                                                </TitleLabel>
                                            </CheckView>
                                            <Divider />
                                            <CheckView>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setFoot(!foot);
                                                        setVehicle(false);
                                                        setRobberLeave('foot');
                                                        setFieldValue(
                                                            'robberLeave',
                                                            'foot',
                                                        );
                                                        setMake('');
                                                        setModel('');
                                                        setColor('');
                                                        setMotorVehicle('');
                                                        setDistinguishingMarks(
                                                            '',
                                                        );
                                                        setLicenseNumber('');
                                                    }}>
                                                    <Image
                                                        source={
                                                            foot === true
                                                                ? require('@root/assets/check/check.png')
                                                                : require('@root/assets/uncheck/checkuncheck.png')
                                                        }
                                                    />
                                                </TouchableOpacity>

                                                <TitleLabel
                                                    fontSize={fontSizeState}>
                                                    {' '}
                                                    On foot{' '}
                                                </TitleLabel>
                                            </CheckView>
                                            <Divider />
                                        </CheckBoxBackground>

                                        {vehicle && (
                                            <View>
                                                <CheckBoxMainView>
                                                    <TitleLabel
                                                        fontSize={
                                                            fontSizeState
                                                        }>
                                                        Vehicle Details
                                                    </TitleLabel>
                                                </CheckBoxMainView>
                                                <CheckBoxBackground>
                                                    <CheckView>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setCar(!car);
                                                                setMotorCycle(
                                                                    false,
                                                                );
                                                                setMotorVehicle(
                                                                    'car',
                                                                );
                                                                setFieldValue(
                                                                    'motorVehicle',
                                                                    'car',
                                                                );
                                                            }}>
                                                            <Image
                                                                source={
                                                                    car === true
                                                                        ? require('@root/assets/check/check.png')
                                                                        : require('@root/assets/uncheck/checkuncheck.png')
                                                                }
                                                            />
                                                        </TouchableOpacity>

                                                        <TitleLabel>
                                                            {' '}
                                                            Car
                                                        </TitleLabel>
                                                    </CheckView>
                                                    <Divider />
                                                    <CheckView>
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setMotorCycle(
                                                                    !motorCycle,
                                                                );
                                                                setCar(false);
                                                                setMotorVehicle(
                                                                    'motorCycle',
                                                                );
                                                                setFieldValue(
                                                                    'motorVehicle',
                                                                    'motorCycle',
                                                                );
                                                            }}>
                                                            <Image
                                                                source={
                                                                    motorCycle ===
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
                                                            Motorcycle{' '}
                                                        </TitleLabel>
                                                    </CheckView>
                                                    <Divider />
                                                </CheckBoxBackground>

                                                <TitleText
                                                    fontSize={fontSizeState}>
                                                    Vehicle Description:
                                                </TitleText>

                                                <HorizontalView>
                                                    <FormField>
                                                        <TextField
                                                            accessibilityLabel="Make:"
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setMake(value);
                                                                setFieldValue(
                                                                    'make',
                                                                    value,
                                                                );
                                                            }}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            value={values.make}
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                        />
                                                    </FormField>
                                                    <FormField>
                                                        <TextField
                                                            accessibilityLabel="Model:"
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setModel(value);
                                                                setFieldValue(
                                                                    'model',
                                                                    value,
                                                                );
                                                            }}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            value={values.model}
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                        />
                                                    </FormField>
                                                </HorizontalView>

                                                <HorizontalView>
                                                    <FormField>
                                                        <TextField
                                                            accessibilityLabel="Color:"
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setColor(value);
                                                                setFieldValue(
                                                                    'color',
                                                                    value,
                                                                );
                                                            }}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            value={values.color}
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                        />
                                                    </FormField>
                                                    <FormField>
                                                        <TextField
                                                            accessibilityLabel="Distinguishing Marks:"
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setDistinguishingMarks(
                                                                    value,
                                                                );
                                                                setFieldValue(
                                                                    'distinguishingMarks',
                                                                    value,
                                                                );
                                                            }}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            value={
                                                                values.distinguishingMarks
                                                            }
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                        />
                                                    </FormField>
                                                </HorizontalView>

                                                <HorizontalView>
                                                    <FormField>
                                                        <TextField
                                                            accessibilityLabel="License Number:"
                                                            onChangeText={(
                                                                value: any,
                                                            ) => {
                                                                setFieldValue(
                                                                    'licenseNumber',
                                                                    value,
                                                                );
                                                                setLicenseNumber(
                                                                    value,
                                                                );
                                                            }}
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                            value={
                                                                values.licenseNumber
                                                            }
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                        />
                                                    </FormField>
                                                </HorizontalView>
                                            </View>
                                        )}
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
                                                btnText={'Submit'}
                                                onPress={() => {
                                                    handleSubmit();
                                                }}
                                                icon={arrowSend}
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

export default withTheme(ArmedHoldUpStep4);

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
    margin-bottom: 80px;
    justify-content: space-between;
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

const CheckView = styled.View`
    flex-direction: row;
    align-items: center;
    padding: 10px;
`;

const CheckBoxBackground = styled.View`
    background: #29313e;
    padding: 10px 0 0 0;
`;

const TitleLabel = styled.Text`
    padding-right: 10px;
    font-weight: 600;
    margin-top: 5px;
    color: ${({ theme }: any) => theme.colors.text};
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

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;
