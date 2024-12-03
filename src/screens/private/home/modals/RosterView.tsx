import React, { useRef } from 'react';
import { ScrollView, View, TouchableOpacity, Text } from 'react-native';
import { format } from 'date-fns';

import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from '@root/hooks/useTypedSelector';
import { getUserLocation } from '@root/utils/common-methods';

const RosterView = ({ item, button, props, fontSize }: any) => {
    const { startShiftAction, getActiveShift } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    const { modalType, modalProps } = useTypedSelector(
        (state) => state.modalSheet,
    );
    return (
        <ScrollView nestedScrollEnabled={false}>
            <MainFrame>
                <SheetItemLayout>
                    <LocationText fontSize={fontSize}>
                        Location Name
                    </LocationText>
                    <SiteText fontSize={fontSize}>{item.siteName}</SiteText>
                </SheetItemLayout>
                <LocationText fontSize={fontSize}></LocationText>

                <LocationText fontSize={fontSize} style={{ marginBottom: 7 }}>
                    Rostered For {format(new Date(item.rosterStart), 'EEE')}{' '}
                    {item.rosterStart.split('T')[1].split(':')[0]}:
                    {item.rosterStart.split('T')[1].split(':')[1]}
                    {' - '}
                    {item.rosterEnd.split('T')[1].split(':')[0]}:
                    {item.rosterEnd.split('T')[1].split(':')[1]}
                </LocationText>

                <LocationText fontSize={fontSize}>
                    Instructions{'\n'}
                    {item.guardInstruction}
                </LocationText>

                <AboutText fontSize={fontSize}>About The Site</AboutText>

                <LocationText fontSize={fontSize}>{item.notes}</LocationText>
                   
                {/* <LocationText fontSize={fontSize}>
                    Report to Dock master
                </LocationText> */}

                {button && (
                    <TouchableOpacity
                        onPress={async () => {
                            try {
                                const uLocationData: any =
                                    await getUserLocation();
                                await startShiftAction({
                                    type: 'auto',
                                    orgID: orgID,
                                    startAuto: {
                                        rosterID: item.rosterID,
                                        geoLocation: {
                                            latitude: uLocationData.coords.latitude,
                                            longitude: uLocationData.coords.longitude,
                                        },
                                    },
                                });

                                await getActiveShift({ orgID: orgID });
                                //   navigationRef.current.navigate(NavigationStrings.TAB_BAR_SHIFTS)
                            } catch (e) {
                                alert(
                                    'Please enable the location from settings!',
                                );
                            }
                        }}>
                        <View style={{ alignItems: 'center' }}>
                            <StartBtnImage
                                source={require('@root/assets/startshiftbtn/startshiftbtn.png')}
                            />
                        </View>
                    </TouchableOpacity>
                )}
            </MainFrame>
        </ScrollView>
    );
};

// @ts-ignore
export default withTheme(RosterView);

type FontSizeProps = {
    fontSize: number;
};

const SheetItemLayout = styled.View`
    background: ${(props: any) => props.theme.colors.secondary};
    border: 2px solid #29313e;
    border-radius: 8px;
    margin-bottom: -12px;
    margin-top: 10px;
    padding: 14px;
    display: flex;
    flex-direction: column;
`;

const StartBtnImage = styled.Image`
    flex-direction: row;
    align-items: center;
    display: flex;
    margin-top: 66px;
`;

const SiteText = styled.Text<FontSizeProps>`
    color: ${(props: any) => props.theme.colors.accentColor};
    font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize].cardTitle}px;
`;

const LocationText = styled.Text<FontSizeProps>`
    margin: 0 0 5px 0;
    color: ${(props: any) => props.theme.colors.textGray};
    font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize].cardDate}px;
`;
const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const AboutText = styled.Text<FontSizeProps>`
    margin: 5px 0 7px 0;
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardTitle}px;
    color: ${(props: any) => props.theme.colors.text};
`;
