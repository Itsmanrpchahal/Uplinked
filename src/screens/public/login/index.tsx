import { useTheme } from '@react-navigation/native';
import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import { Formik } from 'formik';
import TextField from '@root/components/TextField';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { NoInternetView } from '../../../components/NoInternetView';
import { NetInfoState, useNetInfo } from '@react-native-community/netinfo';
import { LOGIN_SCHEMA } from '@root/screens/public/login/helpers';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { LoginInterface } from 'interfaces/loginInterface';
import navigationStrings from 'navigation/navigationStrings';
import PrimaryButton from 'components/Button';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { returnThemeTypeData } from '@root/utils/theme-type';
import { MainParentWrapper } from '@root/utils/globalStyle';
import AppLoader from '../../../utils/AppLoader';
import service from '@root/service/axios';
import { getUserLocation } from '../../../utils/common-methods';
import NetInfo from '@react-native-community/netinfo';

const Login = (props: any) => {
    const { login, getOrgCode, getOrgID } = useActions();
    const { loading, error, isAuthenticated } = useTypedSelector(
        (state) => state.auth,
    );
    const { orgCodeData, orgCodeloading } = useTypedSelector(
        (state) => state.orgCodeData,
    );
    const { orgIDData, orgIdloading } = useTypedSelector(
        (state) => state.orgIDData,
    );
    const [location, setLocation] = useState({});
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const [userName, setUserName] = useState();
    const [password, setPassword] = useState();
    const [url, setUrl] = useState();
    const { theme } = props;
    theme;

    const netInfo = useNetInfo();

    useEffect(() => {
        if (error !== null) {
            alert(error);
        }
    }, [error]);

    useEffect(() => {
        getLoc();
    }, []);

    const getLoc = async () => {
        const uLocationData: any = await getUserLocation();
        setLocation(uLocationData);
        alert(JSON.stringify(uLocationData))
    };

    useEffect(() => {
        if (isAuthenticated) {
            props.navigation.replace(navigationStrings.TAB_BAR_HOME);
        }
    }, [isAuthenticated]);

    const handleLogin = (values: LoginInterface) => {
        getOrgCode({ email: values.userName, code: values.code })
            .then(async (res) => {
                if (res && res.data) {
                    service.defaults.baseURL = res.data.apiUrl;
                    await login({ userName: userName, password: password });
                    getOrgID();
                } else {
                    console.log('');
                }
            })
            .catch(error);
        {
            console.log('error ', error);
        }
    };

    // @ts-ignore
    // @ts-ignore
    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                {orgCodeloading || loading || orgIdloading ? (
                    <AppLoader />
                ) : null}

                <ScrollView
                    nestedScrollEnabled={false}
                    showsVerticalScrollIndicator={false}>
                    <MainWrapper>
                        <LogoWrapper
                            style={{
                                marginTop: 90,
                                justifyContent: 'center',
                                flexDirection: 'row',
                            }}>
                            <Image
                                source={require('@root/assets/logo/logo.png')}
                            />
                        </LogoWrapper>
                        <HeadingText fontSize={fontSizeState}>
                            Login
                        </HeadingText>
                        <View>
                            <Formik
                                validationSchema={LOGIN_SCHEMA}
                                initialValues={{
                                    userName: '',
                                    password: '',
                                    code: '',
                                }}
                                onSubmit={(values) => {
                                    if (Object.keys(location).length > 0) {
                                        handleLogin(values);
                                    }
                                }}>
                                {({ setFieldValue, handleSubmit, errors }) => (
                                    <View>
                                        <TextField
                                            accessibilityLabel="Email"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'userName',
                                                    value,
                                                );
                                                setUserName(value);
                                            }}
                                            fontSize={fontSizeState}
                                            placeholder="email"
                                            icon={returnThemeTypeData({
                                                screenName: 'login',
                                                lightKey:
                                                    'userIconsDarkTextFiled',
                                                darkKey:
                                                    'userIconLightTextField',
                                                appearance: props.theme.type,
                                            })}
                                            keyboardType={'email-address'}
                                            autoCapitalize={'none'}
                                            error={
                                                errors ? errors.userName : null
                                            }
                                        />
                                        <TextField
                                            accessibilityLabel="Password"
                                            onChangeText={(value: any) => {
                                                setFieldValue(
                                                    'password',
                                                    value,
                                                );
                                                setPassword(value);
                                            }}
                                            fontSize={fontSizeState}
                                            placeholder="********"
                                            icon={returnThemeTypeData({
                                                screenName: 'login',
                                                lightKey:
                                                    'lockIconsDarkTextFiled',
                                                darkKey:
                                                    'lockIconsLightTextFiled',
                                                appearance: props.theme.type,
                                            })}
                                            secureTextEntry={true}
                                            error={
                                                errors ? errors.password : null
                                            }
                                        />

                                        <TextField
                                            accessibilityLabel="Org Code"
                                            onChangeText={(value: any) => {
                                                setFieldValue('code', value);
                                            }}
                                            fontSize={fontSizeState}
                                            placeholder="org code"
                                            keyboardType={'default'}
                                            autoCapitalize={'none'}
                                            error={errors ? errors.code : null}
                                        />

                                        <ForgPasswordWrapper>
                                            <ForgPasswordWrapper__Text
                                                fontSize={fontSizeState}>
                                                Forgot password?
                                            </ForgPasswordWrapper__Text>
                                        </ForgPasswordWrapper>

                                        <ButtonWrapper>
                                            <PrimaryButton
                                                onPress={handleSubmit}
                                                btnText={'LOGIN'}
                                                fontSize={fontSizeState}
                                                loading={loading}
                                            />
                                        </ButtonWrapper>
                                    </View>
                                )}
                            </Formik>
                        </View>

                        {/* <ChangeProfileWrapper>
                            <ChangeProfileWrapper_TextTitle fontSize={fontSizeState}>
                                Previous Title
                            </ChangeProfileWrapper_TextTitle>

                            <ChangeProfileWrapper_TextDescription fontSize={fontSizeState}>
                                Lorem ipsum dolor sit amet, consectetur
                                adipiscing elit, sed do eiusmod tempor
                                incididunt ut lab
                            </ChangeProfileWrapper_TextDescription>

                            <ChooseProfileBtnWrapper>
                                <PrimaryButton
                                    heightBT={40}
                                    onPress={() => {
                                        // @ts-ignore
                                        openModal('AccountModalSheet', {
                                            abc: 'hello',
                                            height: '40%',
                                        });
                                    }}
                                    btnText={'Choose Profile'}
                                />
                            </ChooseProfileBtnWrapper>
                        </ChangeProfileWrapper> */}
                    </MainWrapper>
                </ScrollView>
            </BackgroundGlobal>
            {netInfo.isInternetReachable === false && <NoInternetView />}
        </MainParentWrapper>
    );
};

export default withTheme(Login);

type FontSizeProps = {
    fontSize: number;
};
const ChooseProfileBtnWrapper = styled.View`
    height: 45px;
`;

const ChangeProfileWrapper_TextDescription = styled.Text`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    margin-bottom: 5px;
    color: ${({ theme }: any) => theme.colors.text};
    text-align: center;
`;

const ChangeProfileWrapper_TextTitle = styled.Text`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    margin-bottom: 5px;
    color: ${({ theme }: any) => theme.colors.text};
`;

const ChangeProfileWrapper = styled.View`
    align-items: center;
    padding: 25px;
    border-radius: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const ButtonWrapper = styled.View`
    flex: 1;
    margin-top: 25px;
    margin-bottom: 25px;
`;

const ForgPasswordWrapper__Text = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardSubTitle}px;
`;

const ForgPasswordWrapper = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 15px;
`;

const SubHeading = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
`;

const HeadingText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    margin-top: 40px;
    margin-bottom: 20px;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    font-weight: 400;
`;

const LogoWrapper = styled.View``;

const MainWrapper = styled.View`
    padding-left: ${({ theme }: any) => theme.spacing.horizontal}px;
    padding-right: ${({ theme }: any) => theme.spacing.horizontal}px;
`;
