import React, { useEffect, useState } from 'react';
import { useTheme, withTheme } from 'styled-components';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import styled from 'styled-components/native';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next } from '@root/utils/assets';
import { Formik } from 'formik';
import { format } from 'date-fns';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import CustomTimePicker from '@root/components/TimePicker';
import navigationStrings from '../../../../navigation/navigationStrings';
import { ACCIDENT_ENTRY_SCHEMA, setAccidentStep } from './helper';
import CustomDatePicker from '../../../../components/DatePicker';
import { WINDOW_DEVICE_WIDTH } from '../../../../utils/constants';
import ImageModal from 'react-native-image-modal';
import { NotFound } from '../../../../utils/globalStyle';
import { FloatingAction } from 'react-native-floating-action';
import { actionsButtonIcons } from '../../../../utils/common-methods';
import AppLoader from '../../../../utils/AppLoader';

const AccidentStep1 = (props: any) => {
    const [visibleTimer, setVisibleTimer] = useState<boolean>(false);
    const [visibleDate, setVisibleDate] = useState<boolean>(false);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const [referredToManager, setReferredToManager] = useState<boolean>(false);
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const {
        getAccident,
        openModal,
        setAccidentMultiStep,
        getShiftsReportsEntrieAttachments,
    } = useActions();
    const { accidentData, loading }: any = useTypedSelector(
        (state) => state.accidentData,
    );
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
    let timehours =
        new Date().getHours().toString().length === 1
            ? '0' + new Date().getHours()
            : new Date().getHours();
    let timeminute =
        new Date().getMinutes().toString().length === 1
            ? '0' + new Date().getMinutes()
            : new Date().getMinutes();

    useEffect(() => {
        if (params.editable) {
            getAccident({ id: params.item.shiftReportID });
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
        if (params.trigger === 1 && Object.keys(accidentData).length > 0) {
            set_MultiStep();
        }
    }, [accidentData]);

    useEffect(() => {
        if (params.trigger === 0) {
            setAccidentMultiStep({
                reportTime: '',
                description: '',
                location: '',
                problemReporter: '',
                accidentDateTime: null,
                problemRectification: '',
                reportedDateTime: null,
                furtherAction: '',
                referredToManager: false,
                complainantName: '',
                complainantHomePhone: '',
                complainantWorkPhone: '',
                complainantEmployer: '',
                complainantMobile: '',
                complainantDOB: null,
                complainantAddress: '',
                offenderName: '',
                offenderHomePhone: '',
                offenderEmployer: '',
                offenderWorkPhone: '',
                offenderAddress: '',
                offenderMobile: '',
                offenderDOB: null,
                primaryWitnessName: '',
                primaryWitnessHomePhone: '',
                primaryWitnessEmployer: '',
                primaryWitnessWorkPhone: '',
                primaryWitnessAddress: '',
                primaryWitnessMobile: '',
                primaryWitnessDOB: null,
                secondaryWitnessName: '',
                secondaryWitnessHomePhone: '',
                secondaryWitnessEmployer: '',
                secondaryWitnessWorkPhone: '',
                secondaryWitnessAddress: '',
                secondaryWitnessMobile: '',
                secondaryWitnessDOB: null,
                policeOfficerName: '',
                policeOfficerStation: '',
                policeOfficerSection: '',
            });
        }
    }, []);

    const set_MultiStep = async () => {
        await setAccidentMultiStep({
            reportTime: accidentData.reportTime,
            description: accidentData.description,
            location: accidentData.location,
            problemReporter: accidentData.problemReporter,
            accidentDateTime: accidentData.accidentDateTime,
            problemRectification: accidentData.problemRectification,
            reportedDateTime: accidentData.reportedDateTime,
            furtherAction: accidentData.furtherAction,
            referredToManager: referredToManager,
            complainantName: accidentData.complainantName,
            complainantHomePhone: accidentData.complainantHomePhone,
            complainantWorkPhone: accidentData.complainantWorkPhone,
            complainantEmployer: accidentData.complainantEmployer,
            complainantMobile: accidentData.complainantMobile,
            complainantDOB: accidentData.complainantDOB,
            complainantAddress: accidentData.complainantAddress,
            offenderName: accidentData.offenderName,
            offenderHomePhone: accidentData.offenderHomePhone,
            offenderEmployer: accidentData.offenderEmployer,
            offenderWorkPhone: accidentData.offenderWorkPhone,
            offenderAddress: accidentData.offenderAddress,
            offenderMobile: accidentData.offenderMobile,
            offenderDOB: accidentData.offenderDOB,
            primaryWitnessName: accidentData.primaryWitnessName,
            primaryWitnessHomePhone: accidentData.primaryWitnessHomePhone,
            primaryWitnessEmployer: accidentData.primaryWitnessEmployer,
            primaryWitnessWorkPhone: accidentData.primaryWitnessWorkPhone,
            primaryWitnessAddress: accidentData.primaryWitnessAddress,
            primaryWitnessMobile: accidentData.primaryWitnessMobile,
            primaryWitnessDOB: accidentData.primaryWitnessDOB,
            secondaryWitnessName: accidentData.secondaryWitnessName,
            secondaryWitnessHomePhone: accidentData.secondaryWitnessHomePhone,
            secondaryWitnessEmployer: accidentData.secondaryWitnessEmployer,
            secondaryWitnessWorkPhone: accidentData.secondaryWitnessWorkPhone,
            secondaryWitnessAddress: accidentData.secondaryWitnessAddress,
            secondaryWitnessMobile: accidentData.secondaryWitnessMobile,
            secondaryWitnessDOB: accidentData.secondaryWitnessDOB,
            policeOfficerName: accidentData.policeOfficerName,
            policeOfficerStation: accidentData.policeOfficerStation,
            policeOfficerSection: accidentData.policeOfficerSection,
        });
    };

    useEffect(() => {
        if (params.trigger === 1) {
            setReferredToManager(accidentData.referredToManager);
        }
    }, [accidentData.referredToManager]);

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
                                    validationSchema={ACCIDENT_ENTRY_SCHEMA}
                                    initialValues={{
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
                                    }}
                                    onSubmit={async (values) => {
                                        await setAccidentMultiStep({
                                            reportTime: values.reportTime,
                                            description: values.description,
                                            location: values.location,
                                            problemReporter:
                                                values.problemReporter,
                                            accidentDateTime:
                                                values.accidentDateTime,
                                            problemRectification:
                                                values.problemRectification,
                                            reportedDateTime:
                                                values.reportedDateTime,
                                            furtherAction: values.furtherAction,
                                            referredToManager:
                                                referredToManager,
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
                                                accidentmultiStepdata.policeOfficerName,
                                            policeOfficerStation:
                                                accidentmultiStepdata.policeOfficerStation,
                                            policeOfficerSection:
                                                accidentmultiStepdata.policeOfficerSection,
                                        });
                                        props.navigation.navigate(
                                            navigationStrings.ACCIDENT_STEP_2,
                                            {
                                                type: params && params.editable,
                                                shiftReportID:
                                                    params &&
                                                    params.editable === true
                                                        ? params &&
                                                          params.item
                                                              .shiftReportID
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
                                                        onPress={() => {
                                                            setVisibleTimer(
                                                                true,
                                                            );
                                                        }}>
                                                        <TextField
                                                            accessibilityLabel="Time of Alarm:"
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            editable={false}
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                            value={
                                                                values.reportTime
                                                            }
                                                            error={
                                                                errors
                                                                    ? errors.reportTime
                                                                    : null
                                                            }
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </FormField>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Location:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'location',
                                                                value,
                                                            );
                                                        }}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={values.location}
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <TitleText fontSize={fontSizeState}>
                                                Person reporting Issue
                                            </TitleText>

                                            <HorizontalView>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Name:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'problemReporter',
                                                                value,
                                                            );
                                                        }}
                                                        keyboardType={'default'}
                                                        autoCapitalize={'none'}
                                                        value={
                                                            values.problemReporter
                                                        }
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                                <FormField>
                                                    <TouchableOpacity
                                                        onPress={() => {
                                                            setVisibleDate(
                                                                true,
                                                            );
                                                        }}>
                                                        <TextField
                                                            accessibilityLabel="Date of issue:"
                                                            keyboardType={
                                                                'default'
                                                            }
                                                            editable={false}
                                                            value={
                                                                values.reportedDateTime &&
                                                                format(
                                                                    new Date(
                                                                        values.reportedDateTime,
                                                                    ),
                                                                    'dd/MM/yyyy',
                                                                )
                                                            }
                                                            autoCapitalize={
                                                                'none'
                                                            }
                                                            fontSize={
                                                                fontSizeState
                                                            }
                                                        />
                                                    </TouchableOpacity>
                                                </FormField>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="Describe Issue:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'description',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={values.description}
                                                error={
                                                    errors
                                                        ? errors.description
                                                        : null
                                                }
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                fontSize={fontSizeState}
                                            />

                                            <TextField
                                                accessibilityLabel="Actions Taken:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'problemRectification',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={
                                                    values.problemRectification
                                                }
                                                style={{
                                                    minHeight: 60,
                                                }}
                                                fontSize={fontSizeState}
                                            />

                                            <HorizontalView>
                                                <FormField>
                                                    <TextField
                                                        accessibilityLabel="Time of Actions:"
                                                        onChangeText={(
                                                            value: any,
                                                        ) => {
                                                            setFieldValue(
                                                                'accidentDateTime',
                                                                value,
                                                            );
                                                        }}
                                                        keyboardType={'default'}
                                                        value={
                                                            values.accidentDateTime
                                                        }
                                                        autoCapitalize={'none'}
                                                        fontSize={fontSizeState}
                                                    />
                                                </FormField>
                                            </HorizontalView>

                                            <TextField
                                                accessibilityLabel="Outstanding Actions:"
                                                onChangeText={(value: any) => {
                                                    setFieldValue(
                                                        'furtherAction',
                                                        value,
                                                    );
                                                }}
                                                keyboardType={'default'}
                                                autoCapitalize={'none'}
                                                multiline={true}
                                                value={values.furtherAction}
                                                style={{
                                                    minHeight: 40,
                                                }}
                                                fontSize={fontSizeState}
                                            />

                                            <CheckView>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        setReferredToManager(
                                                            !referredToManager,
                                                        );
                                                    }}>
                                                    <Image
                                                        source={
                                                            referredToManager ===
                                                            true
                                                                ? require('@root/assets/check/check.png')
                                                                : require('@root/assets/uncheck/checkuncheck.png')
                                                        }
                                                    />
                                                </TouchableOpacity>

                                                <TitleLabel
                                                    fontSize={fontSizeState}>
                                                    {' '}
                                                    Informed Client/DM
                                                </TitleLabel>
                                            </CheckView>

                                            {params && params.editable && (
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
                                                showDateTimePicker={
                                                    visibleTimer
                                                }
                                                time={
                                                    params &&
                                                    params.editable === true
                                                        ? params &&
                                                          params.item
                                                              .reportDateTime
                                                        : ''
                                                }
                                                handlePickerData={(
                                                    date: any,
                                                ) => {
                                                    setVisibleTimer(false);
                                                    let hours =
                                                        new Date(date)
                                                            .getHours()
                                                            .toString()
                                                            .length === 1
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
                                                            .toString()
                                                            .length === 1
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
                                                setDateTimePicker={
                                                    setVisibleTimer
                                                }
                                            />

                                            <CustomDatePicker
                                                showDateTimePicker={visibleDate}
                                                date={
                                                    params &&
                                                    params.editable === true
                                                        ? accidentmultiStepdata.reportedDateTime ===
                                                          null
                                                            ? ''
                                                            : accidentmultiStepdata.reportedDateTime
                                                        : ''
                                                }
                                                handlePickerData={(
                                                    date: any,
                                                ) => {
                                                    setVisibleDate(false);
                                                    setFieldValue(
                                                        'reportedDateTime',
                                                        format(
                                                            date,
                                                            'yyyy-MM-dd',
                                                        ) + 'T00:00:00.000Z',
                                                    );
                                                }}
                                                mode={'date'}
                                                setDateTimePicker={
                                                    setVisibleDate
                                                }
                                            />
                                        </View>
                                    )}
                                </Formik>
                            </MainWrapper>
                        </MainParentWrapper>
                    </ScrollView>
                )}
            </KeyboardAvoidingView>

            {!params.editable &&
                navigation.setOptions({
                    headerRight: () => null,
                })}
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

export default withTheme(AccidentStep1);

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

const TitleLabel = styled.Text<FontSizeProps>`
    padding-right: 10px;
    font-weight: 600;
    margin-top: 5px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
    color: ${({ theme }: any) => theme.colors.text};
`;

const CheckView = styled.View`
    flex-direction: row;
    align-items: center;
    margin-top: 16px;
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
