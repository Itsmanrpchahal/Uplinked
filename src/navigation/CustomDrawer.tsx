import React, { useEffect, useState } from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { Image, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { clearAll } from 'storage';
import { useActions } from 'hooks/useActions';
import navigationStrings from 'navigation/navigationStrings';
import { persistor } from '@root/store';
import ListCard from '@root/components/ListCard';
import { Switch } from 'react-native'
import { withTheme } from "styled-components";
import { useTypedSelector } from "../hooks/useTypedSelector";
import { appVersion } from "../utils/common-methods";
import AwesomeAlert from "react-native-awesome-alerts";
import TextField from '@root/components/TextField';
import { returnThemeTypeData } from '@root/utils/theme-type';
import { LOGIN_SCHEMA } from '@root/screens/public/login/helpers';
import { Formik } from 'formik';
import PrimaryButton from 'components/Button';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCOUNTS } from '../utils/constants';


function CustomDrawer(props: any) {
    const { colors }: any = useTheme();
    const { setAuthentication, getMode } = useActions();
    const { modeState } = useTypedSelector((state) => state.mode);
    const [theme, setTheme] = useState<any>(modeState);
    const userName = useTypedSelector((state) => state.auth.userName);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const toggleRememberPin = (value) => {
        setTheme(value);
    };
    const [showalert, setShowAlert] = useState(false)
    const [accounts, setAccounts] = useState([])
    var jsonArray = [];
    var jsonObject;

  
    useEffect(() => {
        // getMode({ mode: theme });
    }, [theme])

    const logout = async () => {
        await clearAll();
        await persistor.flush();
        await persistor.purge();
        await AsyncStorage.setItem('ORG_CODE', '');
        setAuthentication(false);
        props.navigation.reset({
            index: 0,
            routes: [{ name: navigationStrings.LOGIN }],
        });
    };

    useEffect(() => {
        AsyncStorage.getItem(ACCOUNTS).then((asyncStorageRes) => {
            // @ts-ignore
            setAccounts(asyncStorageRes)
        });

    }, [jsonArray])
    // @ts-ignore
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.secondary }}>
            <ScrollView>
                <DrawerWrapper backgroundColor={colors.secondary}>
                    <ListCard />
                    <Divider backgroundColor={colors.divider} />
                    <SwitchHorizontalWrapper>
                        <TextImageWrapper>
                            <Image
                                source={require('@root/assets/bell/bell.png')}
                            />
                            <TextWrapper fontSize={fontSizeState} textColor={colors.text}>
                                Notifications
                            </TextWrapper>
                        </TextImageWrapper>

                        <Switch
                            onValueChange={toggleRememberPin}
                            renderActiveText={false}
                            value={theme}
                            renderInActiveText={false}
                        />

                    </SwitchHorizontalWrapper>
                    <Divider backgroundColor={colors.divider} />
                    <TouchableOpacity onPress={()=>{ props.navigation.navigate(navigationStrings.SETTING)}}>
                    <SwitchHorizontalWrapper>
                        <TextImageWrapper>
                            <Image
                                source={require('@root/assets/setting/setting.png')}
                            />
                            <TextWrapper fontSize={fontSizeState} textColor={colors.text}>
                                Setting
                            </TextWrapper>
                        </TextImageWrapper>
                    </SwitchHorizontalWrapper>
                    </TouchableOpacity>
                    
                    <Divider backgroundColor={colors.divider} />
                    {/* <AccountOrgWrapper backgroundColor={colors.secondary}>
                        <TextWrapper fontSize={fontSizeState} textColor={colors.text}>
                            Accounts and Orgs
                        </TextWrapper>
                    </AccountOrgWrapper>

                    <VerticalWrapper>
                        <SwitchHorizontalWrapper>
                            <Image
                                source={require('@root/assets/changeaccount/changeaccount.png')}
                            />

                            <VerticalWrapper>
                                <TextWrapper fontSize={fontSizeState} textColor={colors.text}>{userName.split('@')[0]}</TextWrapper>
                                <TextWrapper fontSize={fontSizeState} textColor={colors.text}>{userName}</TextWrapper>
                            </VerticalWrapper>

                            <Image
                                source={require('@root/assets/checkbox/checkbox.native.png')}
                            />
                        </SwitchHorizontalWrapper>
                        <Divider backgroundColor={colors.divider} />


                        <SwitchHorizontalWrapper>
                            <TouchableOpacity onPress={() => {
                                setShowAlert(true)
                            }}>
                                <TextImageWrapper>
                                    <Image
                                        source={require('@root/assets/addWhite/addWhite.png')}
                                    />
                                    <TextWrapper fontSize={fontSizeState} textColor={colors.text}>
                                        Add Account
                                    </TextWrapper>
                                </TextImageWrapper>
                            </TouchableOpacity>
                        </SwitchHorizontalWrapper>
                    </VerticalWrapper> */}

                    <DrawerSecondSection>
                        <TouchableOpacity onPress={() => {
                            logout(),
                                props.navigation.closeDrawer()
                        }}>
                            <LogoutText fontSize={fontSizeState} textColor={colors.text}>Logout</LogoutText>
                        </TouchableOpacity>
                    </DrawerSecondSection>

                    <DrawerSecondSection>
                        <VersionText fontSize={fontSizeState} textColor={colors.text}>{appVersion}</VersionText>
                    </DrawerSecondSection>


                </DrawerWrapper>

                <AwesomeAlert
                    show={showalert}
                    contentContainerStyle={{ backgroundColor: colors.secondary, width: '100%', height: 'auto' }}
                    showProgress={false}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    showCancelButton={false}
                    showConfirmButton={false}
                    cancelText="Cancel"
                    confirmText={'Add Account'}
                    confirmButtonColor={colors.greenColor}
                    customView={
                        <Formik
                            validationSchema={LOGIN_SCHEMA}
                            initialValues={{
                                userName: '',
                                password: '',
                            }}
                            onSubmit={async (values) => {
                                jsonObject = { 'email': values.userName, 'password': values.password }
                                await jsonArray.push(jsonObject)
                            }}>
                            {({ setFieldValue, handleSubmit, errors }) => (
                                <View style={{ width: '100%'}}>

                                    <TextField
                                        accessibilityLabel="Email"
                                        onChangeText={(value: any) => {
                                            setFieldValue(
                                                'userName',
                                                value,
                                            );
                                        }}
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
                                        fontSize={fontSizeState}
                                    />
                                    <TextField
                                        accessibilityLabel="Password"
                                        onChangeText={(value: any) => {
                                            setFieldValue(
                                                'password',
                                                value,
                                            );
                                        }}
                                        placeholder="********"
                                        icon={returnThemeTypeData({
                                            screenName: 'login',
                                            lightKey:
                                                'lockIconsDarkTextFiled',
                                            darkKey:
                                                'lockIconsLightTextFiled',
                                            appearance: props.theme.type,
                                        })}
                                        fontSize={fontSizeState}
                                        secureTextEntry={true}
                                        error={
                                            errors ? errors.password : null
                                        }
                                    />
                                    <ButtonWrapper>
                                        <PrimaryButton
                                            onPress={handleSubmit}
                                            btnText={'LOGIN'}
                                            fontSize={fontSizeState}
                                        />
                                    </ButtonWrapper>

                                    <CloseProfileBtnWrapper>
                                            <TouchableOpacity onPress={()=>{setShowAlert(false)}}>
                                            <BtnText fontSize={fontSizeState} >
                                                Close
                                            </BtnText>
                                            </TouchableOpacity>
                                    </CloseProfileBtnWrapper>

                                </View>
                            )}
                        </Formik>
                    }
                />
            </ScrollView>

        </SafeAreaView>
    );
}

export default withTheme(CustomDrawer);

type FontSizeProps = {
    fontSize: number;
};

type DrawerWrapperProps = {
    backgroundColor: string;
};

type TextColorProps = {
    textColor: string;
};

const BtnText = styled.Text<FontSizeProps>`
    color:#ffffff
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardTitle};
`;

const CloseProfileBtnWrapper = styled.View`
    margin-top:10px
    justify-Content:center;
    align-items:center;
`;
const VerticalWrapper = styled.View`
`;

const ButtonWrapper = styled.View`
    margin-top: 25px;
    margin-bottom:10px;
`;

const AccountOrgWrapper = styled.View<DrawerWrapperProps>`
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  padding: 16px;

`;

const TextImageWrapper = styled.View`
  display: flex;
  padding-right: 15px;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2px;
  flex-direction: row;
  align-items: center;
  align-content: center;
`;

const TextWrapper = styled.Text<TextColorProps,FontSizeProps>`
  color: ${({ textColor }: any) => textColor};
  font-size: ${({ theme ,fontSize}: any) => theme.fontSize[fontSize].cardSubTitle};
  margin-left: 16px;
`;

const SwitchHorizontalWrapper = styled.View`
  flex-direction: row;
  margin: 10px 16px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const Divider = styled.View<DrawerWrapperProps>`
  height: 1px;
  margin-left: 40px;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
`;

const VersionText = styled.Text<TextColorProps,FontSizeProps>`
  color: ${({ textColor, }: any) => textColor};
  font-size: ${({ theme ,fontSize}: any) => theme.fontSize[fontSize].cardDate};
`;

const LogoutText = styled.Text<TextColorProps,FontSizeProps>`
  color: ${({ textColor }: any) => textColor};
  font-size: ${({ theme ,fontSize}: any) => theme.fontSize[fontSize].cardDate};
`;

const DrawerWrapper = styled.View<DrawerWrapperProps>`
  flex: 1;
  background-color: ${({ backgroundColor }: any) => backgroundColor};
  margin-top: 30px;
`;

const DrawerSecondSection = styled.View`
  flex: 0.1;
  margin-left: 16px;
  margin-top: 16px;
`;
