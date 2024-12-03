import React, { useEffect, useState } from "react";
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useActions } from '@root/hooks/useActions';
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useIsFocused } from '@react-navigation/native';
import styled from "styled-components/native";
import { Image, ScrollView, Text, TouchableOpacity } from "react-native";
import AppLoader from "../../../utils/AppLoader";
import { WINDOW_DEVICE_WIDTH } from '@root/utils/constants';
import ImageModal from "react-native-image-modal";

const MessageDetail = (props: any) => {
    const isFocused = useIsFocused();
    const item = props.route.params.item
    const id = props.route.params.item.messageID
    const { getMessageFiles } = useActions();
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const { messageFilesData, messageLoading } = useTypedSelector((state) => state.messageFilesData);

    useEffect(() => {
        if (isFocused) {
            getMessageFiles({
                'id': id
            })
        }
    }, [isFocused])


    return (
        <BackgroundGlobal>
            {
                messageLoading ? <AppLoader /> : <ScrollView>
                    <MainFrame>
                       
                        <ShiftItemLayout>
                            <ContentWrapper>
                                <TitleText fontSize={fontSizeState}>{item.fromName} - {item.createdDateTimeText}</TitleText>
                                <ExpireText fontSize={fontSizeState}>{item.message}</ExpireText>
                                <ItemBottom>
                                    <CheckView>
                                        <Image
                                            source={item.isRead === true ? require('@root/assets/check/check.png') : require('@root/assets/uncheck/checkuncheck.png')}
                                        />
                                        <TitleLabel fontSize={fontSizeState}>  Mark as Read</TitleLabel>
                                    </CheckView>
                                </ItemBottom>
                            </ContentWrapper>
                        </ShiftItemLayout>

                        <ImagesLayout>
                            <TitleLabel fontSize={fontSizeState}>Images for this message </TitleLabel>
                            {
                                item.hasAttachment === false && <NoImages fontSize={fontSizeState}>No image uploaded!</NoImages>
                            }

                            {
                                messageFilesData && messageFilesData.length > 0 ?
                                    (messageFilesData.map((files: any) => {
                                        return (
                                            <TouchableOpacity onPress={() => {

                                            }}>
                                                <ImageWrapper__Image
                                                    width={
                                                        WINDOW_DEVICE_WIDTH -
                                                        32
                                                    }>
                                                    <ImageModal
                                                        style={{
                                                            width:
                                                                (WINDOW_DEVICE_WIDTH -
                                                                    32) /
                                                                6,
                                                            height:
                                                                (WINDOW_DEVICE_WIDTH -
                                                                    32) /
                                                                6,
                                                            borderRadius: 4,
                                                        }}
                                                        resizeMode="cover"
                                                        imageBackgroundColor="#000000"

                                                        source={{
                                                            uri: 'data:image/png;base64,  ' +
                                                                files.image,
                                                        }}
                                                    />

                                                </ImageWrapper__Image>
                                            </TouchableOpacity>
                                        )
                                    })) : null
                            }
                            {!item.hasAttachment &&
                                props.navigation.setOptions({
                                    headerRight: () => null
                                })
                            }
                        </ImagesLayout>
                    </MainFrame>

                </ScrollView>
            }

        </BackgroundGlobal>
    )
}

export default MessageDetail

type FontSizeProps = {
    fontSize: number;
};
type ImageWrapper__ImageProps = {
    width: number;
};

const ImageWrapper__Image = styled.View<ImageWrapper__ImageProps>`
  width: ${({ width }: any) => width / 6}px;
  height: ${({ width }: any) => width / 6}px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin: 10px 4px 4px 4px;
`;

const NoImages = styled.Text<FontSizeProps>`
font-size: ${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
margin-top:10px;
  color: ${({ theme }: any) => theme.colors.text};
`

const TitleLabel = styled.Text<FontSizeProps>`
  font-size: ${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
  font-weight:600;
  color: ${({ theme }: any) => theme.colors.text};
`;

const CheckView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemBottom = styled.View`
    margin-top: 15px;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const ExpireText = styled.Text<FontSizeProps>`
    font-style: normal;
    font-weight: bold;
    margin-top: 10px;
    font-size: ${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
    line-height: 18px;
    text-transform: capitalize;
    color: #e5e5e5;
`;

const TitleText = styled.Text<FontSizeProps>`
    font-style: normal;
    font-weight: normal;
    font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate}px;
    text-transform: capitalize;
    color: #e5e5e5;
`;

const ContentWrapper = styled.View`
width:100%`

const ImagesLayout = styled.View`
background: #29313e;
border-radius: 8px;
margin-bottom: 10px;
padding: 14px;
display: flex;
flex-direction: column;
`;

const ShiftItemLayout = styled.View`
  flex-direction: row;
    background: #29313e;
    border-radius: 8px;
    margin-bottom: 10px;
    padding: 14px;
    display: flex;
    align-items: center;
   
`;

const MainFrame = styled.View`
    padding: 16px;
    height: 100%;
`;
