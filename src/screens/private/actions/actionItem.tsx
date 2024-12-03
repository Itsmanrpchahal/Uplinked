// @ts-ignore
import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';
import React from 'react';
import { withTheme } from 'styled-components';
import { whiteRight } from '@root/utils/assets';
import { NotFound } from '@root/utils/globalStyle'
import navigationStrings from "../../../navigation/navigationStrings";
import { useTypedSelector } from "../../../hooks/useTypedSelector";

type ActionItemProps = {
    item: ItemData;
    navigation?: any;
    actionTitle: boolean;
};

type ItemData = {
    status: string;
    actions: actionType[];
};

type actionType = {
    actionID: number;
    actionDescription: string;
    actionType: string;
    actionByDate: string;
    actionByDateText: string;
};

const ActionItem: React.FC<ActionItemProps> = ({
    item: {
        status,
        actions,
    },
    navigation,
    actionTitle = false,
}) => {
    const { fontSizeState } = useTypedSelector((state) => state.fontSizeState);

    return (
        <ActionWrapper>
            <TitleWrapperText fontSize={fontSizeState}>
                {actionTitle ? status : 'Actions'}
            </TitleWrapperText>
            {actions.length > 0 ? actions.map((action) => {
                let expires = new Date(action.actionByDate);
                return (
                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate(navigationStrings.ACTION_DETAILS, { item: action });
                        }}>
                        <ActionBox>
                            <ActionBoxCont>
                                <ItemNameText fontSize={fontSizeState}>{action.actionType}</ItemNameText>
                                <ExpireText fontSize={fontSizeState}>
                                    Expires: {expires.getDate()}-{expires.getMonth()}-
                                    {expires.getFullYear()} ({action.actionByDateText}){' '}
                                </ExpireText>
                                <SiteText fontSize={fontSizeState}>Sites Affected: {action.actionID}</SiteText>
                            </ActionBoxCont>
                            <ArrowCont>
                                <ArrowImage source={whiteRight}></ArrowImage>
                            </ArrowCont>
                        </ActionBox>
                    </TouchableOpacity>
                )
            }) : <NotFound>No Data Found</NotFound>}

        </ActionWrapper>
    );
};



// @ts-ignore
export default withTheme(ActionItem);

type FontSizeProps = {
    fontSize: number;
};

const ArrowCont = styled.View`
    margin-left: auto;
`;

const ArrowImage = styled.Image`
    width: 8px;
    height: 12px;
    margin-right: -15px;
`;

const ExpireText = styled.Text<FontSizeProps>`
    color: #ffffff;
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardTitle};
    font-weight: 600;
    margin: 5px 0;
`;

const ItemNameText = styled.Text<FontSizeProps>`
    color: #e5e5e5;
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardDate};
    font-weight: 400;
`;

const SiteText = styled.Text<FontSizeProps>`
    color: #ffffff;
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardDate};
    font-weight: 500;
`;

const ActionBox = styled.View`
    background-color: #d93f3c;
    margin-right: 16px;
    margin-top: 16px;
    border-radius: 8px;
    flex-direction: row;
    align-items: center;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
    padding: 14px 40px 14px 14px;
    width: 100%;
`;
const ActionBoxCont = styled.View``;

const ActionWrapper = styled.View`
  margin-bottom: 15px;
`;

const TitleWrapperText = styled.Text<FontSizeProps>`
    color: ${({ theme }: any) => theme.colors.text};
    font-size:${({ theme,fontSize }: any) => theme.fontSize[fontSize].cardDate};
`;
