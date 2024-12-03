import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from '@react-navigation/native';
import {  TouchableOpacity, View } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { Home, Rosters, Shifts, Actions, Messages } from './index';
import navigationStrings from './navigationStrings';
import { TabBarIcon } from './TabbarIcon';
import { calendarIcon, navigaionIcon } from '@root/utils/assets';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import PrimaryButton from '@root/components/Button';
import { navigationRef } from '@root/navigation/RootNavigation';
import AwesomeAlert from "react-native-awesome-alerts";

const Tab = createBottomTabNavigator();

function DashboardTabs(props: any) {
    const [showalert, setShowAlert] = useState(false)
    const { colors, type }: any = useTheme();
    const { isActiveShift } = useTypedSelector((state) => state.activeShift);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    return (
        <Tab.Navigator
            initialRouteName="Dashboard"
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color }) => (
                    <TabBarIcon color={color} routeName={route.name} />
                ),
                tabBarStyle: { backgroundColor: colors.secondary },
                tabBarActiveTintColor: colors.accentColor,
                tabBarInactiveTintColor: colors.inactive,
                headerStyle: {
                    backgroundColor: colors.secondary,
                },
                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => props.navigation.openDrawer()}>
                        <NavigationBurgerIcon
                            source={
                                type === 'dark' ? navigaionIcon : navigaionIcon
                            }
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => {
                    if (route.name === 'ROSTER') {
                        return (
                            <TouchableOpacity
                                onPress={() =>
                                    props.navigation.navigate(
                                        navigationStrings.ROSTER_CALENDAR, { navigation: props.navigation }
                                    )
                                }>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={calendarIcon}
                                />
                            </TouchableOpacity>
                        );
                    } else if (route.name === 'SHIFTS' && isActiveShift) {
                        return (
                            <BtnWrapper>
                                <PrimaryButton
                                    heightBT={38}
                                    onPress={() => {
                                        setShowAlert(true)
                                    }}
                                    btnText={
                                        'End Shift'
                                    }
                                />

                                <AwesomeAlert
                                    customView={<PopUpView>
                                        <Title fontSize={fontSizeState}>Alert</Title>
                                        <SubTitle fontSize={fontSizeState}>Are you sure to end shift?</SubTitle>
                                        <BtnView>
                                            <TouchableOpacity onPress={()=>{
                                                setShowAlert(false)
                                                navigationRef.current.navigate(navigationStrings.END_SHIFT)
                                            }}>
                                            <BtnOK>
                                                <BtnText fontSize={fontSizeState}>
                                                    Ok
                                                </BtnText>
                                            </BtnOK>    
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>{
                                                setShowAlert(!showalert)
                                            }}>
                                            <BtnCancel>
                                            <BtnText fontSize={fontSizeState}>
                                                    Cancel
                                                </BtnText>
                                            </BtnCancel>
                                            </TouchableOpacity>
                                        </BtnView>
                                    </PopUpView>}
                                    show={showalert}
                                    showProgress={false}
                                    showCancelButton={false}
                                    showConfirmButton={false}
                                    closeOnTouchOutside={false}
                                    closeOnHardwareBackPress={false}
                                />
                            </BtnWrapper>
                        );
                    }
                },
            })}>


            <Tab.Screen
                name={navigationStrings.TAB_BAR_HOME}
                component={Home}
            />

            <Tab.Screen
                name={navigationStrings.TAB_BAR_ROSTERS}
                component={Rosters}
            />

            <Tab.Screen
                name={navigationStrings.TAB_BAR_SHIFTS}
                component={Shifts}
            />
            <Tab.Screen
                name={navigationStrings.TAB_BAR_ACTIONS}
                component={Actions}
            />
            <Tab.Screen
                name={navigationStrings.TAB_BAR_MESSAGES}
                component={Messages}
            />
        </Tab.Navigator>
    );
}

export default DashboardTabs;

type FontSizeProps = {
    fontSize: number;
};

const BtnText = styled.Text<FontSizeProps>`
color:white;
text-align:center;
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardTitle};
`;

const BtnCancel = styled.View`
    width:92px;
    height:40px;
    background-color: ${({ theme }: any) =>
        theme.colors.red}
        border-radius:5px;
        margin-left:10px;
        padding:8px 10px
`;

const BtnOK = styled.View`
    width:92px;
    height:40px;
    background-color: ${({ theme }: any) =>
        theme.colors.greenColor}
        border-radius:5px;
        margin-right:10px;
        padding:8px 10px
`;


const BtnView = styled.View`
flex-direction:row;
justify-content:center;
margin-top:15px;
`;

const SubTitle = styled.Text<FontSizeProps>`
text-align:center; 
margin-top:5px;
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardTitle};
color: ${({ theme }: any) => theme.colors.textBlack};
`

const Title = styled.Text<FontSizeProps>`
text-align:center;
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardTitle};
color: ${({ theme }: any) => theme.colors.textGray};
`;

const PopUpView = styled.View`
    width:320px
`;

const NavigationBurgerIcon = styled.Image`
    margin-left: 16px;
`;

const BtnWrapper = styled.View`
    margin: 8px;
`;

