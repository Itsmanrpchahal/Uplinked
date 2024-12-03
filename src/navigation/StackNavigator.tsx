import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { ActionDetail, Login, Patrol, ScanScreen } from './index';
import navigationStrings from '@root/navigation/navigationStrings';
import DashboardTabs from '@root/navigation/Tabbar';
import { useTypedSelector } from 'hooks/useTypedSelector';
import { useTheme } from '@react-navigation/native';
// @ts-ignore
import styled from 'styled-components/native';
import { galleryIcon } from '@root/utils/assets';
import { RosterCalender } from '@root/screens/private/rosters/calendarPicker';
import { TouchableOpacity } from 'react-native';
import { useActions } from '@root/hooks/useActions';
import StartManualShift from '../screens/private/shifts/manualShift';
import AutoShiftStart from '../screens/private/shifts/autoShiftStart';
import Intoxication from '../screens/private/shifts/Intoxication';
import CrowdCount from '../screens/private/shifts/CrowdCount';
import BoatReport from '../screens/private/shifts/boatReport';
import WelfareCheck from '../screens/private/shifts/welfareCheck';
import FireAlarm from '../screens/private/shifts/fireAlarm';
import VehicleReport from '../screens/private/shifts/vehicleReport';
import Maintenance from '../screens/private/shifts/maintenance';
import BombTheartStep1 from '../screens/private/shifts/bombTheart/bomb-theart-step-1';
import BombTheartStep2 from '../screens/private/shifts/bombTheart/bomb-threat-step-2';
import BombTheartStep3 from '../screens/private/shifts/bombTheart/bomb-threat-step-3';
import BombTheartStep4 from '../screens/private/shifts/bombTheart/bomb-theart-step-4';
import FireAlarm2 from '../screens/private/shifts/fireAlarm/fireAlarm2';
import ArmHoldUpStep1 from '../screens/private/shifts/armHoldUp/arm-hold-up-step-1';
import ArmHoldUpStep2 from '../screens/private/shifts/armHoldUp/arm-hold-up-step-2';
import ArmHoldUpStep3 from '../screens/private/shifts/armHoldUp/arm-hold-up-step-3';
import ArmHoldUpStep4 from '../screens/private/shifts/armHoldUp/arm-hold-up-step-4';
import Accident_Incident_Hazard_step_1 from '../screens/private/shifts/Accident/Accident_Incident_Hazard_step_1';
import Accident_Incident_Hazard_step_2 from '../screens/private/shifts/Accident/Accident_Incedent_Hazard_step_2';
import Accident_Incident_Hazard_step_3 from '../screens/private/shifts/Accident/Accident_Incident_Hazard_step_3';
import Accident_Incident_Hazard_step_4 from '../screens/private/shifts/Accident/Accident_Incident_Hazard_step_4';
import Accident_Incedent_Hazard_step_5 from '../screens/private/shifts/Accident/Accident_Incident_Hazard_step_5';
import Accident_Incedent_Hazard_step_6 from '../screens/private/shifts/Accident/Accident_Incident_Hazard_step_6';
import setting from './setting';
import MessageDetail from '../screens/private/messages/messageDetail';
import EndShift from '../components/shifts/end-shift';
import ShiftCode from '../screens/private/shifts/manualShift/shiftCode';

const Stack = createStackNavigator();

function StackNavigator(props: any) {
    const { colors }: any = useTheme();
    const { isAuthenticated } = useTypedSelector((state) => state.auth);
    const { openModal } = useActions();

    // @ts-ignore
    return (
        <Stack.Navigator
            initialRouteName={
                isAuthenticated
                    ? navigationStrings.TAB_BAR_HOME
                    : navigationStrings.LOGIN
            }>
            <Stack.Screen
                name={navigationStrings.LOGIN}
                component={Login}
                options={{
                    headerShown: false,
                    animationTypeForReplace: isAuthenticated ? 'push' : 'pop',
                }}
            />
            <Stack.Screen
                name={navigationStrings.TAB_BAR_HOME}
                component={DashboardTabs}
                options={{
                    headerShown: false,
                    title: 'Home',
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACTION_DETAILS}
                component={ActionDetail}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.SETTING}
                component={setting}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.START_MANUAL_SHIFT}
                component={StartManualShift}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.SHIFT_CODE}
                component={ShiftCode}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.ROSTER_CALENDAR}
                component={RosterCalender}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.QRSCAN}
                component={ScanScreen}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.END_SHIFT}
                component={EndShift}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.MESSAGE_DETAIL}
                component={MessageDetail}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('MessageFilesSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.INTOXICATION}
                component={Intoxication}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.WELFARE_CHECK}
                component={WelfareCheck}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.VEHICLE_REPORT}
                component={VehicleReport}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.MAINTENANCE}
                component={Maintenance}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.BOMB_THEART_STEP_1}
                component={BombTheartStep1}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.BOMB_THEART_STEP_2}
                component={BombTheartStep2}
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.BOMB_THEART_STEP_3}
                component={BombTheartStep3}
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.BOMB_THEART_STEP_4}
                component={BombTheartStep4}
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_1}
                component={Accident_Incident_Hazard_step_1}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_2}
                component={Accident_Incident_Hazard_step_2}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_3}
                component={Accident_Incident_Hazard_step_3}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_4}
                component={Accident_Incident_Hazard_step_4}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_5}
                component={Accident_Incedent_Hazard_step_5}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.ACCIDENT_STEP_6}
                component={Accident_Incedent_Hazard_step_6}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },

                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.ARMED_HOLDUP_1}
                component={ArmHoldUpStep1}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.ARMED_HOLDUP_2}
                component={ArmHoldUpStep2}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerLeft: null,
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ARMED_HOLDUP_3}
                component={ArmHoldUpStep3}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerLeft: null,
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />
            <Stack.Screen
                name={navigationStrings.ARMED_HOLDUP_4}
                component={ArmHoldUpStep4}
                options={{
                    headerShown: true,
                    headerLeft: null,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.FIRE_ALARM}
                component={FireAlarm}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.FIRE_ALARM_1}
                component={FireAlarm2}
                options={{
                    headerShown: true,

                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.BOAT_REPORT}
                component={BoatReport}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.CROWDCOUNT}
                component={CrowdCount}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (route: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.PATROL}
                component={Patrol}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                    headerRight: (props: any) => {
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    openModal('ShiftAttachmentSheet', {
                                        height: '80%',
                                    });
                                }}>
                                <NavigationBurgerIcon
                                    style={{ marginRight: 15 }}
                                    source={galleryIcon}
                                />
                            </TouchableOpacity>
                        );
                    },
                }}
            />

            <Stack.Screen
                name={navigationStrings.AUTO_SHIFT_START}
                component={AutoShiftStart}
                options={{
                    headerShown: true,
                    headerStyle: {
                        backgroundColor: colors.secondary,
                    },
                    headerBackTitleStyle: {
                        color: colors.text,
                    },
                }}
            />
        </Stack.Navigator>
    );
}

export default StackNavigator;

const NavigationBurgerIcon = styled.Image`
    margin-left: 16px;
`;
