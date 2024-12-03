import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
// @ts-ignore
import styled from 'styled-components/native';
import {withTheme} from 'styled-components';
import ListCard from '@root/components/ListCard';
import { useTypedSelector } from '@root/hooks/useTypedSelector';


const AccountModalSheet = (props: any) => {
  const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);
    const data = useMemo(
        () =>
            Array(50)
                .fill(0)
                .map((_, index) => `index-${index}`),
        []
    );

    return (
        <SheetWrapper>
            <ChooseProfile>
                <ChooseProfileText fontSize={fontSizeState}>CHOOSE PROFILES</ChooseProfileText>
            </ChooseProfile>
            <ListWrapper>
                <ListCard/>
            </ListWrapper>
        </SheetWrapper>
    );
};

const styles = StyleSheet.create({

    itemContainer: {},
});


export default withTheme(AccountModalSheet);

type FontSizeProps = {
  fontSize: number;
};

const ListWrapper = styled.View`
  margin-top: 15px;
`;

const ChooseProfile = styled.View`
  align-items: center;
  margin-top: 35px;
`;
const ChooseProfileText = styled.Text<FontSizeProps>`
  color: ${({theme}: any) => theme.colors.accentColor};
  font-size: ${({theme, fontSize }: any) => theme.fontSize[fontSize].cardSubTitle}px;
`;

const SheetWrapper = styled.View`
  flex: 1;
  background-color: ${({theme}: any) => theme.colors.primary};
`;
