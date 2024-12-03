import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {

    Appearance,
    Image,
    ScrollView,
    Text,
} from 'react-native';
import { useActions } from 'hooks/useActions';
import { useTypedSelector } from "../hooks/useTypedSelector";
import { Divider } from '../utils/globalStyle'
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { MainParentWrapper, MainWrapper } from '@root/utils/globalStyle';
import Slider from '@react-native-community/slider';
import { Switch } from 'react-native'

const Setting = () => {
    const { colors }: any = useTheme()
    const { getFontSize, getMode } = useActions();
    const { modeState } = useTypedSelector((state) => state.mode);
    var appearance = Appearance.getColorScheme()
    var mode = appearance === 'light' ? false : true
    const [theme, setTheme] = useState<any>(modeState);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const [font, setFont] = useState<number>(fontSizeState)

   

    const toggleRememberPin = (value) => {
        setTheme(value);
        getMode({mode:value})
    };
    useEffect(() => {
        getFontSize({ fontSize: font });
    }, [font])

   

    return (
        <MainParentWrapper>
            <BackgroundGlobal>
                <ScrollView>
                    <MainView>

                        <GenralText fontSize={font}>
                            Genral
                        </GenralText>

                        <Divider />
                        <HorizontalWrapper>
                            <Image source={require('@root/assets/font/font.png')}></Image>
                            <FontText fontSize={font}>Font Size</FontText>
                        </HorizontalWrapper>

                        <GenralText fontSize={font}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut lab
                        </GenralText>

                        <SliderView>
                            <ImageWrapper>
                                <Image source={require('@root/assets/aSmall/aSmall.png')}></Image>
                                <Image source={require('@root/assets/aBig/aBig.png')}></Image>
                            </ImageWrapper>
                            <SliderHorizontal>
                                <VerticleView />
                                <VerticleView />
                                <VerticleView />
                                <VerticleView />
                                <VerticleView />
                            </SliderHorizontal>
                            <Slider
                                style={{ width: 'auto', height: 40 }}
                                minimumValue={0}
                                maximumValue={4}

                                value={font}
                                onValueChange={(sliderValue) => {
                                    setFont(Math.floor(sliderValue))

                                }}
                                thumbTintColor={colors.accentColor}
                                tapToSeek={true}
                                minimumTrackTintColor={colors.text}
                                maximumTrackTintColor={colors.text}
                            />
                        </SliderView>

                        {/* <AppView>
                            <FontText fontSize={font}>
                                App Theme
                            </FontText>
                        </AppView> */}
                        <ThemeView>
                         
                          {/* <SwitchHorizontalWrapper>
                               <TextImageWrapper>
                                   <Image
                                       source={require('@root/assets/theme/theme.png')}
                                   />
                                   <TextWrapper fontSize={fontSizeState} textColor={colors.text}>
                                       Dark Theme
                                   </TextWrapper>
                               </TextImageWrapper>

                               <Switch
                                   onValueChange={toggleRememberPin}
                                   renderActiveText={false}
                                   value={theme}
                                   renderInActiveText={false}
                               />

                           </SwitchHorizontalWrapper> */}
                          
                           
                            

                        </ThemeView>


                    </MainView>
                </ScrollView>
            </BackgroundGlobal>
        </MainParentWrapper>
    );
}

export default withTheme(Setting)
type FontSizeProps = {
    fontSize: number;
};

type TextColorProps = {
    textColor: string;
};

const ThemeView = styled.View`
background-color:${({ theme }: any) => theme.colors.secondary};
`

const TextWrapper = styled.Text<TextColorProps, FontSizeProps>`
  color: ${({ textColor }: any) => textColor};
  font-size: ${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardSubTitle};
  margin-left: 16px;
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

const SwitchHorizontalWrapper = styled.View`
  flex-direction: row;
  margin: 10px 16px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
`;

const VerticleView = styled.View`
width:2px;
height:14px;
background-color:${({ theme }: any) => theme.colors.text};
`;

const SliderHorizontal = styled.View`
bottom:-27px;
position:relative;
flex-direction:row
justify-content:space-between
margin:0 10px`;

const SliderView = styled.View`
`;

const ImageWrapper = styled.View`
margin: 0 10px;
flex-direction:row
justify-content:space-between
align-items:center
`

const AppView = styled.View`
background-color:${({ theme }: any) => theme.colors.primary};
padding:10px;
`;
const FontText = styled.Text<FontSizeProps>`
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
color:${({ theme }: any) => theme.colors.text};
margin-left:16px;
`;
const HorizontalWrapper = styled.View`
margin:16px;
flex-direction:row;
align-items:center;
`;

const GenralText = styled.Text<FontSizeProps>`
    font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
    color:${({ theme }: any) => theme.colors.text};
    margin:16px;
`;

const MainView = styled.View`
    
`;