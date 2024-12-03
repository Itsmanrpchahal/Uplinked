import  React from "react";
import BackgroundGlobal from "../../../../components/BackgroundGlobal";
import {ScrollView, TouchableOpacity, View} from "react-native";
import {getUserLocation} from "@root/utils/common-methods";
// @ts-ignore
import styled, {withTheme} from "styled-components/native";
import { format } from 'date-fns';
import {useActions} from "@root/hooks/useActions";
import {useTypedSelector} from "@root/hooks/useTypedSelector";

// @ts-ignore
const AutoShiftStart =({route})=> {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { startShiftAction, getActiveShift } = useActions();
    const orgID = useTypedSelector((state) => state.auth.orgID);
    return (
        <BackgroundGlobal>

            <ScrollView>
                <MainFrame>
                    <AboutText fontSize={fontSizeState}>Start Shift</AboutText>
                        <LocationText fontSize={fontSizeState} >Location Name</LocationText>
                        <SiteText fontSize={fontSizeState}>{route.params.item.siteName}</SiteText>
                    
                    <LocationText fontSize={fontSizeState}> </LocationText>
                    <LocationText fontSize={fontSizeState} style={{ marginBottom: 7 }}>
                        Rostered For{' '}
                        {format(new Date(route.params.item.rosterStart), 'EEE')}
                        {' '}
                        {route.params.item.rosterStart.split('T')[1].split(':')[0]}:{route.params.item.rosterStart.split('T')[1].split(':')[1]}
                        {' - '}
                        {route.params.item.rosterEnd.split('T')[1].split(':')[0]}:{route.params.item.rosterEnd.split('T')[1].split(':')[1]}
                        
                    </LocationText>

                    <LocationText fontSize={fontSizeState}>
                        Instructions{'\n'}{route.params.item.guardInstruction}

                    </LocationText>

                    <AboutText fontSize={fontSizeState}>About The Site</AboutText>

                    <LocationText fontSize={fontSizeState}>{route.params.item.notes}</LocationText>



                    {route.params.button && (
                        <TouchableOpacity
                            onPress={async () => {
                                try {
                                    const uLocationData: any =
                                        await getUserLocation();
                                    await startShiftAction({
                                        type: 'auto',
                                        orgID: orgID,
                                        startAuto: {
                                            rosterID: route.params.item.rosterID,
                                            geoLocation: {
                                                latitude: uLocationData.coords.latitude,
                                                longitude: uLocationData.coords.longitude,
                                            },
                                        },
                                    });
                                    await  getActiveShift({ orgID: orgID });
                                    route.params.navigation.pop()

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
        </BackgroundGlobal>
    );
}

// @ts-ignore
export default withTheme(AutoShiftStart)
type FontSizeProps = {
    fontSize: number;
};

const SheetItemLayout = styled.View`
  background: ${(props: any) => props.theme.colors.secondary};
  border: 2px solid #29313E;
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
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardTitle};
`;

const LocationText = styled.Text<FontSizeProps>`
    margin: 0 0 5px 0;
    color: ${(props: any) => props.theme.colors.textGray};
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardDate};
`;
const MainFrame = styled.View`
    flex: 1;
    padding: 16px;
    background-color: ${({ theme }: any) => theme.colors.primary};
`;

const AboutText = styled.Text<FontSizeProps>`
    margin: 5px 0 7px 0;
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardTitle};
    color: ${(props: any) => props.theme.colors.text};
`;
