import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { withTheme } from 'styled-components';
import { navigationRef } from '@root/navigation/RootNavigation';
import navigationStrings from '../../navigation/navigationStrings';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

const ReportsEntryList = ({ data }: any) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { closeModal } = useActions();
    return (
        data?.length > 0 &&
        data.map((item: any) => (
            <ReportsEntryList__Wrapper>
                <TouchableOpacity
                    onPress={() => {
                        closeModal();
                        item.name === 'Patrol'
                            ? navigationRef.current.navigate(
                                  navigationStrings.PATROL,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Intoxication'
                            ? navigationRef.current.navigate(
                                  navigationStrings.INTOXICATION,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Crowd Count'
                            ? navigationRef.current.navigate(
                                  navigationStrings.CROWDCOUNT,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Boat Report'
                            ? navigationRef.current.navigate(
                                  navigationStrings.BOAT_REPORT,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Welfare Check'
                            ? navigationRef.current.navigate(
                                  navigationStrings.WELFARE_CHECK,
                                  {
                                      editable: false,
                                      trigger: 0,
                                  },
                              )
                            : item.name === 'Fire Alarm'
                            ? navigationRef.current.navigate(
                                  navigationStrings.FIRE_ALARM,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Vehicle Report'
                            ? navigationRef.current.navigate(
                                  navigationStrings.VEHICLE_REPORT,
                                  {
                                      editable: false,
                                  },
                              )
                            : item.name === 'Bomb Threat'
                            ? navigationRef.current.navigate(
                                  navigationStrings.BOMB_THEART_STEP_1,
                                  {
                                      editable: false,
                                      trigger: 0,
                                  },
                              )
                            : item.name === 'Armed Holdup'
                            ? navigationRef.current.navigate(
                                  navigationStrings.ARMED_HOLDUP_1,
                                  {
                                      editable: false,
                                      trigger: 0,
                                  },
                              )
                            : item.name === 'Accident/Incident/Hazard'
                            ? navigationRef.current.navigate(
                                  navigationStrings.ACCIDENT_STEP_1,
                                  {
                                      editable: false,
                                      trigger: 0,
                                  },
                              )
                            : navigationRef.current.navigate(
                                navigationStrings.MAINTENANCE,
                                {
                                    editable: false,
                                    trigger: 0,
                                },
                            )
                    }}>
                    <ReportsEntryList__Wrapper_Secondary>
                        <TitleText fontSize={fontSizeState}>
                            {item.name}
                        </TitleText>
                        <Image
                            source={require('@root/assets/iconright.png')}
                            style={{ width: 12, height: 14 }}
                        />
                    </ReportsEntryList__Wrapper_Secondary>
                </TouchableOpacity>
            </ReportsEntryList__Wrapper>
        ))
    );
};

// @ts-ignore
export default withTheme(ReportsEntryList);

type FontSizeProps = {
    fontSize: number;
};

const TitleText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle};
`;

const ReportsEntryList__Wrapper_Secondary = styled.View`
    height: 80px;
    flex-direction: row;
    justify-content: space-between;
    padding-left: 16px;
    padding-right: 16px;
    align-items: center;
    margin-bottom: 1px;
    background-color: ${({ theme }: any) => theme.colors.secondary};
`;

const ReportsEntryList__Wrapper = styled.View`
    flex: 1;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;
