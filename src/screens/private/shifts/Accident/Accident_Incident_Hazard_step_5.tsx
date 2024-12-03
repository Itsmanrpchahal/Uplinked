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
import { MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next, back, backgray } from '@root/utils/assets';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { useActions } from '@root/hooks/useActions';
import navigationStrings from '../../../../navigation/navigationStrings';
import CustomDatePicker from '../../../../components/DatePicker';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import { NotFound } from '../../../../utils/globalStyle';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';

const AccidentStep5 = (props: any) => {
    const [visibleDate, setVisibleDate] = useState<boolean>(false);
    const [secondaryWitnessDOB, setSecondaryWitnessDOB] = useState(null);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        setAccidentMultiStep,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { accidentmultiStepdata }: any = useTypedSelector(
        (state) => state.accidentmultiStepdata,
    );
    const {
        route: { params },
        navigation,
    } = props;
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    useEffect(() => {
        if (params && params.type === true) {
        }
    }, []);

    useEffect(() => {
        setSecondaryWitnessDOB(accidentmultiStepdata.secondaryWitnessDOB);
    }, [accidentmultiStepdata.secondaryWitnessDOB]);

    const setBack = async (values: any, type: string) => {
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
            secondaryWitnessName: values.secondaryWitnessName,
            secondaryWitnessHomePhone: values.secondaryWitnessHomePhone,
            secondaryWitnessEmployer: values.secondaryWitnessEmployer,
            secondaryWitnessWorkPhone: values.secondaryWitnessWorkPhone,
            secondaryWitnessAddress: values.secondaryWitnessAddress,
            secondaryWitnessMobile: values.secondaryWitnessMobile,
            secondaryWitnessDOB: values.secondaryWitnessDOB,
            policeOfficerName: accidentmultiStepdata.policeOfficerName,
            policeOfficerStation: accidentmultiStepdata.policeOfficerStation,
            policeOfficerSection: accidentmultiStepdata.policeOfficerSection,
        });

        type === 'back'
            ? props.navigation.pop()
            : navigation.navigate(navigationStrings.ACCIDENT_STEP_6, {
                  type: params && params.type,
                  shiftReportID:
                      params && params.type === true
                          ? params && params.shiftReportID
                          : '',
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
                        nestedScrollEnabled={true}
                        showsVerticalScrollIndicator={false}>
                        <MainWrapper>
                            <Formik
                                enableReinitialize={true}
                                initialValues={{
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
                                }}
                                onSubmit={async (values) => {
                                    setBack(values, 'go');
                                }}>
                                {({
                                    setFieldValue,
                                    handleSubmit,
                                    errors,
                                    values,
                                }) => (
                                    <View>
                                        <TitleText fontSize={fontSizeState}>
                                            Witness 2 Information
                                        </TitleText>

                                        <TextField
                                            accessibilityLabel="Name:"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'secondaryWitnessName',
                                                    value,
                                                );
                                            }}
                                            value={values.secondaryWitnessName}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            fontSize={fontSizeState}
                                        />

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Contact No. (Home):"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'secondaryWitnessHomePhone',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        values.secondaryWitnessHomePhone
                                                    }
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    fontSize={fontSizeState}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Employer:"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'secondaryWitnessEmployer',
                                                            value,
                                                        );
                                                    }}
                                                    keyboardType={'default'}
                                                    value={
                                                        values.secondaryWitnessEmployer
                                                    }
                                                    autoCapitalize={'none'}
                                                    fontSize={fontSizeState}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <HorizontalView>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Contact No. (Work):"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'secondaryWitnessWorkPhone',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        values.secondaryWitnessWorkPhone
                                                    }
                                                    keyboardType={'default'}
                                                    autoCapitalize={'none'}
                                                    fontSize={fontSizeState}
                                                />
                                            </FormField>
                                            <FormField>
                                                <TextField
                                                    accessibilityLabel="Contact No. (Mobile):"
                                                    onChangeText={(
                                                        value: any,
                                                    ) => {
                                                        setFieldValue(
                                                            'secondaryWitnessMobile',
                                                            value,
                                                        );
                                                    }}
                                                    keyboardType={'default'}
                                                    value={
                                                        values.secondaryWitnessMobile
                                                    }
                                                    autoCapitalize={'none'}
                                                    fontSize={fontSizeState}
                                                />
                                            </FormField>
                                        </HorizontalView>

                                        <TextField
                                            accessibilityLabel="Address:"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'secondaryWitnessAddress',
                                                    value,
                                                );
                                            }}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            multiline={true}
                                            value={
                                                values.secondaryWitnessAddress
                                            }
                                            style={{
                                                minHeight: 40,
                                            }}
                                            fontSize={fontSizeState}
                                        />

                                        <HorizontalView>
                                            <FormField>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setVisibleDate(true);
                                                    }}>
                                                    <TextField
                                                        accessibilityLabel="Date of birth:"
                                                        keyboardType={'default'}
                                                        editable={false}
                                                        defaultValue={
                                                            values.secondaryWitnessDOB &&
                                                            format(
                                                                new Date(
                                                                    values.secondaryWitnessDOB,
                                                                ),
                                                                'dd/MM/yyyy',
                                                            )
                                                        }
                                                        autoCapitalize={'none'}
                                                        fontSize={fontSizeState}
                                                    />
                                                </TouchableOpacity>
                                            </FormField>
                                        </HorizontalView>
                                        {params && params.type === true && (
                                            <ImageWrapper>
                                                {shiftReportsEntriesAttachmentsLoading ? (
                                                    <NotFound
                                                        style={{
                                                            alignSelf: 'center',
                                                        }}>
                                                        Loading...
                                                    </NotFound>
                                                ) : shiftReportsEntriesAttachments.length >
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
                                                        setBack(values, 'back');
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
                                                    setBack(values, 'back');
                                                }}
                                                icon={back}
                                                isIconLeft={true}
                                                fontSize={fontSizeState}
                                            />

                                            <ButtonSecondary
                                                btnText={'Next'}
                                                onPress={() => handleSubmit()}
                                                icon={next}
                                                isIconLeft={false}
                                                fontSize={fontSizeState}
                                            />
                                        </BtnHorizontal>

                                        <CustomDatePicker
                                            showDateTimePicker={visibleDate}
                                            handlePickerData={(date: any) => {
                                                setVisibleDate(false);
                                                setFieldValue(
                                                    'secondaryWitnessDOB',
                                                    format(date, 'yyyy-MM-dd') +
                                                        'T00:00:00.000Z',
                                                );
                                            }}
                                            mode={'date'}
                                            date={
                                                params && params.type === true
                                                    ? accidentmultiStepdata.secondaryWitnessDOB ===
                                                      null
                                                        ? ''
                                                        : accidentmultiStepdata.secondaryWitnessDOB
                                                    : ''
                                            }
                                            setDateTimePicker={setVisibleDate}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </MainWrapper>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

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

export default withTheme(AccidentStep5);

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
