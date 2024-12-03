import React, { useEffect, useState } from 'react';
import { withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    View,
} from 'react-native';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { arrowSend, back, backgray } from '@root/utils/assets';
import { Formik } from 'formik';
import { useActions } from '@root/hooks/useActions';
import {
    getUserLocation,
    actionsButtonIcons,
} from '../../../../utils/common-methods';
import { navigationRef } from '@root/navigation/RootNavigation';
import navigationStrings from '../../../../navigation/navigationStrings';
import { NotFound, NotFoundWrapper } from '@root/utils/globalStyle';
import ImageModal from 'react-native-image-modal';
import { FloatingAction } from 'react-native-floating-action';
import AppLoader from '../../../../utils/AppLoader';

const AccidentStep6 = (props: any) => {
    const {
        addAccident,
        setAccidentMultiStep,
        updateAccident,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { activeShift }: any = useTypedSelector((state) => state.activeShift);
    const { accidentData, loading }: any = useTypedSelector(
        (state) => state.accidentData,
    );
    const {
        createReportEntryLoading,
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { accidentmultiStepdata }: any = useTypedSelector(
        (state) => state.accidentmultiStepdata,
    );
    const [location, setLocation] = useState<any>({});

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
        await setAccidentMultiStep({
            reportTime: accidentmultiStepdata.reportTime,
            description: accidentmultiStepdata.description,
            location: accidentmultiStepdata.location,
            problemReporter: accidentmultiStepdata.problemReporter,
            accidentDateTime: accidentmultiStepdata.accidentDateTime,
            problemRectification: accidentmultiStepdata.problemRectification,
            reportedDateTime: accidentmultiStepdata.reportedDateTime,
            furtherAction: accidentmultiStepdata.furtherAction,
            referredToManager: accidentmultiStepdata.referredToManager,
            complainantName: accidentmultiStepdata.complainantName,
            complainantHomePhone: accidentmultiStepdata.complainantHomePhone,
            complainantWorkPhone: accidentmultiStepdata.complainantWorkPhone,
            complainantEmployer: accidentmultiStepdata.complainantEmployer,
            complainantMobile: accidentmultiStepdata.complainantMobile,
            complainantDOB: accidentmultiStepdata.complainantDOB,
            complainantAddress: accidentmultiStepdata.complainantAddress,
            offenderName: accidentmultiStepdata.offenderName,
            offenderHomePhone: accidentmultiStepdata.offenderHomePhone,
            offenderEmployer: accidentmultiStepdata.offenderEmployer,
            offenderWorkPhone: accidentmultiStepdata.offenderWorkPhone,
            offenderAddress: accidentmultiStepdata.offenderAddress,
            offenderMobile: accidentmultiStepdata.offenderMobile,
            offenderDOB: accidentmultiStepdata.offenderDOB,
            primaryWitnessName: accidentmultiStepdata.primaryWitnessName,
            primaryWitnessHomePhone:
                accidentmultiStepdata.primaryWitnessHomePhone,
            primaryWitnessEmployer:
                accidentmultiStepdata.primaryWitnessEmployer,
            primaryWitnessWorkPhone:
                accidentmultiStepdata.primaryWitnessWorkPhone,
            primaryWitnessAddress: accidentmultiStepdata.primaryWitnessAddress,
            primaryWitnessMobile: accidentmultiStepdata.primaryWitnessMobile,
            primaryWitnessDOB: accidentmultiStepdata.primaryWitnessDOB,
            secondaryWitnessName: accidentmultiStepdata.secondaryWitnessName,
            secondaryWitnessHomePhone:
                accidentmultiStepdata.secondaryWitnessHomePhone,
            secondaryWitnessEmployer:
                accidentmultiStepdata.secondaryWitnessEmployer,
            secondaryWitnessWorkPhone:
                accidentmultiStepdata.secondaryWitnessWorkPhone,
            secondaryWitnessAddress:
                accidentmultiStepdata.secondaryWitnessAddress,
            secondaryWitnessMobile:
                accidentmultiStepdata.secondaryWitnessMobile,
            secondaryWitnessDOB: accidentmultiStepdata.secondaryWitnessDOB,
            policeOfficerName: values.policeOfficerName,
            policeOfficerStation: values.policeOfficerStation,
            policeOfficerSection: values.policeOfficerSection,
        });
        props.navigation.pop();
    };

    return (
        <BackgroundGlobal>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS == 'ios' ? 'padding' : null}>
                {createReportEntryLoading ||
                shiftReportsEntriesAttachmentsLoading ||
                loading ? (
                    <AppLoader />
                ) : (
                    <ScrollView
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}>
                        <MainParentWrapper>
                            <MainWrapper>
                                <Formik
                                    enableReinitialize={true}
                                    initialValues={{
                                        policeOfficerName:
                                            accidentmultiStepdata.policeOfficerName,
                                        policeOfficerStation:
                                            accidentmultiStepdata.policeOfficerStation,
                                        policeOfficerSection:
                                            accidentmultiStepdata.policeOfficerSection,
                                        shiftID:
                                            activeShift && activeShift.shiftID,
                                    }}
                                    onSubmit={async (values) => {
                                        params && params.type === true
                                            ? await updateAccident({
                                                  reportTime:
                                                      accidentmultiStepdata.reportTime,
                                                  location:
                                                      accidentmultiStepdata.location,
                                                  problemReporter:
                                                      accidentmultiStepdata.problemReporter,
                                                  reportedDateTime:
                                                      accidentmultiStepdata.reportedDateTime,
                                                  description:
                                                      accidentmultiStepdata.description,
                                                  problemRectification:
                                                      accidentmultiStepdata.problemRectification,
                                                  accidentDateTime:
                                                      accidentmultiStepdata.accidentDateTime,
                                                  furtherAction:
                                                      accidentmultiStepdata.furtherAction,
                                                  referredToManager:
                                                      accidentmultiStepdata.referredToManager,
                                                  complainantName:
                                                      accidentmultiStepdata.complainantName,
                                                  complainantHomePhone:
                                                      accidentmultiStepdata.complainantHomePhone,
                                                  complainantWorkPhone:
                                                      accidentmultiStepdata.complainantWorkPhone,
                                                  complainantEmployer:
                                                      accidentmultiStepdata.complainantEmployer,
                                                  complainantMobile:
                                                      accidentmultiStepdata.complainantMobile,
                                                  complainantDOB:
                                                      accidentmultiStepdata.complainantDOB,
                                                  complainantAddress:
                                                      accidentmultiStepdata.complainantAddress,
                                                  offenderName:
                                                      accidentmultiStepdata.offenderName,
                                                  offenderHomePhone:
                                                      accidentmultiStepdata.offenderHomePhone,
                                                  offenderEmployer:
                                                      accidentmultiStepdata.offenderEmployer,
                                                  offenderWorkPhone:
                                                      accidentmultiStepdata.offenderWorkPhone,
                                                  offenderAddress:
                                                      accidentmultiStepdata.offenderAddress,
                                                  offenderMobile:
                                                      accidentmultiStepdata.offenderMobile,
                                                  offenderDOB:
                                                      accidentmultiStepdata.offenderDOB,
                                                  primaryWitnessName:
                                                      accidentmultiStepdata.primaryWitnessName,
                                                  primaryWitnessHomePhone:
                                                      accidentmultiStepdata.primaryWitnessHomePhone,
                                                  primaryWitnessEmployer:
                                                      accidentmultiStepdata.primaryWitnessEmployer,
                                                  primaryWitnessWorkPhone:
                                                      accidentmultiStepdata.primaryWitnessWorkPhone,
                                                  primaryWitnessAddress:
                                                      accidentmultiStepdata.primaryWitnessAddress,
                                                  primaryWitnessMobile:
                                                      accidentmultiStepdata.primaryWitnessMobile,
                                                  primaryWitnessDOB:
                                                      accidentmultiStepdata.primaryWitnessDOB,
                                                  secondaryWitnessName:
                                                      accidentmultiStepdata.secondaryWitnessName,
                                                  secondaryWitnessHomePhone:
                                                      accidentmultiStepdata.secondaryWitnessHomePhone,
                                                  secondaryWitnessEmployer:
                                                      accidentmultiStepdata.secondaryWitnessEmployer,
                                                  secondaryWitnessWorkPhone:
                                                      accidentmultiStepdata.secondaryWitnessWorkPhone,
                                                  secondaryWitnessAddress:
                                                      accidentmultiStepdata.secondaryWitnessAddress,
                                                  secondaryWitnessMobile:
                                                      accidentmultiStepdata.secondaryWitnessMobile,
                                                  secondaryWitnessDOB:
                                                      accidentmultiStepdata.secondaryWitnessDOB,
                                                  policeOfficerName:
                                                      values.policeOfficerName,
                                                  policeOfficerStation:
                                                      values.policeOfficerStation,
                                                  policeOfficerSection:
                                                      values.policeOfficerSection,
                                                  geoLocation: {
                                                      latitude:
                                                          location.latitude,
                                                      longitude:
                                                          location.longitude,
                                                  },
                                                  shiftReportID:
                                                      params.shiftReportID,
                                              })
                                            : await addAccident({
                                                  reportTime:
                                                      accidentmultiStepdata.reportTime,
                                                  location:
                                                      accidentmultiStepdata.location,
                                                  problemReporter:
                                                      accidentmultiStepdata.problemReporter,
                                                  reportedDateTime:
                                                      accidentmultiStepdata.reportedDateTime,
                                                  description:
                                                      accidentmultiStepdata.description,
                                                  problemRectification:
                                                      accidentmultiStepdata.problemRectification,
                                                  accidentDateTime:
                                                      accidentmultiStepdata.accidentDateTime,
                                                  furtherAction:
                                                      accidentmultiStepdata.furtherAction,
                                                  referredToManager:
                                                      accidentmultiStepdata.referredToManager,
                                                  complainantName:
                                                      accidentmultiStepdata.complainantName,
                                                  complainantHomePhone:
                                                      accidentmultiStepdata.complainantHomePhone,
                                                  complainantWorkPhone:
                                                      accidentmultiStepdata.complainantWorkPhone,
                                                  complainantEmployer:
                                                      accidentmultiStepdata.complainantEmployer,
                                                  complainantMobile:
                                                      accidentmultiStepdata.complainantMobile,
                                                  complainantDOB:
                                                      accidentmultiStepdata.complainantDOB,
                                                  complainantAddress:
                                                      accidentmultiStepdata.complainantAddress,
                                                  offenderName:
                                                      accidentmultiStepdata.offenderName,
                                                  offenderHomePhone:
                                                      accidentmultiStepdata.offenderHomePhone,
                                                  offenderEmployer:
                                                      accidentmultiStepdata.offenderEmployer,
                                                  offenderWorkPhone:
                                                      accidentmultiStepdata.offenderWorkPhone,
                                                  offenderAddress:
                                                      accidentmultiStepdata.offenderAddress,
                                                  offenderMobile:
                                                      accidentmultiStepdata.offenderMobile,
                                                  offenderDOB:
                                                      accidentmultiStepdata.offenderDOB,
                                                  primaryWitnessName:
                                                      accidentmultiStepdata.primaryWitnessName,
                                                  primaryWitnessHomePhone:
                                                      accidentmultiStepdata.primaryWitnessHomePhone,
                                                  primaryWitnessEmployer:
                                                      accidentmultiStepdata.primaryWitnessEmployer,
                                                  primaryWitnessWorkPhone:
                                                      accidentmultiStepdata.primaryWitnessWorkPhone,
                                                  primaryWitnessAddress:
                                                      accidentmultiStepdata.primaryWitnessAddress,
                                                  primaryWitnessMobile:
                                                      accidentmultiStepdata.primaryWitnessMobile,
                                                  primaryWitnessDOB:
                                                      accidentmultiStepdata.primaryWitnessDOB,
                                                  secondaryWitnessName:
                                                      accidentmultiStepdata.secondaryWitnessName,
                                                  secondaryWitnessHomePhone:
                                                      accidentmultiStepdata.secondaryWitnessHomePhone,
                                                  secondaryWitnessEmployer:
                                                      accidentmultiStepdata.secondaryWitnessEmployer,
                                                  secondaryWitnessWorkPhone:
                                                      accidentmultiStepdata.secondaryWitnessWorkPhone,
                                                  secondaryWitnessAddress:
                                                      accidentmultiStepdata.secondaryWitnessAddress,
                                                  secondaryWitnessMobile:
                                                      accidentmultiStepdata.secondaryWitnessMobile,
                                                  secondaryWitnessDOB:
                                                      accidentmultiStepdata.secondaryWitnessDOB,
                                                  policeOfficerName:
                                                      values.policeOfficerName,
                                                  policeOfficerStation:
                                                      values.policeOfficerStation,
                                                  policeOfficerSection:
                                                      values.policeOfficerSection,
                                                  geoLocation: {
                                                      latitude:
                                                          location.latitude,
                                                      longitude:
                                                          location.longitude,
                                                  },
                                                  shiftID: activeShift.shiftID,
                                              });
                                        navigationRef.current.navigate(
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
                                                Police Officer Attending:
                                            </TitleText>

                                            <TextField
                                                accessibilityLabel="Name:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'policeOfficerName',
                                                        value,
                                                    );
                                                }}
                                                value={values.policeOfficerName}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                fontSize={fontSizeState}
                                            />

                                            <HorizontalView>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Station:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'policeOfficerStation',
                                                                value,
                                                            );
                                                        }}
                                                        value={
                                                            values.policeOfficerStation
                                                        }
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Section:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'policeOfficerSection',
                                                                value,
                                                            );
                                                        }}
                                                        keyboardType={'default'}
                                                        value={
                                                            values.policeOfficerSection
                                                        }
                                                        autoCapitalize={'none'}
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            {params && params.type === true && (
                                                <ImageWrapper>
                                                    {shiftReportsEntriesAttachmentsLoading ? (
                                                        <NotFound
                                                            style={{
                                                                alignSelf:
                                                                    'center',
                                                            }}>
                                                            Loading...
                                                        </NotFound>
                                                    ) : shiftReportsEntriesAttachments.length >
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

                                                    {!shiftReportsEntriesAttachmentsLoading &&
                                                        shiftReportsEntriesAttachments.length >
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
                                                    btnText={'Submit'}
                                                    onPress={() =>
                                                        handleSubmit()
                                                    }
                                                    loading={
                                                        createReportEntryLoading
                                                    }
                                                    icon={arrowSend}
                                                    isIconLeft={false}
                                                    fontSize={fontSizeState}
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
            {params && params.type === true && (
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

export default withTheme(AccidentStep6);

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

const TitleText = styled.Text<FontSizeProps>`
    margin-top: 16px;
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    font-weight: 500;
    text-align: center;
`;
