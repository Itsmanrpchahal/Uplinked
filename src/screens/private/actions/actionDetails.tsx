import React from 'react';
// @ts-ignore
import styled from 'styled-components/native';

import { View, Text, Linking, ScrollView } from 'react-native';
import BackgroundGlobal from '@root/components/BackgroundGlobal';
import { useTypedSelector } from "../../../hooks/useTypedSelector";

export const ActionDetail = (props:any) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const item = props.route.params.item;
    var matches =item.actionInstruction!=null && item.actionInstruction.match(/\bhttps?:\/\/\S+/gi);
    
    return (
        <BackgroundGlobal>
            <ScrollView nestedScrollEnabled={false} showsVerticalScrollIndicator={false}>
            <MainFrame>
                <View style={{ alignItems: 'center' }}>
                    <ActionTitle fontSize={fontSizeState} >
                            {item.status}
                    </ActionTitle>
                </View>

                <ShiftItemLayout>
                    <View style={{ alignItems: 'center' }}>
                        <JobDetailView>
                            {/* <TitleText fontSize={fontSizeState}>Job Detail:</TitleText> */}
                            <TextDesc  fontSize={fontSizeState}>{item.actionDescription}</TextDesc>
                        </JobDetailView>
                        {/* <JobDetailView>
                            <TitleText fontSize={fontSizeState}>Licence Number:</TitleText>
                            <TextDesc fontSize={fontSizeState}>1515154</TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText fontSize={fontSizeState}>Issue Date:</TitleText>
                            <TextDesc fontSize={fontSizeState}>12 </TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText fontSize={fontSizeState}>Expiry Date:</TitleText>
                            <TextDesc fontSize={fontSizeState}>05-02-2025</TextDesc>
                        </JobDetailView>

                        <JobDetailView>
                            <TitleText fontSize={fontSizeState}>Licence Date:</TitleText>
                            <TextDesc fontSize={fontSizeState}>02/05/2021</TextDesc>
                        </JobDetailView>
                        <JobDetailView>
                            <TitleText fontSize={fontSizeState}>Date of Birth:</TitleText>
                            <TextDesc fontSize={fontSizeState}>03/05/1991 </TextDesc>
                        </JobDetailView> */}
                      
                    </View>
                </ShiftItemLayout>

                <TextDetail fontSize={fontSizeState}>
                {item.actionInstruction}
                </TextDetail>
                
                {
                    matches &&  <LinkText
                    fontSize={fontSizeState}
                    onPress={() => {
                       
                        matches = matches[0].replace(']','')
                         {matches != null && Linking.openURL(matches);}
                        
                    }}>
                        
                    {matches[0].replace(']','')}
                </LinkText>
                }
               
            </MainFrame>
            </ScrollView>
           
        </BackgroundGlobal>
    );
};

type FontSizeProps = {
    fontSize: number;
};

const LinkText = styled.Text<FontSizeProps>`
color: #F18122;
margin-top:16px;
text-decoration:underline
text-decoration-color: #F18122;
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate};
`;

const TextDetail = styled.Text`
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardDate};
color: ${({ theme }: any) => theme.colors.text};
`;


const MainFrame = styled.View`
    padding: 16px;
`;

const ShiftItemLayout = styled.View`
  background: #29313e;
  border: 2px solid #29313E;
  border-radius: 8px;
  margin-bottom: 10px;
  margin-top: 16px;
  padding: 14px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JobDetailView = styled.View`
    display: flex;
    margin-bottom: 4px;
    flex-direction: row;
`;
const TitleText = styled.Text<FontSizeProps>`
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardSubTitle};
    font-weight: 400;
    color: #a9acb1;
    text-align: right;
    width: 40%;
    padding-right: 8px;
`;
const TextDesc = styled.Text<FontSizeProps>`
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardTitle};
    font-weight: 400;
    color: #ffffff;
    width: 100%;
    padding-left: 8px;
`;


const ActionTitle = styled.Text<FontSizeProps>`
font-size:${({ theme, fontSize }: any) => theme.fontSize[fontSize].cardSubTitle};
color:#D93F3C
margin-top:16px
`;