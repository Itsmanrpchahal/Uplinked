import { returnThemeTypeData } from '../../utils/theme-type';
import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';
import { useTheme } from '@react-navigation/native';
import { useTypedSelector } from "../../hooks/useTypedSelector";

const ListCard = () => {
    const { colors, type }: any = useTheme();
    const userName = useTypedSelector((state) => state.auth.userName);
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    return (
        <DrawerThreeSection>
            <HeaderWrapper>
                <ImageWrapper>
                    <ImageContent
                        source={returnThemeTypeData({
                            screenName: 'login',
                            lightKey: 'userIconLightTextField',
                            darkKey: 'userIconsDarkTextFiled',
                            appearance: type,
                        })}
                    />
                </ImageWrapper>
                <HeadingWrapper>
                    <HeadingWrapper__Content>
                        <HeadingWrapper__Content__Title
                            fontSize={fontSizeState}
                            textColor={colors.accentColor}>
                            {userName}
                        </HeadingWrapper__Content__Title>
                        <HeadingWrapper__Content__Status
                            fontSize={fontSizeState}
                            textColor={colors.text}>
                            {userName.split('@')[0]}
                        </HeadingWrapper__Content__Status>
                    </HeadingWrapper__Content>
                    <HeadingWrapper__RightArrow>
                        <HeadingWrapper__RightArrow_ImageContent
                            source={require('@root/assets/rightArrowWhite/rightArrow.png')}
                        />
                    </HeadingWrapper__RightArrow>
                </HeadingWrapper>
            </HeaderWrapper>
        </DrawerThreeSection>
    );
};

export default ListCard;

type FontSizeProps = {
    fontSize: number;
};

type TextColorProps = {
    textColor: string;
};

const DrawerThreeSection = styled.View``;

const HeaderWrapper = styled.View`
    flex-direction: row;
    align-items: center;
    background-color: ${({ theme }: any) => theme.colors.secondary};
    padding: 12px;
    margin-bottom: 1px;
`;

const ImageWrapper = styled.View`
    width: 60px;
    height: 60px;
    background-color: wheat;
    border-radius: 30px;
    justify-content: center;
    align-items: center;
`;
const ImageContent = styled.Image``;
const HeadingWrapper = styled.View`
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-left: 10px;
`;
const HeadingWrapper__Content = styled.View`
    flex-direction: column;
`;
const HeadingWrapper__Content__Title = styled.Text<TextColorProps, FontSizeProps>`
font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize].cardTitle}px;
    font-weight: 400;
    color: ${({ textColor }: any) => textColor};
`;
const HeadingWrapper__Content__Status = styled.Text<TextColorProps>`
    color: ${({ textColor }: any) => textColor};
    font-size: ${({ theme, fontSize }) => theme.fontSize[fontSize].cardDate}px;
    font-weight: 400;
`;
const HeadingWrapper__RightArrow = styled.View`
    margin-right: 20px;
`;
const HeadingWrapper__RightArrow_ImageContent = styled.Image`
    width: 10px;
    height: 15px;
`;
