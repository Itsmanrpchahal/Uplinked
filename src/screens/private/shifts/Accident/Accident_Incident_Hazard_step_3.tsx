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
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next, back, backgray } from '@root/utils/assets';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { useActions } from '@root/hooks/useActions';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import { NotFound } from '@root/utils/globalStyle';
import navigationStrings from '../../../../navigation/navigationStrings';
import CustomDatePicker from '../../../../components/DatePicker';
import { FloatingAction } from 'react-native-floating-action';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import AppLoader from '../../../../utils/AppLoader';

const AccidentStep3 = (props: any) => {
    const [visibleDate, setVisibleDate] = useState<boolean>(false);
    const [offenderDOB, setOffenderDOB] = useState(null);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const {
        setAccidentMultiStep,
        openModal,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const {
        shiftReportsEntriesAttachments,
        shiftReportsEntriesAttachmentsLoading,
    }: any = useTypedSelector((state) => state.shiftReports);
    const { accidentmultiStepdata }: any = useTypedSelector(
        (state) => state.accidentmultiStepdata,
    );
    const {
        route: { params },
        navigation,
    } = props;

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
            offenderName: values.offenderName,
            offenderHomePhone: values.offenderHomePhone,
            offenderEmployer: values.offenderEmployer,
            offenderWorkPhone: values.offenderWorkPhone,
            offenderAddress: values.offenderAddress,
            offenderMobile: values.offenderMobile,
            offenderDOB: values.offenderDOB,
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
            policeOfficerName: accidentmultiStepdata.policeOfficerName,
            policeOfficerStation: accidentmultiStepdata.policeOfficerStation,
            policeOfficerSection: accidentmultiStepdata.policeOfficerSection,
        });
        type === 'back'
            ? props.navigation.pop()
            : navigation.navigate(navigationStrings.ACCIDENT_STEP_4, {
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
                                            Offender Information
                                        </TitleText>

                                        <TextField
                                            accessibilityLabel="Name:"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'offenderName',
                                                    value,
                                                );
                                            }}
                                            value={values.offenderName}
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
                                                            'offenderHomePhone',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        values.offenderHomePhone
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
                                                            'offenderEmployer',
                                                            value,
                                                        );
                                                    }}
                                                    keyboardType={'default'}
                                                    value={
                                                        values.offenderEmployer
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
                                                            'offenderWorkPhone',
                                                            value,
                                                        );
                                                    }}
                                                    value={
                                                        values.offenderWorkPhone
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
                                                            'offenderMobile',
                                                            value,
                                                        );
                                                    }}
                                                    keyboardType={'default'}
                                                    value={
                                                        values.offenderMobile
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
                                                    'offenderAddress',
                                                    value,
                                                );
                                            }}
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            multiline={true}
                                            value={values.offenderAddress}
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
                                                        value={
                                                            values.offenderDOB &&
                                                            format(
                                                                new Date(
                                                                    values.offenderDOB,
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

                                                {navigation.setOptions({
                                                    headerLeft: () => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setBack(
                                                                    values,
                                                                    'back',
                                                                );
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
                                        <BtnHorizontal>
                                            <ButtonSecondary
                                                btnText={'Back'}
                                                onPress={() => {
                                                    setBack(values, 'back');
                                                }}
                                                icon={back}
                                                fontSize={fontSizeState}
                                                isIconLeft={true}
                                            />

                                            <ButtonSecondary
                                                btnText={'Next'}
                                                onPress={() => handleSubmit()}
                                                icon={next}
                                                fontSize={fontSizeState}
                                                isIconLeft={false}
                                            />
                                        </BtnHorizontal>

                                        <CustomDatePicker
                                            showDateTimePicker={visibleDate}
                                            handlePickerData={(date: any) => {
                                                setVisibleDate(false);
                                                setFieldValue(
                                                    'offenderDOB',
                                                    format(date, 'yyyy-MM-dd') +
                                                        'T00:00:00.000Z',
                                                );
                                            }}
                                            date={
                                                params && params.type === true
                                                    ? accidentmultiStepdata.offenderDOB ===
                                                      null
                                                        ? ''
                                                        : accidentmultiStepdata.offenderDOB
                                                    : ''
                                            }
                                            mode={'date'}
                                            setDateTimePicker={setVisibleDate}
                                        />
                                    </View>
                                )}
                            </Formik>
                        </MainWrapper>
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

export default withTheme(AccidentStep3);

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
