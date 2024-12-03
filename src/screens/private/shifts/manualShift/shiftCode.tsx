import React, { useState } from 'react';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import styled from 'styled-components/native';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTypedSelector } from '../../../../hooks/useTypedSelector';
import TextField from '@root/components/TextField';
import ButtonSecondary from '@root/components/ButtonSecondary';
import { next, back } from '@root/utils/assets';
import navigationStrings from '../../../../navigation/navigationStrings';
import { Formik } from 'formik';
import { SHIFTOCDE_ENTRY_SCHEMA } from './helpers';
import { useActions } from '@root/hooks/useActions';
import AppLoader from '../../../../utils/AppLoader';
import AwesomeAlert from 'react-native-awesome-alerts';

const ShiftCode = (props: any) => {
    const {
        route: { params },
        navigation,
    } = props;
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { codeListData, loading_shiftCode } = useTypedSelector(
        (state) => state.codeListData,
    );
    const { getShiftCodes } = useActions();
    const [showalert, setShowAlert] = useState(false);
    return (
        <BackgroundGlobal>
            {loading_shiftCode && <AppLoader />}
            <ScrollView nestedScrollEnabled={true}>
                <MainFrame>
                    <Formik
                        validationSchema={SHIFTOCDE_ENTRY_SCHEMA}
                        initialValues={{
                            shiftcode: '',
                        }}
                        enableReinitialize={true}
                        onSubmit={async (values) => {
                            await getShiftCodes('shiftcode=' + values.shiftcode)
                                .then((res) => {
                                    
                                    Object.keys(res).length > 0 &&
                                        navigation.navigate(
                                            navigationStrings.START_MANUAL_SHIFT,
                                            { item: res.data },
                                        );
                                })
                                .catch((e) => {
                                    setShowAlert(true);
                                });
                        }}>
                        {({ setFieldValue, handleSubmit, errors, values }) => (
                            <View>
                                <TitleText fontSize={fontSizeState}>
                                    Start a shift, using a shift code
                                </TitleText>

                                <TextField
                                    accessibilityLabel="Enter shift code"
                                    onChangeText={(value: any) => {
                                        setFieldValue('shiftcode', value);
                                    }}
                                    autoCapitalize={'none'}
                                    fontSize={fontSizeState}
                                    error={errors ? errors.shiftcode : null}
                                />

                                <BottomText fontSize={fontSizeState}>
                                    You can only start a shift with a code if
                                    you have been instructed to do so and the
                                    administrator has provided you with a
                                    code.Shift codes are specific to the day and
                                    the site,and it can only be used once.
                                </BottomText>

                                <HorizontalView>
                                    <ButtonSecondary
                                        btnText={'Back'}
                                        onPress={() => {
                                            props.navigation.pop();
                                        }}
                                        fontSize={fontSizeState}
                                        icon={back}
                                        isIconLeft={true}
                                    />

                                    <ButtonSecondary
                                        btnText={'Next'}
                                        onPress={() => {
                                            handleSubmit();
                                        }}
                                        fontSize={fontSizeState}
                                        icon={next}
                                        isIconLeft={false}
                                    />
                                </HorizontalView>
                            </View>
                        )}
                    </Formik>

                    {
                        <AwesomeAlert
                            customView={
                                <PopUpView>
                                    <SubTitle fontSize={fontSizeState}>
                                        The code was not valid, or you are not
                                        on-site.Please check your code and make
                                        sure that you are on-site to start your
                                        shift. If the problem persists, please
                                        contact your administrator
                                    </SubTitle>
                                    <BtnView>
                                        <TouchableOpacity
                                            onPress={() => {
                                                setShowAlert(false);
                                            }}>
                                            <BtnOK>
                                                <BtnText
                                                    fontSize={fontSizeState}>
                                                    Ok
                                                </BtnText>
                                            </BtnOK>
                                        </TouchableOpacity>
                                    </BtnView>
                                </PopUpView>
                            }
                            show={showalert}
                            showProgress={false}
                            // title="Alert"
                            // message="Are you sure to end shift?"
                            showCancelButton={false}
                            showConfirmButton={false}
                            closeOnTouchOutside={false}
                            closeOnHardwareBackPress={false}
                        />
                    }
                </MainFrame>
            </ScrollView>
        </BackgroundGlobal>
    );
};

export default ShiftCode;

type FontSizeProps = {
    fontSize: number;
};

const BtnText = styled.Text<FontSizeProps>`
    color: white;
    text-align: center;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
    color: ${({ theme }: any) => theme.colors.textWhite};
`;

const BtnOK = styled.View`
    width:92px;
    height:40px;
    background-color: ${({ theme }: any) => theme.colors.greenColor}
        border-radius:5px;
        margin-right:10px;
        padding:8px 10px
       
`;

const BtnView = styled.View`
    flex-direction: row;
    justify-content: center;
    margin-top: 15px;
`;

const SubTitle = styled.Text<FontSizeProps>`
    text-align: center;
    padding:10px
    margin: 5px 15px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate};
        color: ${({ theme }: any) => theme.colors.textBlack};
`;

const PopUpView = styled.View`
    width: 320px;
`;

const HorizontalView = styled.View`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 40px;
`;

const BottomText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 20px;
    margin-bottom: 8px;
`;

const TitleText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
    margin-top: 16px;
`;
