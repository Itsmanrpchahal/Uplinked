import React from 'react';
import { TouchableOpacity } from 'react-native';
import { withTheme } from 'styled-components';
// @ts-ignore
import styled from 'styled-components/native';

type PrimaryButtonProps = {
    onPress: Function;
    btnText: string;
    loading?: boolean;
    backgroundColor?: string;
    heightBT?: number;
};

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
    onPress,
    btnText,
    loading = false,
    backgroundColor,
    heightBT,
}) => {
    return (
        <TouchableOpacity onPress={() => onPress()}>
            <PrimaryButton__Wrapper
                backgroundColor={backgroundColor}
                height={heightBT}>
                <PrimaryButton__Wrapper__Text>
                    {loading ? 'loading...' : btnText}
                </PrimaryButton__Wrapper__Text>
            </PrimaryButton__Wrapper>
        </TouchableOpacity>
    );
};

// @ts-ignore
export default withTheme(PrimaryButton);

const PrimaryButton__Wrapper = styled.View`
    justify-content: center;
    align-items: center;
    background-color: ${({ theme, backgroundColor }: any) =>
        backgroundColor ? backgroundColor : theme.colors.greenColor};
    height: ${({ height }: any) => (height ? height : 55)}px;
    border-radius: 8px;

`;
const PrimaryButton__Wrapper__Text = styled.Text`
    color: ${({ theme }: any) => theme.colors.text};
    padding: 10px;
`;
