import React from 'react';
import { View } from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import { useTypedSelector } from '../hooks/useTypedSelector';

// @ts-ignore
export const NoInternetView = () => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    return (
        <View>
            <Notification>
                <MessageText fontSize={fontSizeState}>
                    No Internet Avaliable
                </MessageText>
            </Notification>
        </View>
    );
};

type FontSizeProps = {
    fontSize: number;
};

const Notification = styled.View`
    padding: 10px 15px;
    flex-direction: row;
    background-color: ${({ theme }: any) => theme.colors.cadmiumRed};
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
`;

const MessageText = styled.Text<FontSizeProps>`
    font-size: ${({ theme, fontSize }: any) =>
        theme.fontSize[fontSize].cardDate}px;
    color: ${({ theme }: any) => theme.colors.text};
    font-weight: 500;
`;
